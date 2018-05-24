import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class SidePanelService {
    open$: BehaviorSubject<boolean>;
    open(): void;
    close(): void;
}
