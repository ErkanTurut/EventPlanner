import { Timestamp } from 'firebase/firestore';
export interface User {
  docId?: string;
  uid: string;
  role: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthDate?: Timestamp;
  displayName?: string;
  photoURL?: string;
  favoriteEvents?: string[];
  isOrganizer: boolean;
}

export interface Score {
  docId?: string;
  eventId: string;
  userId: string;
  score: number;
}
