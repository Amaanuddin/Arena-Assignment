import {jwtDecode} from "jwt-decode";

export function getWalletFromToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    return decoded.wallet_address || null;
  } catch {
    return null;
  }
}
