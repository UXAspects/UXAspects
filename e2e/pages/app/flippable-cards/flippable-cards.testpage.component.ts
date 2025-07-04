import { Component } from '@angular/core';
import { ColorService } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'flippable-cards-app',
    templateUrl: './flippable-cards.testpage.component.html',
    styleUrls: ['./flippable-cards.testpage.component.css'],
    standalone: false
})
export class FlippableCardsTestPageComponent {
    constructor(public colorService: ColorService) {}
}
