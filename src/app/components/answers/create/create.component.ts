import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { APIService } from 'src/app/services/api.service';
import { Extra } from 'src/app/models/extra.model';
import { Event } from 'src/app/models/event.model';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  event_id: number;
  extras: Extra[];
  extra_number: number;
  questions: string[] = [];
  user_id: number;
  answers: string[] = [];

  map = {
    user_id : 0,
    extra_id: 0,
    answer: ''
  }

  constructor(private auth: AuthService, private notifications: NotificationService, private api: APIService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.event_id = parseInt(this.route.snapshot.params.id);
    this.user_id = this.auth.getUser().id;
    this.api.retrieve(this.api.models.EVENT, this.event_id)
      .subscribe(
        (res: Event) => {
          this.extras = res.extras;
          var i;
          for (i = 0; i < this.extras.length; i++) {
            this.questions[i] = this.extras[i].text;
          }
        },
        (err: HttpErrorResponse) => {
          this.notifications.handleError(err);
        }
      );
  }


  submitAnswers() {
    
    for(var i = 0; i < this.answers.length; i++){
      this.extras[i].answer = this.answers[i];
      this.extras[i].user_id = this.user_id;
      this.extras[i].event_id = this.event_id;
    }

    console.log(this.extras);

    if(this.validate()){

      let headers = new HttpHeaders({
        'Content-Type':'application/json'
      })
      this.api.create(this.api.models.ANSWER,
        {arr: this.extras}
      ).subscribe(
        res =>{
          this.createTicket();
        },
        err =>{
          console.log(err);
          this.notifications.handleError(err);
        }
      )
    }
    else{
      this.notifications.printMessage("Por favor llena todas las respuestas", this.notifications.notificationType.error);
    }
  }

  createTicket(){
    this.api.create(this.api.models.TICKET, 
      {'event_id': this.event_id, 'user_id': this.user_id}
    ).subscribe(
      res=>{
        this.router.navigate(["tickets"]);
        this.notifications.printSuccessMessage("Inscripción realizada correctamente.");
      },
      err=>{
        this.notifications.handleError(err);
        this.notifications.printInformativeMessage("Por favor, comunícate con el administrador del evento");
      }
    );
  }

  validate(){
    if(this.answers.length < this.questions.length){
      return false;
    }
    var i;
    for(i = 0; i < this.answers.length; i++){
      if(this.answers[i] == ""){
        return false;
      }
    }

    return true;
  }
}
