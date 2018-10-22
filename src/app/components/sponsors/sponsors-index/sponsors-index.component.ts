import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Sponsor } from '../../../models/sponsor.model';
import { Event } from '../../../models/event.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../services/notification.service';

@Component({
    selector: 'app-sponsors-index',
    templateUrl: './sponsors-index.component.html',
    styleUrls: ['./sponsors-index.component.css']
})
export class SponsorsIndexComponent implements OnInit {
    eventId:number;
    sponsors:Sponsor[];

    constructor(private api:APIService, private route:ActivatedRoute, private notification:NotificationService) { }

    ngOnInit() {
        this.eventId = parseInt(this.route.snapshot.paramMap.get('id'));

        this.api.retrieve(Event.endpoint, this.eventId)
        .subscribe(
            (res:Event) => {
                this.sponsors = res.sponsors;
            },
            (err:HttpErrorResponse) => {
                this.notification.printErrorMessage("No es posible cargar información en estos momentos. Intenta más tarde.");
            }
        )
    }

}
