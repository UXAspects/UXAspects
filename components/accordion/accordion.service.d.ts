import { Subject } from 'rxjs/Subject';
export declare class AccordionService {
    collapseOthers: boolean;
    collapse: Subject<void>;
    collapseAll(): void;
}
