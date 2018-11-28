import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { APIService } from 'src/app/services/api.service';
import { Extra } from 'src/app/models/extra.model';
import { Event } from 'src/app/models/event.model';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-extras',
  templateUrl: './create-extras.component.html',
  styleUrls: ['./create-extras.component.css']
})
export class CreateExtrasComponent implements OnInit {
  questions:string[] = [];
  extras:Extra[] = [];
  quantity:number = 1;
  event_id:number;

  constructor(private auth: AuthService, private notifications: NotificationService, private api: APIService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.event_id = parseInt(this.route.snapshot.params.id);
    this.questions.push("");
  }

  addQuestion(){
    this.questions.push("");
    this.quantity++;
  }

  removeQuestion(){
    if(this.quantity > 0){
      this.questions.pop();
      this.quantity--;
    }
    
  }

  getIndex(){
    return this.quantity;
  }

  submitExtras(){
    if(!this.validate()){
      this.notifications.printErrorMessage("Debes llenar todos los campos.");
      this.notifications.printInformativeMessage("Si no quieres tantas preguntas, presiona el botón de \"-\"");
      return;
    }

    for(var i = 0; i < this.questions.length; i++){
      this.extras[i].text = this.questions[i];
      this.extras[i].event_id = this.event_id;
    }

    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    })
    this.api.create(this.api.models.EXTRA,
      {arr: this.extras}
    ).subscribe(
      res =>{
        this.successRedirect();
      },
      err =>{
        console.log(err);
        this.notifications.handleError(err);
      }
    )
  }

  validate(){
    var i;
    for(i = 0; i < this.quantity; i++){
      if(this.questions[i] == ""){
        return false;
      }
    }
    return true;
  }

  successRedirect(){
    this.router.navigate(["events/", this.event_id]);
    this.notifications.printSuccessMessage("Evento creado correctamente.");
  }

}
