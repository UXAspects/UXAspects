import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class FloatingActionButtonsService {
    open$: BehaviorSubject<boolean>;
    open(): void;
    toggle(): void;
    close(): void;
}
