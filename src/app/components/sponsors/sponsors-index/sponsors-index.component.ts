import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Sponsor } from '../../../models/sponsor.model';
import { Event } from '../../../models/event.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../services/notification.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-sponsors-index',
    templateUrl: './sponsors-index.component.html',
    styleUrls: ['./sponsors-index.component.css']
})
export class SponsorsIndexComponent implements OnInit {
    eventId:number;
    sponsors:Sponsor[];
    userId: number;
    adminId: number;
    constructor(private auth: AuthService,private api:APIService, private route:ActivatedRoute, private notification:NotificationService) { }

    ngOnInit() {
        this.eventId = parseInt(this.route.snapshot.paramMap.get('id'));
        if(this.auth.getUser() != null){
            this.userId = this.auth.getUser().id;
        }
        else{
            this.userId = 1;
        }
        this.api.retrieve(Event.endpoint, this.eventId)
        .subscribe(
            (res:Event) => {
                this.adminId = res.organizer.id;
                this.sponsors = res.sponsors;
            },
            (err:HttpErrorResponse) => {
                this.notification.printErrorMessage("No es posible cargar información en estos momentos. Intenta más tarde.");
            }
        )
    }

    deleteSponsor($id){
        var index;
        for(var i = 0; i < this.sponsors.length; i++){
            if(this.sponsors[i].id == $id){
                index = i;
            }
        }
        this.sponsors.splice(index, 1);
        this.api.delete(Sponsor.endpoint, $id)
        .subscribe(
            (res) => {
                
            },
            (err:HttpErrorResponse) => {
                this.notification.handleError(err);
            }
        )
    }

}
