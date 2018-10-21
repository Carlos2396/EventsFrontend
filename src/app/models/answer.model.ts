import { Extra } from "./extra.model";
import { User } from "./user.model";

export class Answer {
    constructor(
        public answer: string,
        public user?: User,
        public extra?: Extra,
        public updatedAt?: Date,
        public createdAt?: Date,
        public id?: number,
    ) { }
}