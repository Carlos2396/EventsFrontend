import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrls: ['./account-confirmation.component.css']
})
export class AccountConfirmationComponent implements OnInit {

  constructor(private notifications: NotificationService, private account:AccountService, private router:Router, private route:ActivatedRoute) { }

  uuid: string;

  ngOnInit() {
    this.uuid = this.route.snapshot.params.uuid;
    console.log(this.uuid);

    this.account.confirmAccount(this.uuid)
      .subscribe(
        (res) => {
            console.log(res);
            this.notifications.printSuccessMessage('Tu cuenta ha sido activada. Ya puedes iniciar sesión.');
            this.router.navigate(['login']);
        },
        (err: HttpErrorResponse) => {
            console.log(err);
            this.notifications.printErrorMessage(err.error.message);
        }
      );
  }

}
