// src/components/EntryForm.js
import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const EntryCard = ({ entry, onEmailUpdate }) => {
  const [email, setEmail] = useState(entry.email || '');
  const [isEditing, setIsEditing] = useState(!entry.email);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!email.includes('@')) return alert('Enter a valid email');
    setIsSaving(true);
    await new Promise(res => setTimeout(res, 500));
    onEmailUpdate(entry.id, email);
    setIsEditing(false);
    setIsSaving(false);
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="font-mono font-semibold">ID: {entry.entryId}</span>
        {entry.email && !isEditing && (
          <button onClick={() => setIsEditing(true)} className="text-indigo-600 text-sm">
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
          <div className="flex gap-2 mt-3">
            <button onClick={handleSave} disabled={isSaving} className="bg-indigo-600 text-white px-3 py-2 rounded-md">
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            {entry.email && (
              <button onClick={() => { setIsEditing(false); setEmail(entry.email); }} className="border px-3 py-2 rounded-md">
                Cancel
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center text-gray-700">
            <Mail className="h-4 w-4 mr-2" />
            {entry.email || 'No email assigned'}
          </div>
          {entry.updatedBy && (
            <div className="mt-2 text-xs text-gray-500">
              Updated by {entry.updatedBy} • {new Date(entry.updatedAt).toLocaleDateString()}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EntryCard;
