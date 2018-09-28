import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class TreeGridState {
    readonly level: number;
    readonly setSize: number;
    readonly positionInSet: number;
    readonly loading$: BehaviorSubject<boolean>;
    constructor(level: number, setSize: number, positionInSet: number);
}
