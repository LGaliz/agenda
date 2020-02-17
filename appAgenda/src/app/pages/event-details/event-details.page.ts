import { Component, OnInit, Input } from '@angular/core';
import { EventI } from '../../models/event.interface';
import { EventsService } from '../../services/events.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})

export class EventDetailsPage implements OnInit {

    event: EventI = {
       title: '',
       date: '', // new Date().toISOString(),
       user: '',
       description: '',
       type: '',
    };
    eventId = null;
    time=null;

    customDayShortNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    // myTime = new Date().toISOString();

constructor(private route: ActivatedRoute, private nav: NavController, private eventsService: EventsService,
            private loadingController: LoadingController) { }

    ngOnInit() {
      console.log(this.eventsService.getData())
      this.eventId = this.route.snapshot.params.id;
      if (this.eventId) {
        this.loadEvent();
      } else {
          this.setType();
      }
    }
    
    setType(){
      this.event.type = this.eventsService.getData();
    }

    async loadEvent() {
      const loading = await this.loadingController.create({
        message: 'Cargando....'
      });
      await loading.present();

      this.eventsService.getEvent(this.eventId).subscribe(event => {
        loading.dismiss();
        this.event = event;
      });
    }

    async saveEvent() {
      const loading = await this.loadingController.create({
        message: 'Guardando....'
      });
      await loading.present();

      if (this.eventId) {
        this.eventsService.updateEvent(this.event, this.eventId).then(() => {
          loading.dismiss();
          this.nav.navigateForward('/');
        });
      } else {
        this.eventsService.addEvent(this.event).then(() => {
          loading.dismiss();
          this.nav.navigateForward('/');
        });
      }
    }

    async onRemoveEvent(idEvent: string) {
     this.eventsService.removeEvent(idEvent);
     console.log('Event delete');
    }

    change(datePicker: any){
      console.log("date",this.event.date);
   //   console.log("datePicker",datePicker);
      datePicker.open();
    }
    dateChanged(date){
      console.log(date.detail.value);
      // console.log(this.myDate);
    }
  }
