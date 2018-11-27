import { Component, OnInit } from '@angular/core';
import { Extra } from 'src/app/models/extra.model';
import { Event } from 'src/app/models/event.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { APIService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-show-general',
  templateUrl: './show-general.component.html',
  styleUrls: ['./show-general.component.css']
})
export class ShowGeneralComponent implements OnInit {
  event_id: number;
  extras: Extra[];
  extra_number: number;
  questions: String[] = [];
  user_id: number;
  ticket_id: number;
  answers: String[] = [];
  user_answers = [];
  length:number = 0;
  questionCounter:number = 0;
  extra_ids = [];

  //Attendee
  user: User;
  

  map = {
    user_id : 0,
    extra_id: 0,
  }

  constructor(private auth:AuthService, private notifications:NotificationService, private api:APIService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.event_id = parseInt(this.route.snapshot.params.id);
    this.user_id = this.auth.getUser().id;

    this.user = this.auth.getUser();

    this.api.retrieve(this.api.models.EVENT, this.event_id)
      .subscribe(
        (res: Event) => {
          this.extras = res.extras;
          var i;
          for (i = 0; i < this.extras.length; i++) {
            this.questions[i] = this.extras[i].text;
            this.extra_ids[i] = this.extras[i].id;
          }
          this.api.allAnswers(this.event_id)
            .subscribe(
              (res: any) => {
                console.log(res);
                this.answers = res;
              },
              (err: HttpErrorResponse) => {
                console.log(err);
                this.notifications.handleError(err);
              }
            );
        },
        (err: HttpErrorResponse) => {
          this.notifications.handleError(err);
        }
      );
    
  }

  getAnswers(indexLarge:number, indexSmall: number){
    return this.answers[indexLarge][indexSmall];
  }


}
