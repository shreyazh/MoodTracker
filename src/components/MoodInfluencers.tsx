import React, { useState } from 'react';

const questions = [
  { category: 'Sleep', question: 'How well did you sleep last night?', impact: 'positive' },
  { category: 'Exercise', question: 'Did you engage in any physical activity today?', impact: 'positive' },
  { category: 'Work Stress', question: 'How stressful was your work today?', impact: 'negative' },
  { category: 'Social Activities', question: 'Did you interact socially today?', impact: 'positive' },
  { category: 'Screen Time', question: 'How many hours did you spend on screens?', impact: 'negative' },
  { category: 'Nutrition', question: 'How balanced was your diet today?', impact: 'positive' },
  { category: 'Hydration', question: 'Did you drink enough water today?', impact: 'positive' },
  { category: 'Mindfulness', question: 'Did you practice meditation or mindfulness?', impact: 'positive' },
  { category: 'Hobbies', question: 'Did you spend time on hobbies today?', impact: 'positive' },
  { category: 'Outdoor Time', question: 'Did you spend time outdoors today?', impact: 'positive' },
];

export default function MoodInfluencersTest() {
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (category, value) => {
    setResponses({ ...responses, [category]: parseInt(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getCategoryScore = (category) => {
    return responses[category] || 0;
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-medium text-gray-900 mb-6">Mood Influencers Test</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {questions.map(({ category, question }) => (
            <div key={category} className="border border-gray-200 rounded-lg p-4">
              <p className="mb-2 font-medium">{question}</p>
              <input
                type="range"
                min="0"
                max="100"
                value={responses[category] || 50}
                onChange={(e) => handleChange(category, e.target.value)}
                className="w-full"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          {questions.map(({ category, impact }) => (
            <div key={category} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{category}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    impact === 'positive' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {impact}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-black rounded-full h-2"
                  style={{ width: `${getCategoryScore(category)}%` }}
                />
              </div>
            </div>
          ))}
          <button
            onClick={() => setSubmitted(false)}
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 mt-4"
          >
            Retake Test
          </button>
        </div>
      )}
    </div>
  );
}
