import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AccordionService {

    collapseOthers: boolean = false;
    collapse = new Subject<void>();

    collapseAll(): void {
        this.collapse.next();
    }
}