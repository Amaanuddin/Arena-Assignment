'use client';
import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';
import axios from 'axios';

export default function WalletLogin() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const { signMessageAsync } = useSignMessage();

  async function handleLogin() {
    if (!isConnected || !address) {
        alert('Please connect your wallet first!');
        return;
    }
    const message = `Log in to Decentralized Social at ${new Date().toISOString()}`;
    try {
        setLoading(true);
        const signature = await signMessageAsync({ message });

      // Send to backend
      
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/verify`, {
          wallet_address: address,
          message,
          signature,
        });
      localStorage.setItem('token', res.data.access_token);
      alert('Logged in!');
      window.location.reload();

    } catch (err) {
      alert('Login failed!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        className="bg-indigo-600 px-4 py-2 rounded text-white"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? 'Signing...' : 'Sign in with Wallet'}
      </button>
    </div>
  );
}
