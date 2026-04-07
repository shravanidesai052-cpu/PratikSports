import React, { useState } from "react";
import API from "../services/api";

export default function ProfileSaveButton({ editForm, setUser, setEditForm, setEditing }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await API.put(`/auth/user/${editForm.mobile}`, editForm);
      if (response.data) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify({ 
          username: response.data.username, 
          mobile: response.data.mobile 
        }));
        setEditing(false);
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button
          onClick={() => setEditing(false)}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
