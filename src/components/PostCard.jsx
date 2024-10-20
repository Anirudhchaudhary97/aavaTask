

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter
} from "@/components/ui/card";
import LikeRepostButtons from './LikeRepostButtons';

const PostCard = ({ post, refreshPosts }) => (
  <Card className="shadow-lg transition-transform transform hover:scale-105">
    <CardHeader className="font-bold text-xl">{post.title}</CardHeader>
    <CardContent>
      {post.image && <img src={post.image} alt="post" className="mb-4 rounded-lg" />}
      <p className="mb-4 text-gray-700">{post.content}</p>
      <LikeRepostButtons post={post} refreshPosts={refreshPosts} />
    </CardContent>
    <CardFooter>
      <p className="text-sm text-gray-500">Posted by User</p>
    </CardFooter>
  </Card>
);

export default PostCard;
