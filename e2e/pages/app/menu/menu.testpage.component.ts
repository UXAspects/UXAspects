import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-navigation',
    templateUrl: './menu.testpage.component.html',
    styleUrls: ['./menu.testpage.component.css']
})
export class MenuTestPageComponent {

    closeOnBlur$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    placement$: BehaviorSubject<string> = new BehaviorSubject<string>('left');
    subMenuPlacement$: BehaviorSubject<string> = new BehaviorSubject<string>('right');

    changePlacement(placement: string) {
        this.placement$.next(placement);
    }

    changeSubmenuPlacement(placement: string) {
        this.subMenuPlacement$.next(placement);
    }
}
