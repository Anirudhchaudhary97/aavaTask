

import { Button } from "@/components/ui/button";
import { supabase } from '../lib/supabaseClient';

const LikeRepostButtons = ({ post, refreshPosts }) => {
  const likePost = async () => {
    const newLikeCount = (post.like_count || 0) + 1; // Default to 0 if null
    const { error } = await supabase
      .from('posts')
      .update({ like_count: newLikeCount }) // Use the new like count
      .eq('id', post.id);
    
    if (error) {
      console.error('Error liking post:', error);
      return;
    }
    refreshPosts(); // Refresh the posts to get the updated counts
  };
  
  const repostPost = async () => {
    const newRepostCount = (post.repost_count || 0) + 1; // Default to 0 if null
    const { error } = await supabase
      .from('posts')
      .update({ repost_count: newRepostCount }) // Use the new repost count
      .eq('id', post.id);
    
    if (error) {
      console.error('Error reposting post:', error);
      return;
    }
    refreshPosts(); // Refresh the posts to get the updated counts
  };
  

  return (
    <div className="flex space-x-4">
      <Button onClick={likePost}>Like ({post.like_count || 0})</Button>
      <Button onClick={repostPost}>Repost ({post.repost_count || 0})</Button>
    </div>
  );
};

export default LikeRepostButtons;
