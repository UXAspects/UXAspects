import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AnchorPlacement } from '../../../../dist/library';

@Component({
    selector: 'app-navigation',
    templateUrl: './menu.testpage.component.html',
    styleUrls: ['./menu.testpage.component.css']
})
export class MenuTestPageComponent {

    closeOnBlur$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    placement$: BehaviorSubject<string> = new BehaviorSubject<AnchorPlacement>('left');
    subMenuPlacement$: BehaviorSubject<string> = new BehaviorSubject<AnchorPlacement>('right');

    changePlacement(placement: string) {
        this.placement$.next(placement);
    }

    changeSubmenuPlacement(placement: string) {
        this.subMenuPlacement$.next(placement);
    }
}
