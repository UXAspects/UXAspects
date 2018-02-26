import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FloatingActionButtonsService {

    open$ = new BehaviorSubject<boolean>(false);

    open(): void {
        this.open$.next(true);
    }

    close(): void {
        this.open$.next(false);
    }
}