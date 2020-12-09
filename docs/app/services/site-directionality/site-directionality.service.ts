import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Direction} from "@angular/cdk/bidi";
import {DOCUMENT} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class SiteDirectionalityService {

    direction$ = new BehaviorSubject<Direction>('ltr');

    constructor(@Inject(DOCUMENT) private _document: Document) {
        this.setDirection('ltr');
    }

    setDirection(direction: Direction): void {
        this.direction$.next(direction || 'ltr');
        
        // the html element direction is also updated to ensure CSS styles on body and html are reflected properly.
        const html = this._document.querySelector('link') as HTMLElement;
        html.setAttribute('dir', direction);
    }
}


