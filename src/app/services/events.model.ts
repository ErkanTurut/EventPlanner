import { Timestamp } from 'firebase/firestore';

export interface Participant {
  id?: string;
  uid: string;
  status: boolean;
  created: Date | Timestamp;
  updated: Date | Timestamp;
  checkedIn: boolean;
  checkedInDate?: Date | Timestamp;
  checkOutDate?: Date | Timestamp;
}

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
  tags: string[];
  capacity: number;
  documents?: string[];
  created: Date | Timestamp;
  updated: Date | Timestamp;
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
  updated: Date | Timestamp;
}
