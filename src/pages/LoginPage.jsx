

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Github, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        navigate("/home");
      }
    };

    checkUser();
  }, [navigate]);

  const signInWithProvider = async (provider) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    setLoading(false);
    if (error) console.error("Error signing in:", error);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-white text-4xl font-bold mb-6">Welcome to Our Platform</h1>
      <p className="text-white mb-8 text-lg">Please sign in to continue</p>
      <div className="space-y-4 w-full max-w-xs">
        <Button
          className="w-full flex items-center justify-center text-lg py-3 bg-white text-gray-800 rounded-lg shadow-lg hover:bg-gray-100"
          onClick={() => signInWithProvider("google")}
          disabled={loading}
        >
          <Globe className="mr-2" />
          {loading ? "Signing in..." : "Sign in with Google"}
        </Button>

        <Button
          className="w-full flex items-center justify-center text-lg py-3 bg-white text-gray-800 rounded-lg shadow-lg hover:bg-gray-100"
          onClick={() => signInWithProvider("github")}
          disabled={loading}
        >
          <Github className="mr-2" />
          {loading ? "Signing in..." : "Sign in with GitHub"}
        </Button>
      </div>
      <footer className="absolute bottom-4 text-white text-sm">
        <p>© {new Date().getFullYear()} Post</p>
      </footer>
    </div>
  );
};

export default LoginPage;



