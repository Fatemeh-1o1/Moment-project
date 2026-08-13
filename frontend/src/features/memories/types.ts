export type MoodKey = 'happy' | 'calm' | 'nostalgic' | 'tired';

export interface Media {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
}

export interface Memory {
  id: string;
  content: string;
  mood: MoodKey;
  memoryDate: string;
  createdAt: string;
  updatedAt: string;
  media: Media[];
  isSpecial: boolean;
}

export interface MemoryInput {
  content: string;
  mood: MoodKey;
  memoryDate: string;
  media?: Array<{ type: 'image' | 'video' | 'audio'; url: string }>;
  isSpecial?: boolean;
}