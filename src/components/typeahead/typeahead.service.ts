import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TypeaheadService {

    open$ = new BehaviorSubject<boolean>(false);

    highlightedElement$ = new BehaviorSubject<HTMLElement>(null);
}