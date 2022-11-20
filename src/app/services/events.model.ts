import { Timestamp } from 'firebase/firestore';

export interface ConferencesItem {
  id?: string;
  availablity: boolean;
  title: string;
  description: string;
  speakers: string[];
  availableFrom: Date | Timestamp;
  availableTo: Date | Timestamp;
  location: string;
  participants: string[];
  price: number;
  vip: boolean;
  capacity: number;
  documents?: string[];
}

export interface Event {
  id?: string;
  organizer: string[];
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  price: number;
  availableFrom: Date | Timestamp;
  availableTo: Date | Timestamp;
  conferences?: ConferencesItem[];
  created: Date | Timestamp;
  updated?: Date | Timestamp;
}
