import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { Location } from '../../../models/location.model';
import { Event } from '../../../models/event.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-location-index',
    templateUrl: './location-index.component.html',
    styleUrls: ['./location-index.component.css']
})
export class LocationIndexComponent implements OnInit {
    eventId:number;

    zoom:number;
    locations:Location[];

    constructor(private api:APIService, private route:ActivatedRoute, private notification:NotificationService) { }

    ngOnInit() {
        this.zoom = 15;
        this.eventId = parseInt(this.route.snapshot.paramMap.get('id'));

        this.api.retrieve(Event.endpoint, this.eventId)
        .subscribe(
            (res:Event) => {
                this.locations = res.locations;
            },
            (err:HttpErrorResponse) => {
                this.locations = [];
                this.notification.printErrorMessage("No es posible cargar información en estos momentos. Intenta más tarde.");
            }
        )
    }
}
