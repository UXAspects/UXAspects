import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class TreeGridState {
    readonly loading$ = new BehaviorSubject<boolean>(false);

    constructor(public readonly level: number) {}
}
