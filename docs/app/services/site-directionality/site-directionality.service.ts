import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Direction} from "@angular/cdk/bidi";

@Injectable({
    providedIn: 'root'
})
export class SiteDirectionalityService {

    direction$ = new BehaviorSubject<Direction>('ltr');

    constructor() {
    }

    setDirection(direction: Direction): void {
        this.direction$.next(direction || 'ltr');
    }
}


