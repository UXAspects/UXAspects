import { Component, Input } from '@angular/core';
import { ILink } from '../../interfaces/ILink';

@Component({
    selector: 'uxd-landing-page-header',
    templateUrl: './landing-page-header.component.html',
    styleUrls: ['./landing-page-header.component.less']
})
export class LandingPageHeaderComponent {

    @Input() brand: string;
    @Input() slogan: string;
    @Input() action: ILink;
    @Input() version: string;
    @Input() changelog: ILink;

}