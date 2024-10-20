
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import PostCard from "../components/PostCard";
import NewPostForm from "../components/NewPostForm";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/");
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from("posts").select("*");
    if (error) {
      console.error("Error fetching posts:", error);
      return; // Exit if there's an error
    }
    if (data) {
      setPosts(data);
      console.log("Fetched posts:", data);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Home</h1>
        <Button
          onClick={handleLogout}
          className="bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition duration-200"
        >
          Logout
        </Button>
      </div>
      <NewPostForm refreshPosts={fetchPosts} />
      <div className="grid grid-cols-1 gap-6 mt-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} refreshPosts={fetchPosts} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;













