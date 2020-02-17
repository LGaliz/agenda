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
    this.eventsService.getEvents().subscribe((events) => {
    //  console.log('Citas', events);
      this.events = events;
    //  console.log(this.eventsService.timeService)
    });
    //this.userService.afAuth= ;
  }

//  async onRemoveEvent(idEvent: string){
//     // this.eventsService.removeEvent(idEvent);
//     console.log(idEvent);
//   }
}
