import { Event } from "./event.model";
import { Ticket } from "./ticket.model";
import { Extra } from "./extra.model";
import { Answer } from "./answer.model";

export class User {
    constructor(
        public email: string,
        public firstname: string,
        public lastname: string,
        public gender: Gender,
        public image?: string,
        public phone?: string,
        public alias?: string,
        public birthdate?: Date,
        public code?: string,
        public answer?: string,
        public organizedEvents?: Event[],
        public updatedAt?: Date,
        public createdAt?: Date,
        public extras?: Extra[],
        public events?: Event[],
        public tickets?: Ticket[],
        public answers?: Answer[],
        public id?: number,
    ) { }
}
enum Gender{
    male = "male",
    female = "female",
    other = "other"    
}