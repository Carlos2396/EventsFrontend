import { Event } from "./event.model";

export class Sponsor {
    constructor(
        public name: string,
        public image?: string,
        public event?: Event,
        public id?: number,
    ) { }
}