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
  selector: 'app-show-individual',
  templateUrl: './show-individual.component.html',
  styleUrls: ['./show-individual.component.css']
})
export class ShowIndividualComponent implements OnInit {
  event_id: number;
  extras: Extra[];
  extra_number: number;
  questions: String[] = [];
  user_id: number;
  ticket_id: number;
  answers = [];
  user_answers = [];
  length:number = 0;
  questionCounter:number = 0;
  extra_ids = [];
  attendees: User[];

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
    this.ticket_id = parseInt(this.route.snapshot.params.userId);


    this.api.retrieve(this.api.models.EVENT, this.event_id)
      .subscribe(
        (res: Event) => {
          this.attendees = res.attendees;
          this.findAttendee();
          this.extras = res.extras;
          var i;
          for (i = 0; i < this.extras.length; i++) {
            this.questions[i] = this.extras[i].text;
            this.extra_ids[i] = this.extras[i].id;
          }
          this.api.filterAnswers(this.event_id, this.ticket_id)
            .subscribe(
              (res: any) => {
                console.log(res);
                this.user_answers = res;

                for(var j = 0; j < this.user_answers.length; j++){
                  this.answers[j] = this.user_answers[j].pivot.answer;
                }
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

  getAnswer(index:number){
    console.log(this.answers[index]);
    return this.answers[index];
  }

  findAttendee(){
    for(var i = 0; i < this.attendees.length; i++){
      if(this.attendees[i].id == this.ticket_id){
        this.user = this.attendees[i];
        return;
      }
    }
  }


}
