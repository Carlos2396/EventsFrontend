import { Component, OnInit } from '@angular/core';
import { Event } from "../../../models/event.model";
import { NotificationService } from 'src/app/services/notification.service';
import { APIService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-events-show',
  templateUrl: './events-show.component.html',
  styleUrls: ['./events-show.component.css']
})
export class EventsShowComponent implements OnInit {

  constructor(private notifications: NotificationService, private api:APIService, private router:Router, private route: ActivatedRoute) { }

  event: Event;
  id: Number;

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.params.id);
    this.api.retrieve(this.api.models.EVENT, this.id)
      .subscribe(
        (res: Event)=>{
          this.event = res;
        },
        (err: HttpErrorResponse) => {
          this.notifications.handleError(err);
        }
      )
      
  }

}
