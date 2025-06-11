"use client";
import { useEffect, useState } from "react";
import { authAxios } from "@/lib/api";
import { getWalletFromToken } from "@/lib/auth";
import Protected from "../components/Protected";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    authAxios().get("/users/me").then(res => {
      setProfile(res.data);
      setUsername(res.data.username || "");
      setBio(res.data.bio || "");
      setProfilePic(res.data.profile_pic_url || "");
      setLoading(false);
    });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await authAxios().patch("/users/me", {
        username,
        bio,
        profile_pic_url: profilePic,
      });
      alert("Profile updated!");
    } catch {
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Protected><div>Loading...</div> </Protected>;

  return (
    <Protected>
    <main className="mx-auto max-w-xl p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-2">Profile</h2>
      <form onSubmit={handleSave} className="space-y-4 bg-white rounded p-6 shadow">
        <div>
          <label className="block font-medium">Wallet</label>
          <div className="font-mono">{profile.wallet_address}</div>
        </div>
        <div>
          <label className="block font-medium">Username</label>
          <input
            className="mt-1 block w-full border rounded p-2"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Bio</label>
          <textarea
            className="mt-1 block w-full border rounded p-2"
            rows={2}
            value={bio}
            maxLength={280}
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
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </main>
    </Protected>
  );
}
