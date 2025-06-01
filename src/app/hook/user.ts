import { useState, useEffect } from 'react';

export function user() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {
      setToken(token);
      setUser({ email });
      setShowModal(false);
    } else {
      setToken(null);
      setUser(null);
      setShowModal(true);
    }
  }, []);

  async function handleAuth(
    mode: 'login' | 'signup',
    email: string,
    password: string
  ) {
    setAuthError(null);
    const res = await fetch(`/api/auth/${mode}`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
      const { token, user } = await res.json();
      localStorage.setItem('token', token);
      localStorage.setItem('email', user.email);
      setToken(token);
      setUser({ email: user.email });
      setShowModal(false);
      setAuthError(null);
      return token;
    } else {
      const data = await res.json().catch(() => ({}));
      setAuthError(data?.message || 'Authentication failed');
      return null;
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setToken(null);
    setUser(null);
    setShowModal(true);
    setAuthError(null);
  }

  return {
    user,
    token,
    showModal,
    setShowModal,
    handleAuth,
    handleLogout,
    setUser,
    setToken,
    authError,
    setAuthError,
  };
}
