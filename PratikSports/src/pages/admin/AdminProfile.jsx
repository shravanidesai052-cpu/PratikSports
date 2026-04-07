import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import API from '../../services/api';

export default function AdminProfile() {
  const [adminData, setAdminData] = useState({
    username: 'PratikSports',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Admin credentials are fixed for now
    setAdminData(prev => ({
      ...prev,
      username: 'PratikSports'
    }));
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!adminData.currentPassword || !adminData.newPassword || !adminData.confirmPassword) {
      setMessage('Please fill in all password fields');
      return;
    }

    if (adminData.newPassword !== adminData.confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    if (adminData.newPassword.length < 6) {
      setMessage('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Verify current password (for admin, check if it matches stored password)
      if (adminData.currentPassword !== 'admin123') {
        setMessage('Current password is incorrect');
        return;
      }

      // Update admin password via API
      await API.put('/auth/reset-password', {
        mobile: '9999999999', // Admin mobile number
        newPassword: adminData.newPassword
      });

      // Update localStorage with new password
      const updatedAdmin = {
        username: adminData.username,
        password: adminData.newPassword
      };

      localStorage.setItem('admin', JSON.stringify(updatedAdmin));
      setMessage('Admin password updated successfully!');
      setEditing(false);
      
      // Reset password fields
      setAdminData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

    } catch (error) {
      console.error('Update error:', error);
      setMessage('Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setMessage('');
    setAdminData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  return (
    <>
      <AdminNavbar />
      
      <div className="p-6 bg-linear-to-br from-emerald-50 via-blue-50 to-indigo-100 min-h-screen relative overflow-hidden">
        {/* Sports-themed background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute top-60 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-1/3 w-36 h-36 bg-indigo-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-purple-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-linear-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <h1 className="text-5xl font-bold bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">Admin Profile</h1>
              <p className="text-gray-600 text-lg">Manage your administrator account settings</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30">
              {!editing ? (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      Admin Username
                    </label>
                    <input
                      type="text"
                      value={adminData.username}
                      onChange={(e) => setAdminData(prev => ({ ...prev, username: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="Admin username"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                      </svg>
                      Security Status
                    </label>
                    <div className="px-4 py-3 bg-linear-50 border-2 border-green-200 rounded-xl">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span className="text-green-700 font-medium">Admin account secured</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setEditing(true)}
                      className="flex-1 bg-linear-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-bold shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                      Change Password
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      Admin Username
                    </label>
                    <input
                      type="text"
                      value={adminData.username}
                      onChange={(e) => setAdminData(prev => ({ ...prev, username: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="Admin username"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                      </svg>
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={adminData.currentPassword}
                      onChange={(e) => setAdminData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="Enter current password"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                      </svg>
                      New Password
                    </label>
                    <input
                      type="password"
                      value={adminData.newPassword}
                      onChange={(e) => setAdminData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="Enter new password"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                      </svg>
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={adminData.confirmPassword}
                      onChange={(e) => setAdminData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>

                  {message && (
                    <div className={`p-4 rounded-xl text-sm font-medium ${
                      message.includes('success') || message.includes('updated') 
                        ? 'bg-linear-50 text-green-700 border-2 border-green-200' 
                        : 'bg-red-50 text-red-700 border-2 border-red-200'
                    }`}>
                      {message}
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-linear-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-bold shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
                          </svg>
                          Updating...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                          Update Password
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition-all duration-300 font-bold transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

 
