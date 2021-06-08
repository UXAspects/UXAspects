import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-navigation',
    templateUrl: './menu.testpage.component.html',
    styleUrls: ['./menu.testpage.component.css']
})
export class MenuTestPageComponent {
    val: boolean = true;

    placement$: BehaviorSubject<string> = new BehaviorSubject<string>('left');

    changePlacement() {
        console.log(this.val);
        this.placement$.next(this.val ? 'right' : 'left');
        this.val = !this.val;
    }
}
