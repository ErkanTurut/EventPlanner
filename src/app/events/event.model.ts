export interface conferencesItem {
  id: string;
  availablity: boolean;
  title: string;
  description: string;
  speakers: string[];
  availableFrom: Date;
  availableTo: Date;
  location: string;
  booked: boolean;
  attendance: number;
  price: number;
  vip: boolean;
  documents: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  price: number;
  availableFrom: Date;
  availableTo: Date;
  conferences: conferencesItem[];
}
