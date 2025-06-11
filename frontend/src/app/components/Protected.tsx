"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Protected({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = !!localStorage.getItem("token");
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      router.replace("/"); // Redirect to home if not authenticated
    }
  }, [router]);

  if (isLoggedIn === null) return null; // or loading spinner

  return isLoggedIn ? <>{children}</> : null;
}
