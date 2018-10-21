import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../services/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    submitted = false;
    errors = {};
    redirectURL = '/';

    loginForm: FormGroup;

    constructor(private auth:AuthService, private router:Router, private formBuilder:FormBuilder, private notification:NotificationService) { }

    ngOnInit() {
        /*if(this.auth.isLoggedIn()) {
            this.router.navigate([this.redirectURL]);
        }*/

        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    get f() { return this.loginForm.controls; }

    login() {
        this.submitted = true;

        if(this.loginForm.invalid) {
            return;
        }

        this.auth.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
            (res) => {
                console.log(res);
                this.auth.setSession(res);
                this.router.navigate([this.redirectURL]);
            },
            (err: HttpErrorResponse) => {
                console.log(err);
                if(err.status == 400) { // validation errors
                    this.errors = err.error.errors;   
                    this.notification.printErrorMessage(err.error.message);
                }

                if(err.status == 0) { // no response from server
                    this.notification.printNoticeMessage("Intenta de nuevo más tarde.");
                }
            }
        );
    }
}
