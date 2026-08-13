import type {Memory} from '../memories/types';

export interface CalendarCell {
    day: number | null;
    iso: string | null;
    memories: Memory[];
    isToday: boolean;
    isSpecial?: boolean;
  }
  

