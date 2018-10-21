import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;

    constructor(private auth:AuthService, private router:Router, private formBuilder:FormBuilder) { }

    ngOnInit() {
        if(this.auth.isLoggedIn()) {
            this.router.navigate(['home']);
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

        this
    }
}
