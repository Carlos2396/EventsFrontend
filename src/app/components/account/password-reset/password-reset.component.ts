import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})

export class PasswordResetComponent implements OnInit {
  submitted: boolean = false;
  token: string;
  errors = {};

  resetForm: FormGroup;

  constructor(private account: AccountService, private router: Router, private formBuilder: FormBuilder, private notification: NotificationService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.token = this.route.snapshot.params.token;

    this.resetForm = this.formBuilder.group({
      token: [this.token, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  get f() {
    return this.resetForm.controls;
  }

  resetPassword() {
    this.submitted = true;

    if (this.resetForm.invalid) {
        console.log(this.resetForm);
      return;
    }

    this.account.resetPassword(this.resetForm.value)
      .subscribe(
        (res) => {
          this.notification.printSuccessMessage('La contraseña se ha actualizado correctamente.');
          this.router.navigate(['login']);
        },
        (err: HttpErrorResponse) => {
            console.log(err);
          this.errors = {};
          if (err.status == 400) { // validation errors
            this.errors = err.error.errors;

            if(err.error.errors.token) {
              this.notification.printErrorMessage('El token para cambiar la contraseña es inválido.');
            }
          } else {
            if(err.status == 401) {
              this.notification.printErrorMessage('El token para cambiar la contraseña ha expirado. Genera uno nuevo.');
            }
            else {
              if (err.status > 400 && err.status < 500) {
                this.notification.printErrorMessage(err.error.message);
              } else {
                this.notification.printNoticeMessage("Intenta de nuevo más tarde.");
              }
            }
          }
        }
    );
  }
}
