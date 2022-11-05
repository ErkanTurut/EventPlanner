import { Timestamp } from 'firebase/firestore';

export interface ConferencesItem {
  id?: string;
  availablity: boolean;
  title: string;
  description: string;
  speakers: string[];
  availableFrom: Timestamp;
  availableTo: Timestamp;
  location: string;
  booked: boolean;
  participants: string[];
  price: number;
  vip: boolean;
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
  availableFrom: Timestamp;
  availableTo: Timestamp;
  conferences?: ConferencesItem[];
  updated?: Timestamp;
}
