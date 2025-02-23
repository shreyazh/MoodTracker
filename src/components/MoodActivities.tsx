import React from 'react';
import { useNavigate } from 'react-router-dom';

const activities = [
  {
    title: 'Morning Walk',
    description: 'Start your day with a refreshing 20-minute walk',
    category: 'Exercise',
    action: '/timer',
  },
  {
    title: 'Mindful Meditation',
    description: '10 minutes of guided breathing and meditation',
    category: 'Mindfulness',
    action: 'https://www.youtube.com/watch?v=VUjiXcfKBn8',
  },
  {
    title: 'Journal Writing',
    description: 'Express your thoughts and feelings through writing',
    category: 'Creative',
    action: '/journal',
  },
  {
    title: 'Social Connection',
    description: 'Reach out to people and make friends',
    category: 'Social',
    action: 'https://www.youtube.com/watch?v=5-AoFVwbWew',
  },
];

export default function MoodActivities() {
  const navigate = useNavigate();

  const handleActivityStart = (action: string) => {
    if (action.startsWith('http')) {
      window.open(action, '_blank');
    } else {
      navigate(action);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-gray-900 mb-6">Recommended Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="border border-gray-200 rounded-lg p-6 hover:border-black transition-colors"
          >
            <span className="inline-block px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700 mb-3">
              {activity.category}
            </span>
            <h3 className="text-lg font-medium mb-2">{activity.title}</h3>
            <p className="text-gray-600">{activity.description}</p>
            <button
              onClick={() => handleActivityStart(activity.action)}
              className="mt-4 text-sm font-medium text-black hover:underline"
            >
              Start Activity →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}