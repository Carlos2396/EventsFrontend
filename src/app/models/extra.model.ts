import { Event } from "./event.model";
import { User } from "./user.model";
import { Answer } from "./answer.model";

export class Extra {
    constructor(
        public text: string,
        public updatedAt?: Date,
        public createdAt?: Date,
        public users?: User[],
        public event?: Event[],
        public answers?: Answer[],
        public id?: number,
    ) { }
}