import { useEffect, useState } from "react";
import { LogOut, Save, User, X } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ProfilePopup({ onClose }) {
  const { profile, saveProfile, logout } = useApp();

  const [name, setName] = useState(profile?.name || "");
  const [email, setEmail] = useState(profile?.email || "");

  // Profile change hone par fields update ho jayein
  useEffect(() => {
    setName(profile?.name || "");
    setEmail(profile?.email || "");
  }, [profile]);

  const handleSave = () => {
    saveProfile({
      name: name.trim(),
      email: email.trim(),
    });

    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
    window.location.href = "/";
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="profile-popup"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top */}
        <div className="profile-top">
          <div className="profile-avatar">
            <User size={34} />
          </div>

          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close profile"
          >
            <X size={20} />
          </button>
        </div>

        {/* Heading */}
        <h2>My Profile</h2>
        <p className="muted">
          Manage your executive profile
        </p>

        {/* Name */}
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

        {/* Email */}
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        {/* Save */}
        <button
          className="primary-button full-width"
          onClick={handleSave}
        >
          <Save size={17} />
          Save Profile
        </button>

        {/* Logout */}
        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </div>
  );
}