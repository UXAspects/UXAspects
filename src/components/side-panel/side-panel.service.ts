import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SidePanelService {

    open$ = new BehaviorSubject<boolean>(false);

    open() {
        this.open$.next(true);
    }

    close() {
        this.open$.next(false);
    }
}