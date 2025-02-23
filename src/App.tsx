import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LineChart, Calendar, Activity, Brain, Sparkles } from 'lucide-react';
import MoodLog from './components/MoodLog';
import MoodAnalytics from './components/MoodAnalytics';
import MoodInfluencers from './components/MoodInfluencers';
import MoodActivities from './components/MoodActivities';
import Timer from './components/Timer';
import Journal from './components/Journal';

type Tab = 'log' | 'analytics' | 'influencers' | 'activities';

function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('log');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-2xl">MoodTracker by VitalSpace</h1>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('log')}
              className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'log'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Daily Log
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'analytics'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <LineChart className="w-4 h-4 mr-2" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('influencers')}
              className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'influencers'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Brain className="w-4 h-4 mr-2" />
              Influencers
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'activities'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Activities
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === 'log' && <MoodLog />}
        {activeTab === 'analytics' && <MoodAnalytics />}
        {activeTab === 'influencers' && <MoodInfluencers />}
        {activeTab === 'activities' && <MoodActivities />}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/timer" element={<Timer duration={1200} onComplete={() => {
          const savedEntries = localStorage.getItem('moodEntries') || '[]';
          const entries = JSON.parse(savedEntries);
          const newEntry = {
            mood: 4,
            note: 'Completed morning walk activity',
            timestamp: new Date().toISOString(),
          };
          localStorage.setItem('moodEntries', JSON.stringify([...entries, newEntry]));
          window.location.href = '/';
        }} />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </Router>
  );
}

export default App;
