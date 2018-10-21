import { Component, OnInit } from '@angular/core';
import { Event } from "../../../models/event.model";
import { Location } from "../../../models/location.model";
import { Sponsor } from "../../../models/sponsor.model";
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { APIService } from '../../../services/api.service'
import { NotificationService } from '../../../services/notification.service'

@Component({
  selector: 'app-events-index',
  templateUrl: './events-index.component.html',
  styleUrls: ['./events-index.component.css']
})
export class EventsIndexComponent implements OnInit {

  constructor(private notification:NotificationService, private api:APIService, private auth:AuthService, private router:Router) { }

  xs = [1, 2, 3, 4, 5];
  events: Event[];

  ngOnInit() {
    this.getAllEvents();

  }

  getAllEvents(){
    this.api.list(Event.endpoint);
  }
  


}
