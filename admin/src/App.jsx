import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Sermons from "./pages/Sermons";
import Events from "./pages/Events";
import Posts from "./pages/Posts";
import Staff from "./pages/Staff";
import PrayerRequests from "./pages/PrayerRequests";
import Messages from "./pages/Messages";
import Donations from "./pages/Donations";

function Protected() {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return <Layout />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Protected />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/events" element={<Events />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/prayer-requests" element={<PrayerRequests />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/donations" element={<Donations />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
