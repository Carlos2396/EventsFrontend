import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Sponsor } from '../../../models/sponsor.model';
import { NotificationService } from '../../../services/notification.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sponsors-create',
  templateUrl: './sponsors-create.component.html',
  styleUrls: ['./sponsors-create.component.css']
})
export class SponsorsCreateComponent implements OnInit {

  eventId: number;
  nameS: String;
  linkS: String;

  constructor(private auth: AuthService,private api:APIService, private route:ActivatedRoute, private notification:NotificationService, private router:Router) { }

  ngOnInit() {
    console.log("Create component");
    this.eventId = parseInt(this.route.snapshot.paramMap.get('eventId'));
    console.log("Create component");
  }

  createSponsor(){
    if(this.validate()){
      let headers = new HttpHeaders({
        'Content-Type':'application/json'
      })
      this.api.create(Sponsor.endpoint, {name: this.nameS, image: this.linkS, event_id: this.eventId})
        .subscribe(
          res =>{
            this.router.navigate(["events/"+this.eventId]);
          },
          err =>{
            console.log(this.nameS);
            console.log(err);
            this.notification.handleError(err);
          }
        )
    }
    else{
      this.notification.printMessage("Por favor llena todos los campos, recuerda que el link es de maximo 100 caracteres", this.notification.notificationType.error);
    }
  }

  validate(){
    if(this.nameS.length == 0){
      return false;
    }
    if(this.linkS.length == 0 || this.linkS.length > 100){
      return false;
    }

    return true;
  }
}
