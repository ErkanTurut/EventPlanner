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
            const docId = a.payload.doc.id;
            return { docId, ...data };
          })
        )
      );
  }

  getUser(uid: string): Observable<any> {
    return this.firestore
      .collection<User>('users', (ref) => ref.where('uid', '==', uid))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as User;
            const docId = a.payload.doc.id;
            return { docId, ...data };
          })
        )
      );
  }

  addUser(user: User) {
    return this.firestore.collection<User>('users').add(user);
  }

  updateUser(user: User) {
    return this.firestore.collection('users').doc(user.docId).update(user);
  }

  addFavoriteEvent(user: User, eventId: string) {
    if (!user.favoriteEvents.includes(eventId)) {
      this.firestore
        .collection('users')
        .doc(user.docId)
        .update({
          favoriteEvents: arrayUnion(eventId),
        });
    } else {
      this.firestore
        .collection('users')
        .doc(user.docId)
        .update({
          favoriteEvents: arrayRemove(eventId),
        });
    }
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

  //update event
  updateEvent(eventId: string, event: Event) {
    return this.firestore.collection('events').doc(eventId).update(event);
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

  //update conference
  updateConference(
    eventId: string,
    conferenceId: string,
    conference: ConferencesItem
  ) {
    return this.firestore
      .collection('events')
      .doc(eventId)
      .collection('conferences')
      .doc(conferenceId)
      .update(conference);
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
