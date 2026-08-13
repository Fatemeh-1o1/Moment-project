import happyImg from '../../img/3b3f71b2e0587e73e400f4b8f0486c97.jpg';
import calmImg from '../../img/50cae87a2cc60a9ec64efd04c5b27daf.jpg';
import nostalgicImg from '../../img/3bdee72df44e61899201bf7282c9c4f8.jpg';
import tiredImg from '../../img/521cfde1c7bf5f7be7f4c33c39981714.jpg';
import type { MoodKey } from './types';

export const MOODS = [
  { key: 'happy', label: 'پوکر', image: happyImg, pin: 'bg-pin-gold' },
  { key: 'calm', label: 'عصبانی', image: calmImg, pin: 'bg-pin-blue' },
  { key: 'nostalgic', label: 'چندش', image: nostalgicImg, pin: 'bg-pin-red' },
  { key: 'tired', label: 'خوشحال', image: tiredImg, pin: 'bg-wood' },
] satisfies ReadonlyArray<{ key: MoodKey; label: string; image: string; pin: string }>;

type Mood = (typeof MOODS)[number];
export const moodByKey = (key: MoodKey): Mood => (MOODS.find(m => m.key === key) ?? MOODS[0]) as Mood;
