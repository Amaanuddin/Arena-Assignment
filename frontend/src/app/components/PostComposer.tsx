"use client";
import { useState } from "react";
import { authAxios } from "@/lib/api";

export default function PostComposer({ onPosted }: { onPosted?: () => void }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePost() {
    if (!content.trim()) return;
    setLoading(true);
    try {
      await authAxios().post("/posts", { content }); // backend can fill wallet from JWT
      setContent("");
      onPosted && onPosted();
    } catch (e) {
      alert("Failed to post.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-4 rounded bg-white p-4 shadow flex flex-col gap-2">
      <textarea
        className="w-full p-2 border rounded"
        rows={2}
        maxLength={280}
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
      />
      <button
        className="self-end px-4 py-2 rounded bg-indigo-600 text-white"
        onClick={handlePost}
        disabled={loading || !content.trim()}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
}
