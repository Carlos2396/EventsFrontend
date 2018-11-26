import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AccountService } from '../../../services/account.service'
import { NotificationService } from '../../../services/notification.service'
import { User } from "../../../models/user.model";

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.css']
})
export class UserShowComponent implements OnInit {

  user: User;

  constructor(private notification:NotificationService, private account:AccountService, private auth:AuthService, private router:Router) { }

  ngOnInit() {
    this.user = new User("","","","");
    this.account.getLogged()
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
