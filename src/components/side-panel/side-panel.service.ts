import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SidePanelService {

    /** Emit the open state when it changes */
    open$ = new Subject<boolean>();

    open(): void {
        this.open$.next(true);
    }

    close(): void {
        this.open$.next(false);
    }
}