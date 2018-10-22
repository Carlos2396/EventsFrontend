import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { APIService } from 'src/app/services/api.service';
import { Answer } from 'src/app/models/answer.model';
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
  questions: String[] = [];
  user_id: number;
  answers: String[] = [];

  map = {
    user_id : 0,
    extra_id: 0,
    answer: ''
  }

  constructor(private auth: AuthService, private notifications: NotificationService, private api: APIService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.event_id = parseInt(this.route.snapshot.params.id);
    this.user_id = this.auth.getUser().id;
    console.log(this.user_id);
    this.api.retrieve(this.api.models.EVENT, this.event_id)
      .subscribe(
        (res: Event) => {
          console.log(res.extras);
          this.extras = res.extras;
          var i;
          for (i = 0; i < this.extras.length; i++) {
            this.questions[i] = this.extras[i].text;
            console.log(this.questions[i]);
          }
        },
        (err: HttpErrorResponse) => {
          this.notifications.handleError(err);
        }
      );
  }


  submitAnswers() {
    if(this.validate()){
      var i;

      let headers = new HttpHeaders({
        'Content-Type':'application/json'
      })

      for(i = 0; i < this.answers.length; i++){
        this.api.create(this.api.models.ANSWER,
          {user_id: this.user_id, extra_id: this.extras[i].id, answer: this.answers[i]}
        ).subscribe(
          res =>{
            this.notifications.printMessage(res, this.notifications.notificationType.informative);
          },
          err =>{
            console.log(err);
            this.notifications.handleError(err);
          }
        )
      }
    }
    else{
      this.notifications.printMessage("Por favor llena todas las respuestas", this.notifications.notificationType.error);
    }
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
