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

  constructor(private eventsService: EventsService,private userService:UserService) { 
  }

  ngOnInit() {
    this.eventsService.getEvents().subscribe((events) => {    // Brings list of events after constructor
      this.events = events;
    });
  }

 async onRemoveEvent(idEvent: string){
     this.eventsService.removeEvent(idEvent);
  }
}
