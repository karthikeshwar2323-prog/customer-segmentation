export type MoodEntry = {
  id: string;
  date: string;
  mood: 'very-happy' | 'happy' | 'neutral' | 'sad' | 'very-sad';
  weather: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy';
  events: string;
  notes: string;
};

export type MoodData = {
  [key: string]: MoodEntry;
};