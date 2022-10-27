import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firstore: Firestore) {}

  getUser(uid: string) {
    return docData(doc(this.firstore, `users`, uid));
  }
  getUsers() {
    return collectionData(collection(this.firstore, 'users'));
  }

  addUser(user: User) {
    return addDoc(collection(this.firstore, `users/${user.id}`), user);
  }
}
