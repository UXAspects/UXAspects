import { Component, Input, HostListener } from '@angular/core';

@Component({
    selector: 'uxd-showcase-card',
    templateUrl: './showcase-card.component.html',
    styleUrls: ['./showcase-card.component.less']
})
export class ShowcaseCardComponent {
    @Input() image: string;
    @Input() link: string;
}