"use client";
import { useEffect, useState } from "react";
import { authAxios } from "@/lib/api";
import Link from "next/link";

interface Post {
  id: number;
  wallet_address: string;
  content: string;
  timestamp: string;
  likes?: any[];
  comments?: any[];
  user: {
    username: string;
  };
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authAxios()
      .get("/posts")
      .then((res) => setPosts(res.data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!posts.length) return <div>No posts yet.</div>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
          <div key={post.id} className="rounded bg-white p-4 shadow cursor-pointer">
            <div className="font-mono text-xs text-gray-500">{post.user.username}</div>
            <div className="my-2">{post.content}</div>
            <div className="flex gap-4 text-sm text-gray-500">
              <span>{post.likes?.length ?? 0} Likes</span>
              <span>{post.comments?.length ?? 0} Comments</span>
              <span>{new Date(post.timestamp).toLocaleString()}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
