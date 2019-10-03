import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SidePanelService {

    /** Emit the open state when it changes */
    open$ = new BehaviorSubject<boolean>(false);

    open(): void {
        this.open$.next(true);
    }

    close(): void {
        this.open$.next(false);
    }
}