import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HoverActionService {

    events: Subject<HoverActionEvent> = new Subject<HoverActionEvent>();

    focusNext(): void {
        this.events.next(new HoverActionNextEvent());
    }
    
    focusPrevious(): void {
        this.events.next(new HoverActionPreviousEvent());
    }
}

export class HoverActionNextEvent { }
export class HoverActionPreviousEvent { }

export type HoverActionEvent = HoverActionNextEvent | HoverActionPreviousEvent;