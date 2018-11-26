import { Component, OnInit } from '@angular/core';
import { Event } from "../../../models/event.model";
import { NotificationService } from 'src/app/services/notification.service';
import { APIService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-events-show',
  templateUrl: './events-show.component.html',
  styleUrls: ['./events-show.component.css']
})
export class EventsShowComponent implements OnInit {

  constructor(private auth: AuthService,private notifications: NotificationService, private api:APIService, private router:Router, private route: ActivatedRoute) { }

  event: Event;
  id: Number = 1;
  available_guests: number;

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.params.id);
    this.api.retrieve(this.api.models.EVENT, this.id)
      .subscribe(
        (res: Event)=>{
          this.event = res;
          this.available_guests = this.event.guest_capacity - this.event.attendees.length;
        },
        (err: HttpErrorResponse) => {
          this.notifications.handleError(err);
        }
      )
  }

  toRegisterEvent(){
    console.log(this.id);
    this.router.navigate(["registerEvent/"+this.id]);
  }

}
