import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { EventI } from '../models/event.interface';
import { EventsService } from '../services/events.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  events: EventI[];

  constructor(private eventsService: EventsService, public userService: UserService) {
    userService.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        eventsService.eventsFromServer(user.uid);
        this.eventList();
      }
    });
  }

  ngOnInit() { }

  eventList() {
    this.eventsService.getEvents().subscribe((events) => {    // Brings list of events
      this.events = events;
    });
  }

  async onRemoveEvent(idEvent: string) {
    this.eventsService.removeEvent(idEvent);
  }
}
