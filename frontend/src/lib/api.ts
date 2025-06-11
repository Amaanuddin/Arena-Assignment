import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function authAxios() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  return axios.create({
    baseURL: API_URL,
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });
}
