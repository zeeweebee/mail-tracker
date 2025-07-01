// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import EntryCard from './EntryForm';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupProgress, setGroupProgress] = useState({ completed: 0, total: 10 });

  useEffect(() => {
    const mockEntries = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      entryId: (user.currentGroupId - 1) * 10 + i + 1,
      email: i < 3 ? `user${i + 1}@example.com` : '',
      updatedBy: i < 3 ? 'current_user' : null,
      updatedAt: i < 3 ? new Date().toISOString() : null,
    }));
    setEntries(mockEntries);
    setGroupProgress({ completed: 3, total: 10 });
    setLoading(false);
  }, [user]);

  const handleEmailUpdate = (entryId, email) => {
    setEntries(prev =>
      prev.map(entry =>
        entry.id === entryId
          ? { ...entry, email, updatedBy: user.username, updatedAt: new Date().toISOString() }
          : entry
      )
    );
    const completedCount = entries.filter(e => e.email || e.id === entryId).length;
    setGroupProgress(prev => ({ ...prev, completed: completedCount }));
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center">
          <User className="mr-2 text-indigo-600" />
          <h1 className="text-xl font-semibold text-gray-900">
            Welcome, {user.username}
            {user.isAdmin && <span className="ml-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Admin</span>}
          </h1>
        </div>
        <button onClick={logout} className="text-gray-500 hover:text-gray-700">Sign Out</button>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-lg font-semibold mb-2">Group {user.currentGroupId} Progress</h2>
          <div className="text-sm text-gray-600 flex items-center mb-2">
            <Clock className="h-4 w-4 mr-1" /> {groupProgress.completed}/{groupProgress.total} completed
          </div>
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-3" style={{ width: `${(groupProgress.completed / groupProgress.total) * 100}%` }}></div>
          </div>
          {groupProgress.completed === groupProgress.total && (
            <div className="mt-4 p-3 bg-green-50 flex items-center rounded-md">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">Group completed! A new group will be assigned automatically.</span>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm grid gap-4 md:grid-cols-2">
          {entries.map(entry => (
            <EntryCard key={entry.id} entry={entry} onEmailUpdate={handleEmailUpdate} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
