import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

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
    

    constructor(private auth:AuthService, private router:Router, private formBuilder:FormBuilder) { }

    ngOnInit() {
        if(this.auth.isLoggedIn()) {
            this.router.navigate([this.redirectURL]);
        }

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
                if(err.status == 400) { // validation errors
                    this.errors = err.error.errors;
                    console.log(this.errors);
                }
                else { // other errors, call error handler

                }
            }
        );
    }
}
