import React, { useEffect, useState } from 'react';
import { LineChart, BarChart } from 'lucide-react';

interface MoodEntry {
  mood: number;
  note: string;
  timestamp: string;
}

export default function MoodAnalytics() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const savedEntries = localStorage.getItem('moodEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const getLastWeekData = () => {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return entries.filter(entry => new Date(entry.timestamp) >= lastWeek);
  };

  const getMonthlyData = () => {
    const today = new Date();
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    return entries.filter(entry => new Date(entry.timestamp) >= lastMonth);
  };

  const renderChart = (data: MoodEntry[], height: number = 200) => {
    const maxMood = 5;
    const points = data.map((entry, index) => ({
      x: index * (100 / (data.length - 1 || 1)),
      y: (entry.mood / maxMood) * height,
    }));

    if (points.length < 2) return null;

    const pathData = `M ${points.map(p => `${p.x},${height - p.y}`).join(' L ')}`;

    return (
      <svg width="100%" height={height} className="mt-4">
        <path
          d={pathData}
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={height - point.y}
            r="4"
            fill="black"
          />
        ))}
      </svg>
    );
  };

  return (
    <div className="space-y-8">
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Weekly Mood Trends</h3>
          <LineChart className="w-5 h-5 text-gray-400" />
        </div>
        {renderChart(getLastWeekData())}
      </div>

      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Monthly Overview</h3>
          <BarChart className="w-5 h-5 text-gray-400" />
        </div>
        {renderChart(getMonthlyData())}
      </div>
    </div>
  );
}