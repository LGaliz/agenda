import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventI } from '../models/event.interface';
import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private eventCollection: AngularFirestoreCollection<EventI>;
  private events: Observable<EventI[]>;
  private eventType: string;

  constructor(public db: AngularFirestore, userService: UserService, private afAuth: AngularFireAuth) {

  }

  eventsFromServer(user) {   // Brings collection order by date
    this.eventCollection = this.db.collection('users').doc(user).collection<EventI>('events', ref => ref.orderBy('date', 'asc'));
    this.events = this.eventCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  setEventType(data: string) {
    this.eventType = data;
  }
  getType() {
    return this.eventType;
  }

  getEvents() {
    return this.events;
  }

  getEvent(id: string) {
    return this.eventCollection.doc<EventI>(id).valueChanges();
  }

  updateEvent(event: EventI, id: string) {
    return this.eventCollection.doc(id).update(event);
  }

  addEvent(event: EventI) {
    // console.log('New event', this.events)
    return this.eventCollection.add(event);
  }

  removeEvent(id: string) {
    return this.eventCollection.doc(id).delete();
  }

  // sortEvents() {
  //   if (this.eventCollection) {
  //     this.eventCollection.sort((a, b) => {
  //       let dateB = new Date(a.date).getTime()
  //       let dateA = new Date(b.date).getTime()
  //       return dateA - dateB
  //     });
  //   }
  // }

}




