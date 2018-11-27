import { Component, OnInit } from '@angular/core';
import { Event } from "../../../models/event.model";
import { NotificationService } from 'src/app/services/notification.service';
import { APIService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-events-edit',
  templateUrl: './events-edit.component.html',
  styleUrls: ['./events-edit.component.css']
})
export class EventsEditComponent implements OnInit {

  event: Event;
  eventId: Number = 1;
  userId: Number;
  submitted:boolean = false;
  errors = {};
  eventForm: FormGroup;
  organizer_id: number;

  constructor(private formBuilder:FormBuilder, private auth: AuthService,private notifications: NotificationService, private api:APIService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.event = new Event("",new Date(),new Date(),new Date(),new Date());

    this.eventId = parseInt(this.route.snapshot.paramMap.get('eventId'));

    if(this.auth.getUser()!=null){
      this.organizer_id = this.auth.getUser().id;
    }
    else{
      this.organizer_id = 1;
    }
    this.eventForm = this.formBuilder.group({
      nameE: ['', Validators.required],
      image: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.required],
      guest_capacity: ['', [Validators.required, Validators.min(10)]]
    })
    

    this.api.retrieve(Event.endpoint, this.eventId)
    .subscribe(
      (res:Event) => {
        console.log(res);
        this.event = res;
        this.eventForm = this.formBuilder.group({
          nameE: [this.event.name, Validators.required],
          image: [this.event.image, [Validators.required, Validators.maxLength(100)]],
          description: [this.event.description, Validators.required],
          guest_capacity: [this.event.guest_capacity, [Validators.required, Validators.min(10)]]
        })
      },
      (err: HttpErrorResponse) =>{
        this.notifications.handleError(err);
      }
    );

    
  }

  get f() {
    return this.eventForm.controls;
  }

  editEvent(){

    this.submitted = true;

    if(this.eventForm.invalid){
      console.log("0");
      return;
    }
    console.log("1");
    console.log(this.eventForm.value);
    let x = {
      name: this.eventForm.value.nameE,
      starts: this.event.starts,
      end: this.event.end,
      registration_start: this.event.registration_start,
      registration_end: this.event.registration_end,
      image: this.eventForm.value.image,
      description: this.eventForm.value.description,
      guest_capacity: this.eventForm.value.guest_capacity,
      event_type: "type1",
      organizer_id: this.event.organizer.id,
    }

    console.log(x);
    this.api.update(Event.endpoint, this.eventId, x)
    .subscribe(
      (res:Event) => {
        console.log("2");
        this.notifications.printSuccessMessage("Se ha editado tu evento");
        this.router.navigate(['events/' + res.id]);
      },
      (err: HttpErrorResponse) => {
        console.log("3");
        this.errors = {};
        if(err.status == 400){
          console.log("4");
          this.errors = err.error.errors;
          this.notifications.printErrorMessage(err.error.errors);
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
