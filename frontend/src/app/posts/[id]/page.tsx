"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { authAxios } from "@/lib/api";
import { getWalletFromToken } from "@/lib/auth";

interface Comment {
  id: number;
  wallet_address: string;
  content: string;
  timestamp: string;
  user:{
    username: string;
  };
}

interface Post {
  id: number;
  wallet_address: string;
  content: string;
  timestamp: string;
  likes: { wallet_address: string }[];
  comments: Comment[];
  user: {
    username: string;
  };
}

export default function PostDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [postingComment, setPostingComment] = useState(false);
  const [liking, setLiking] = useState(false);

  const wallet = getWalletFromToken();

  // Fetch post on mount/when ID changes
  useEffect(() => {
    setLoading(true);
    authAxios()
      .get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleLike() {
    if (!wallet) return alert("Login to like posts");
    setLiking(true);
    try {
      await authAxios().post(`/posts/${id}/like`, {});
      // Refresh post
      const res = await authAxios().get(`/posts/${id}`);
      setPost(res.data);
    } catch {
      alert("Could not like post.");
    } finally {
      setLiking(false);
    }
  }

  async function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!wallet) return alert("Login to comment");
    if (!comment.trim()) return;
    setPostingComment(true);
    try {
      await authAxios().post(`/posts/${id}/comment`, { content: comment });
      setComment("");
      // Refresh post
      const res = await authAxios().get(`/posts/${id}`);
      setPost(res.data);
    } catch {
      alert("Could not add comment.");
    } finally {
      setPostingComment(false);
    }
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!post) return <div className="p-8 text-center">Post not found.</div>;

  return (
    <main className="mx-auto max-w-xl p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded shadow p-4 mb-4">
        <div className="font-mono text-xs text-gray-500">{post.user.username}</div>
        <div className="my-2 text-lg">{post.content}</div>
        <div className="flex gap-6 text-sm text-gray-500 items-center">
          <span>{post.likes.length} Likes</span>
          <span>{post.comments.length} Comments</span>
          <span>{new Date(post.timestamp).toLocaleString()}</span>
          <button
            className="ml-auto text-indigo-600 font-semibold cursor-pointer"
            onClick={handleLike}
            disabled={liking}
          >
            {liking ? "Liking..." : "Like"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4 mb-4">
        <form onSubmit={handleAddComment} className="flex gap-2">
          <input
            className="flex-1 border rounded p-2"
            placeholder="Write a comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            disabled={postingComment}
          />
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer"
            type="submit"
            disabled={postingComment || !comment.trim()}
          >
            {postingComment ? "Posting..." : "Comment"}
          </button>
        </form>
      </div>

      <div className="space-y-3">
        {post.comments.length === 0 ? (
          <div className="text-gray-500">No comments yet.</div>
        ) : (
          post.comments.map((c) => (
            <div key={c.id} className="bg-gray-50 rounded px-4 py-2">
              <div className="font-mono text-xs text-gray-600">{c.user.username}</div>
              <div>{c.content}</div>
              <div className="text-xs text-gray-400">{new Date(c.timestamp).toLocaleString()}</div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
