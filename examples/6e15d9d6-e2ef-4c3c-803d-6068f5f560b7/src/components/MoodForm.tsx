import React, { useState } from 'react';
import { MoodEntry } from '../types.ts';

type Props = {
  onSubmit: (entry: Omit<MoodEntry, 'id'>) => void;
};

export default function MoodForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState({
    mood: 'neutral',
    events: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: new Date().toISOString(),
      weather: 'sunny', // 保持默认值以兼容现有数据结构
    });
    setFormData({ mood: 'neutral', events: '', notes: '' });
  };

  const moodLabels = {
    'very-sad': '非常难过',
    'sad': '难过',
    'neutral': '一般',
    'happy': '开心',
    'very-happy': '非常开心'
  };

  const moodEmojis = {
    'very-sad': '😭',
    'sad': '😢',
    'neutral': '😐',
    'happy': '😊',
    'very-happy': '😄'
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">今日心情</label>
        <div className="flex gap-4 justify-center">
          {['very-sad', 'sad', 'neutral', 'happy', 'very-happy'].map((mood) => (
            <button
              key={mood}
              type="button"
              onClick={() => setFormData({ ...formData, mood })}
              className={`p-3 rounded-full ${
                formData.mood === mood ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-100'
              }`}
              title={moodLabels[mood as keyof typeof moodLabels]}
            >
              <span className="text-2xl" role="img" aria-label={moodLabels[mood as keyof typeof moodLabels]}>
                {moodEmojis[mood as keyof typeof moodEmojis]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          今日大事
        </label>
        <input
          type="text"
          value={formData.events}
          onChange={(e) => setFormData({ ...formData, events: e.target.value })}
          className="w-full p-2 border rounded-md"
          placeholder="今天发生了什么？"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          备注
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full p-2 border rounded-md"
          rows={3}
          placeholder="有什么想法和感受想记录下来？"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        保存记录
      </button>
    </form>
  );
}