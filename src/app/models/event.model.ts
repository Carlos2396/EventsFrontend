import { User } from "./user.model";
import { Ticket } from "./ticket.model";
import { Location } from "./location.model";
import { Sponsor } from "./sponsor.model";
import { Extra } from "./extra.model";
import { Answer } from "./answer.model";

export class Event {
    static readonly endpoint = "events";
    constructor(
        public name: string,
        public starts: Date,
        public end: Date,
        public registration_start: Date,
        public registration_end: Date,
        public code?: string,
        public image?: string,
        public description?: string,
        public organizer?: User,
        public attendees?: User[],
        public updatedAt?: Date,
        public createdAt?: Date,
        public tickets?: Ticket[],
        public locations?: Location[],
        public extras?: Extra[],
        public answers?: Answer[],
        public sponsors?: Sponsor[],
        public guest_capacity?: number,
        public id?: number,
        public pivot?
    ) { }
}