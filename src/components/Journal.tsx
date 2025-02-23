import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface JournalEntry {
  content: string;
  timestamp: string;
}

export default function Journal() {
  const [content, setContent] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const handleSave = () => {
    if (content.trim()) {
      const newEntry = {
        content,
        timestamp: new Date().toISOString(),
      };
      const updatedEntries = [...entries, newEntry];
      setEntries(updatedEntries);
      localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
      setContent('');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-8">
        <a href="/" className="flex items-center text-sm mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </a>

        <div className="mb-8">
          <h1 className="text-3xl font-light mb-4">Journal</h1>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-64 p-4 border border-gray-200 rounded-lg focus:border-black focus:ring-0"
            placeholder="Write your thoughts..."
          />
          <button
            onClick={handleSave}
            className="mt-4 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors"
          >
            Save Entry
          </button>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-medium">Previous Entries</h2>
          {entries.map((entry, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="text-sm text-gray-500 mb-2">
                {new Date(entry.timestamp).toLocaleString()}
              </div>
              <p className="whitespace-pre-wrap">{entry.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}