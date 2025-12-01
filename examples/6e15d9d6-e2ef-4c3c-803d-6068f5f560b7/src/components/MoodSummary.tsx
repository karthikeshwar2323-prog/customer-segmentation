import React from 'react';
import { MoodEntry } from '../types.ts';

type Props = {
  entries: MoodEntry[];
};

export default function MoodSummary({ entries }: Props) {
  const getMoodSuggestion = (averageMood: number) => {
    if (averageMood <= 2) {
      return "建议找个信任的人聊聊你的感受。记住，在需要的时候寻求帮助是完全可以的。";
    } else if (averageMood <= 3) {
      return "试着在日常生活中加入一些你喜欢的活动。有时候一个小小的改变就能带来很大的不同。";
    } else if (averageMood <= 4) {
      return "你做得很好！继续保持当前的好习惯和人际关系。";
    } else {
      return "太棒了！继续保持这种积极的心态，也别忘了把这份快乐分享给身边的人。";
    }
  };

  const moodToNumber = {
    'very-sad': 1,
    'sad': 2,
    'neutral': 3,
    'happy': 4,
    'very-happy': 5,
  };

  const averageMood = entries.length > 0
    ? entries.reduce((sum, entry) => sum + moodToNumber[entry.mood], 0) / entries.length
    : 3;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">心情分析</h3>
      <div className="space-y-4">
        <p className="text-gray-600">
          根据您最近的记录，这里是我们的建议：
        </p>
        <blockquote className="border-l-4 border-blue-500 pl-4 italic">
          {getMoodSuggestion(averageMood)}
        </blockquote>
      </div>
    </div>
  );
}