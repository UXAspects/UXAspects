import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class VirtualForService<T> {

    /** Store the size of each item */
    itemSize: number = 0;

    /** Emit the current dataset */
    dataset = new ReplaySubject<T[]>(1);

    /** Emit the visible range */
    range = new ReplaySubject<VirtualForRange>(1);
}

export interface VirtualForRange {
    start: number;
    end: number;
}
