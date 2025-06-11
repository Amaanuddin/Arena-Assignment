"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    // Remove JWT from localStorage
    localStorage.removeItem("token");
    // Optionally, reload the page or redirect to home
    router.push("/");
    window.location.reload();
  }

  return (
    <button
      onClick={handleLogout}
      className="ml-2 px-3 py-1 rounded bg-red-50 text-red-600 font-semibold hover:bg-red-100 cursor-pointer"
    >
      Logout
    </button>
  );
}
