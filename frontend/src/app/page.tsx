"use client";
import { useEffect, useState } from "react";
import { getWalletFromToken } from "@/lib/auth";
import { authAxios } from "@/lib/api";
import SignupForm from "./components/SignupForm";
import Feed from "./components/Feed";

export default function Home() {
  const wallet = getWalletFromToken();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(!!wallet);

  useEffect(() => {
    if (!wallet) return;
    authAxios()
      .get(`/users/me`)
      .then((res) => setProfile(res.data))
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [wallet]);

  if (loading) return <div className="text-center p-8">Loading...</div>;

  if (wallet && profile && profile.isNew) {
    // Only show SignupForm if profile is incomplete, and not in Navbar!
    return (
      <main className="max-w-xl mx-auto p-4">
        <SignupForm wallet={wallet} onSignedUp={() => window.location.reload()} />
      </main>
    );
  }

  // Show regular UI for existing/complete users
  return (
    <main className="max-w-xl mx-auto p-4">
      <Feed />
    </main>
  );
}
