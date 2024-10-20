

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NewPostForm = ({ refreshPosts }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createPost = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('posts').insert([{ title, content, like_count: 0, repost_count: 0 }]);
  
    if (error) {
      console.error('Error creating post:', error);
      return;
    }
    
    setTitle('');
    setContent('');
    refreshPosts(); // Refresh the posts after creating a new one
  };
  return (
    <form onSubmit={createPost} className="space-y-4">
      <Input
        id="post-title" // Add id
        name="post-title" // Add name
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        id="post-content" // Add id
        name="post-content" // Add name
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit">Create Post</Button>
    </form>
  );
};

export default NewPostForm;
