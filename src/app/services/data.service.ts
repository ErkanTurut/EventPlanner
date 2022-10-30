import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from './user.model';
import { Event } from './events.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: AngularFirestore) {}

  getUsers(): Observable<any[]> {
    return this.firestore
      .collection<User>('users')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as User;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getUser(id: string): Observable<any> {
    return this.firestore
      .collection<User>('users', (ref) => ref.where('id', '==', id))
      .valueChanges();
  }

  addUser(user: User) {
    return this.firestore.collection<User>('users').add(user);
  }

  //event

  getEvents(collection: string): Observable<any[]> {
    return this.firestore
      .collection(collection)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Event;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  addEvent(event: Event) {
    return this.firestore.collection('events').add(event);
  }
}
