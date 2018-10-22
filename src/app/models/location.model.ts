import { Event } from "./event.model";

export class Location {

    static readonly endpoint = "locations";
    constructor(
        public address: string,
        public lat: number,
        public lng: number,
        public name?: string,
        public event?: Event,
        public id?: number,
    ) { }
}