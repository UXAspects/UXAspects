import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'uxd-menu-alignment',
    templateUrl: './menu-alignment.testpage.component.html',
    styleUrls: ['./menu-alignment.testpage.component.less']
})
export class MenuAlignmentTestPageComponent { 
    alignment$: BehaviorSubject<string> = new BehaviorSubject<string>('start');

    changeAlignment(placement: string) {
        this.alignment$.next(placement);
    }
 }
