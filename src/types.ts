export type BirthdayPhase = 
  | 'BEFORE_BIRTHDAY'
  | 'CELEBRATION_TRIGGER'
  | 'BIRTHDAY_REVEAL'
  | 'BIRTHDAY_POPUP'
  | 'BIRTHDAY_EXPERIENCE';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
  totalMilliseconds: number;
}

export interface PhotoMemory {
  id: number;
  number: string;
  theme: string;
  emotionalLabel: string;
  shortShayari: string;
  detailedMemory: string;
  photoUrl: string;
  fallbackUrls: string[];
  locationHint?: string;
  aspectRatio?: string;
  objectPosition?: string;
}

export interface ShayariItem {
  id: number;
  hindi: string;
  translation?: string;
  contextNote?: string;
}
