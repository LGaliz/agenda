import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { EventI } from '../models/event.interface';
import { EventsService } from '../services/events.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  events: EventI[];
  hasVerifiedEmail = true;
  sentTimestamp;

  constructor(private eventsService: EventsService, public afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.hasVerifiedEmail = this.afAuth.auth.currentUser.emailVerified;
      }
    });
  }

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
signOut() {
  this.afAuth.auth.signOut().then(() => {
    location.reload();
  });
}

sendVerificationEmail() {
  this.afAuth.auth.currentUser.sendEmailVerification();
  this.sentTimestamp = new Date();
}

reload() {
  //window.location.reload();
}
}
