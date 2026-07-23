import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchCurrentUser } from '../api/client';

// Deliberately minimal for Thursday: its only job is to prove that after
// logging in, the token can be sent back to a protected route and the
// server correctly identifies who's asking.
//
// Friday's lesson replaces the contents of this page with the real
// Account Balance / Completed Runs / Active Reservations summary cards,
// backed by GET /dashboard/summary.
export default function DashboardPage() {
  const { token, user, logout } = useAuth();
  const [profile, setProfile] = useState(user);
  const [error, setError] = useState('');

  useEffect(() => {
    // If the page was refreshed, `user` from context is gone but the
    // token survived (it's in localStorage) — re-fetch to prove the
    // round trip still works on its own, not just right after login.
    if (!profile && token) {
      fetchCurrentUser(token)
        .then(setProfile)
        .catch((err) => setError(err.message));
    }
  }, [profile, token]);

  return (
    <div className="dashboard-page">
      <h1>User Overview</h1>

      {error && <p className="error">{error}</p>}

      {profile ? (
        <p>
          Logged in as <strong>{profile.name}</strong> ({profile.email}).
          <br />
          This came back from a protected route using the token issued at login —
          the round trip works.
        </p>
      ) : (
        <p>Loading profile...</p>
      )}

      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
