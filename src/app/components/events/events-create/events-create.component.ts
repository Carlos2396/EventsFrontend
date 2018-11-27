import { Component, OnInit } from '@angular/core';
import { Event } from "../../../models/event.model";
import { NotificationService } from 'src/app/services/notification.service';
import { APIService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-events-create',
  templateUrl: './events-create.component.html',
  styleUrls: ['./events-create.component.css']
})
export class EventsCreateComponent implements OnInit {
  
    submitted:boolean = false;
    errors = {};
    eventForm: FormGroup;
    organizer_id: number;
  
  constructor(private formBuilder:FormBuilder, private auth: AuthService,private notifications: NotificationService, private api:APIService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.auth.getUser()!=null){
      this.organizer_id = this.auth.getUser().id;
    }
    else{
      this.organizer_id = 1;
    }
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      starts: ['', Validators.required],
      end: ['', Validators.required],
      registration_start: ['', Validators.required],
      registration_end: ['', Validators.required],
      image: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.required],
      guest_capacity: ['', [Validators.required, Validators.min(10)]],
      organizer_id: this.organizer_id,
      event_type: "type1"
    })
  }

  get f() {
    return this.eventForm.controls;
  }

  createEvent(){
    this.submitted = true;

    if(this.eventForm.invalid){
      console.log("0");
      return;
    }
    console.log("1");
    this.api.create(Event.endpoint, this.eventForm.value)
    .subscribe(
      (res:Event) => {
        console.log("2");
        this.notifications.printSuccessMessage("Se ha creado tu evento");
        this.router.navigate(['events/' + res.id]);
      },
      (err: HttpErrorResponse) => {
        console.log("3");
        this.errors = {};
        if(err.status == 400){
          console.log("4");
          this.errors = err.error.errors;
          console.log(this.errors);
        }
        else{
          if(err.status > 400 && err.status < 500){
            this.notifications.printErrorMessage(err.error.errors);
          }
          else{
            this.notifications.printNoticeMessage("Intenta de nuevo más tarde")
          }
        }
      }
    )
  }
  
}
