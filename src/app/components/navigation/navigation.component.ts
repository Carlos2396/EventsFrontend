import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
    
    constructor(public auth:AuthService, private notification:NotificationService, private router:Router) { }

    ngOnInit() {
    }

    logout() {
        this.auth.logout()
        .subscribe(
            (res) => {
                console.log(res);
                this.auth.removeSession();
                this.router.navigate(['login']);
            },
            (err:HttpErrorResponse) => {
                if(err.status == 0) { // no response from server
                    this.notification.printNoticeMessage("Intenta de nuevo más tarde.");
                }
                else {
                    this.notification.printErrorMessage(err.error.message);
                }
            }
        )
    }
}
