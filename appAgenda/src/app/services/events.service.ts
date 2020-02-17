import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventI } from '../models/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private eventCollection: AngularFirestoreCollection<EventI>;
  private events: Observable<EventI[]>;
  private eventType: string;
  public timeService: string;

  constructor(db: AngularFirestore) {
    this.eventCollection = db.collection<EventI>('events', ref => ref.orderBy('date', 'asc'));
    this.events = this.eventCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
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

  setEventType(data: string) {
    this.eventType = data;
  }
  getData () {
    return this.eventType;
  }

  setTime(data: string) {
    this.timeService = data;
  }
  getTime () {
    return this.timeService;
  }

  getEvents() {
    return this.events;
  }

  getEvent(id: string) {
    return this.eventCollection.doc<EventI>(id).valueChanges();
  }

  updateEvent(event: EventI, id: string){
    return this.eventCollection.doc(id).update(event);
  }

  addEvent(event: EventI) {
    return this.eventCollection.add(event);
  }

  removeEvent(id: string) {
    return this.eventCollection.doc(id).delete();
  }

}




