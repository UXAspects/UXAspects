import { BehaviorSubject } from 'rxjs';

export class TreeGridState {
    readonly loading$ = new BehaviorSubject<boolean>(false);

    constructor(
        public readonly level: number,
        public readonly setSize: number,
        public readonly positionInSet: number) {}
}
