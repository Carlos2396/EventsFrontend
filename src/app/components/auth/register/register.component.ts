import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../../../services/api.service';
import { User } from '../../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    redirectURL:string = '/';
    submitted:boolean = false;
    errors = {};

    registerForm: FormGroup;

  constructor(private auth:AuthService, private api:APIService, private router:Router, private formBuilder:FormBuilder, private notification:NotificationService) { }

  ngOnInit() {
    if(this.auth.isLoggedIn()) {
        this.router.navigate([this.redirectURL]);
    }

    this.registerForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        alias: ['', Validators.required],
        birthdate: ['', Validators.required],
        gender: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        password_confirmation: ['', Validators.required]
    });
  }


  get f() { return this.registerForm.controls; }

  register() {
      this.submitted = true;

      if(this.registerForm.invalid) {
          return;
      }

      this.api.register(this.registerForm.value)
      .subscribe(
        (res:User) => {
            this.notification.printSuccessMessage('Te has registrado exitosamente. Te hemos enviado un correo electrónico para verificar tu cuenta.');
            this.router.navigate(['login']);
        },
        (err: HttpErrorResponse) => {
            this.errors = {};
            if(err.status == 400) { // validation errors
                this.errors = err.error.errors; 
            }
            else {
                if(err.status > 400 && err.status < 500) {
                    this.notification.printErrorMessage(err.error.message);
                }
                else {
                    this.notification.printNoticeMessage("Intenta de nuevo más tarde.");
                }
            }
        }
      );
  }

}
