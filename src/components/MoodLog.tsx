import React, { useState, useEffect } from 'react';

const moods = [
  { value: 5, label: 'Excellent', emoji: '😊' },
  { value: 4, label: 'Good', emoji: '🙂' },
  { value: 3, label: 'Neutral', emoji: '😐' },
  { value: 2, label: 'Low', emoji: '🙁' },
  { value: 1, label: 'Very Low', emoji: '😢' },
];

interface MoodEntry {
  mood: number;
  note: string;
  timestamp: string;
}

export default function MoodLog() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const savedEntries = localStorage.getItem('moodEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const handleSaveEntry = () => {
    if (selectedMood) {
      const newEntry = {
        mood: selectedMood,
        note,
        timestamp: new Date().toISOString(),
      };
      const updatedEntries = [...entries, newEntry];
      setEntries(updatedEntries);
      localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
      setSelectedMood(null);
      setNote('');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium text-gray-900 mb-4">How are you feeling today?</h2>
        <div className="grid grid-cols-5 gap-4">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`p-4 rounded-lg border ${
                selectedMood === mood.value
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">{mood.emoji}</div>
              <div className="text-sm">{mood.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
          Add a note (optional)
        </label>
        <textarea
          id="note"
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-black focus:ring-0"
          placeholder="What's on your mind?"
        />
      </div>

      <button
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors"
        onClick={handleSaveEntry}
      >
        Save Entry
      </button>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Previous Entries</h3>
        {entries.map((entry, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">
                {moods.find((m) => m.value === entry.mood)?.emoji}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(entry.timestamp).toLocaleString()}
              </span>
            </div>
            {entry.note && <p className="text-gray-700">{entry.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}