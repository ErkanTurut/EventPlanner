import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from './user.model';
import { Event, ConferencesItem } from './events.model';
import { arrayUnion, arrayRemove } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: AngularFirestore) {}

  //users functions here
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

  //events functions here

  //get all events
  getEvents(): Observable<any[]> {
    return this.firestore
      .collection('events')
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

  //get event by id
  getEvent(eventId: string): Observable<any> {
    return this.firestore
      .collection<Event>('events')
      .doc(eventId)
      .valueChanges()
      .pipe(
        map((actions) => {
          const data = actions as Event;
          const id = eventId;
          return { id, ...data };
        })
      );
  }

  //add event
  addEvent(event: Event) {
    return this.firestore.collection('events').add(event);
  }

  //conferences functions here
  //get all conferences
  getConferences(eventId: string): Observable<any> {
    return this.firestore
      .collection<Event>('events')
      .doc(eventId)
      .collection<ConferencesItem>('conferences')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as ConferencesItem;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  //get conference by id
  getConference(eventId: string, conferenceId: string): Observable<any> {
    return this.firestore
      .collection<Event>('events')
      .doc(eventId)
      .collection<ConferencesItem>('conferences')
      .doc(conferenceId)
      .valueChanges()
      .pipe(
        map((actions) => {
          const data = actions as ConferencesItem;
          const id = eventId;
          return { id, ...data };
        })
      );
  }

  //add conference
  addConference(eventId: string, conference: ConferencesItem) {
    return this.firestore
      .collection('events')
      .doc(eventId)
      .collection('conferences')
      .add(conference);
  }

  bookConference(
    eventId: string,
    conferenceId: string,
    userId: string,
    conference: ConferencesItem
  ) {
    if (conference.participants.includes(userId)) {
      this.firestore
        .collection('events')
        .doc(eventId)
        .collection('conferences')
        .doc(conferenceId)
        .update({
          participants: arrayRemove(userId),
        });
    } else {
      this.firestore
        .collection('events')
        .doc(eventId)
        .collection('conferences')
        .doc(conferenceId)
        .update({
          participants: arrayUnion(userId),
        });
    }
  }
}
