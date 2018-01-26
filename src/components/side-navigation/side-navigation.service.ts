import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SideNavigationService {

    deselect: Subject<void> = new Subject<void>();

    constructor() { }
}