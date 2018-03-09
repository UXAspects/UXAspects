import { Component } from '@angular/core';
import { ColorService } from '../../../../dist';

@Component({
    selector: 'flippable-cards-app',
    templateUrl: './flippable-cards.testpage.component.html',
    styleUrls: ['./flippable-cards.testpage.component.css']
})
export class FlippableCardsTestPageComponent {

    constructor(public colorService: ColorService) { }

}
