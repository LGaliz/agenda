import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { EventI } from '../models/event.interface';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  events: EventI[];

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getEvents().subscribe((events) => {
    //  console.log('Citas', events);
      this.events = events;
    //  console.log(this.eventsService.timeService)
    });
  }

//  async onRemoveEvent(idEvent: string){
//     // this.eventsService.removeEvent(idEvent);
//     console.log(idEvent);
//   }
}

