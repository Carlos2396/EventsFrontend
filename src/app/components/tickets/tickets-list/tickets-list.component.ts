import { Component, OnInit } from '@angular/core';
import { Event } from "../../../models/event.model";
import { Location } from "../../../models/location.model";
import { Sponsor } from "../../../models/sponsor.model";
import { User } from "../../../models/user.model";
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css']
})
export class TicketsListComponent implements OnInit {

  constructor(private notification:NotificationService, private api:APIService, private auth:AuthService, private router:Router) { }

  events: Event[];

  ngOnInit() {
    if(this.auth.getUser() == null){
      this.router.navigate(['/']);
    }
    else{
      this.api.listTickets(this.auth.getUser().id)
      .subscribe(
        (res:Event[]) => {
          console.log(res);
          console.log("lolol")
          this.events = res;
        },
        (err:HttpErrorResponse) => {
          this.notification.handleError(err);
        }
      )
    }
    
  }

  irApag($id){
    console.log($id);
    this.router.navigate(["events/"+$id]);
  }

  deleteTicket($id){
    var index = 0;
    for(var i = 0; i < this.events.length; i++){
      if(this.events[i].id == $id){
        console.log("123")
        index = i;
      }
    }
    this.events.splice(index, 1);
    this.api.deleteTickets(this.auth.getUser().id, $id)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err:HttpErrorResponse) => {
          this.notification.handleError(err);
        }
      ) 
  }

}
