import React, { useState, useEffect } from 'react';
import { Book } from 'lucide-react';
import MoodForm from './components/MoodForm.tsx';
import MoodChart from './components/MoodChart.tsx';
import { MoodEntry } from './types.ts';

function App() {
  const [entries, setEntries] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem('moodEntries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (entry: Omit<MoodEntry, 'id'>) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setEntries([...entries, newEntry]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <Book className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">心情日记</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold mb-4">今天心情如何？</h2>
            <MoodForm onSubmit={handleSubmit} />
          </div>
          
          <div className="h-full">
            <h2 className="text-xl font-semibold mb-4">心情变化趋势</h2>
            <div className="bg-white p-4 rounded-lg shadow-md h-[calc(100%-2rem)]">
              <MoodChart entries={entries} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;