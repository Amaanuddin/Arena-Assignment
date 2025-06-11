"use client";
import { useState } from "react";
import { authAxios } from "@/lib/api";

export default function SignupForm({ wallet, onSignedUp }: { wallet: string; onSignedUp?: () => void }) {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await authAxios().post("/users", {
        wallet_address: wallet,
        username,
        bio,
        profile_pic_url: profilePic,
      });
      onSignedUp && onSignedUp();
    } catch {
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4 bg-white rounded p-6 shadow" onSubmit={handleSignup}>
      <h2 className="text-xl font-bold">Complete your profile</h2>
      <div>
        <label className="block font-medium">Username</label>
        <input
          className="mt-1 block w-full border rounded p-2"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-medium">Bio</label>
        <textarea
          className="mt-1 block w-full border rounded p-2"
          rows={2}
          value={bio}
          onChange={e => setBio(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-medium">Profile Picture URL</label>
        <input
          className="mt-1 block w-full border rounded p-2"
          value={profilePic}
          onChange={e => setProfilePic(e.target.value)}
          placeholder="https://..."
          type="url"
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-600 text-white rounded px-4 py-2"
        disabled={loading}
      >
        {loading ? "Saving..." : "Complete Signup"}
      </button>
    </form>
  );
}
