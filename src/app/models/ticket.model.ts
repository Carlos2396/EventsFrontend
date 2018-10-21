import { Event} from "./event.model";
import { User } from "./user.model";

export class Ticket {
    constructor(
        public code: string,
        public user?: User,
        public event?: Event,
        public id?: number,
    ) { }
}