import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class TypeaheadService {
    open$: BehaviorSubject<boolean>;
    highlightedElement$: BehaviorSubject<HTMLElement>;
}
