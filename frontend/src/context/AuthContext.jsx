import { createContext, useContext, useState } from 'react';
import { loginUser, registerUser, fetchCurrentUser } from '../api/client';

const AuthContext = createContext(null);

// Keeping the token in localStorage means the student stays logged in
// across a page refresh — without it, every reload would lose the token
// and bounce them back to /login.
const STORAGE_KEY = 'campusride_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY));
  const [user, setUser] = useState(null);

  async function login({ email, password }) {
    const data = await loginUser({ email, password });
    localStorage.setItem(STORAGE_KEY, data.token);
    setToken(data.token);

    // Prove the round trip: use the token we just received to call a
    // protected route and get back who we are, straight from the server.
    const me = await fetchCurrentUser(data.token);
    setUser(me);
  }

  async function register({ name, email, password }) {
    await registerUser({ name, email, password });
    // Registration doesn't log the user in automatically here —
    // keeping register and login as two distinct, explicit steps
    // makes the flow easier to reason about while learning it.
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
  }

  const value = { token, user, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
}
