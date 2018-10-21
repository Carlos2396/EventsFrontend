import { Component, OnInit } from '@angular/core';
import { Event } from "../../../models/event.model";
import { Location } from "../../../models/location.model";
import { Sponsor } from "../../../models/sponsor.model";
import { User } from "../../../models/user.model";
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { APIService } from '../../../services/api.service'
import { NotificationService } from '../../../services/notification.service'

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css']
})
export class TicketsListComponent implements OnInit {

  constructor(private notification:NotificationService, private api:APIService, private auth:AuthService, private router:Router) { }

  xs = [1,2,3,4,5,6]
  user: User;

  ngOnInit() {
    this.user = new User("", "", "", "");
    this.api.retrieve(User.endpoint, this.auth.getUser().id)
    .subscribe(
      (res:User) => {
        console.log(res);
        this.user = res;
      },
      (err:HttpErrorResponse) => {
        this.notification.handleError(err);
      }
    )
  }

}
