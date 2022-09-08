import { Component } from '@angular/core';
import { ColorService } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';
import { FiltersTestPageComponent } from '../filters.testpage.component';

@Component({
    selector: 'app',
    templateUrl: './filters-closeonblur.testpage.component.html',
})
export class FiltersCloseOnBlurTestPageComponent extends FiltersTestPageComponent {

    constructor(colorService: ColorService) {
        super(colorService);
    }

    closeOnBlur$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}