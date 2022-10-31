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
  attendance: number;
  price: number;
  vip: boolean;
  documents?: string[];
}

export interface Event {
  id?: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  price: number;
  availableFrom: Timestamp;
  availableTo: Timestamp;
  conferences?: ConferencesItem[];
  updated?: Date;
}
