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

  constructor(db: AngularFirestore) {
    this.eventCollection = db.collection<EventI>('events');
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
  setEventType (data) {
    this.eventType = data;
  }
  getData () {
    return this.eventType;
  }

  getEvents(){
    return this.events;
  }

  getEvent(id: string){
    return this.eventCollection.doc<EventI>(id).valueChanges();
  }

  updateEvent(event: EventI, id: string){
    return this.eventCollection.doc(id).update(event);
  }

  addEvent(event: EventI){
    return this.eventCollection.add(event);
  }

  removeEvent(id: string){
    return this.eventCollection.doc(id).delete();
  }

}




