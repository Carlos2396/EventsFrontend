import { Event } from "./event.model";

export class Sponsor {

    static readonly endpoint = "sponsors";
    constructor(
        public name: string,
        public image?: string,
        public event?: Event,
        public id?: number,
    ) { }
}