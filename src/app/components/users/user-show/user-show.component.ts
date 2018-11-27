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
  changePss: Boolean;
  old_password: String;
  password: String;
  password_confirmation: String;

  constructor(private notification:NotificationService, private account:AccountService, private auth:AuthService, private router:Router) { }

  ngOnInit() {
    this.old_password = "";
    this.password = "";
    this.password = "";
    this.user = new User("","","","");
    this.changePss = false;
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

  toogle(){
    this.changePss = !this.changePss;
  }

  changePassword(){
    if(this.validate()){
      let x = {old_password: this.old_password, password: this.password, password_confirmation: this.password_confirmation};
      this.account.changePassword(x)
      .subscribe(
        res =>{
          this.notification.printMessage("Contraseña cambiada con exito", this.notification.notificationType.success);
          this.changePss = false;
        },
        err =>{
          console.log(err);
          this.notification.handleError(err);
        }
      )
    }
  }

  validate(){
    if(this.old_password.length == 0){
      this.notification.printMessage("Por favor llena todos los campos", this.notification.notificationType.error);
      return false;
    }
    else if(this.password.length == 0){
      this.notification.printMessage("Por favor llena todos los campos", this.notification.notificationType.error);
      return false
    }
    else if(this.password_confirmation.length == 0){
      this.notification.printMessage("Por favor llena todos los campos", this.notification.notificationType.error);
      return false;
    }
    if(this.old_password == this.password){
      this.notification.printMessage("La contraseña nueva no puede ser igual a la actual", this.notification.notificationType.error);
      return false;
    }
    if(this.password_confirmation != this.password){
      this.notification.printMessage("Las contraseñas no coinciden", this.notification.notificationType.error);
      return false;
    }
    return true;
  }

}
