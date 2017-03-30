import { Component, Input } from '@angular/core';

import { ILink } from '../../interfaces/ILink';

@Component({
    selector: 'uxd-landing-page-feature',
    templateUrl: './landing-page-feature.component.html',
    styleUrls: ['./landing-page-feature.component.less'],
    host: {
        '[class]': 'columns'
    }
})
export class LandingPageFeatureComponent {
    
    @Input() header: string;
    @Input() description: string;
    @Input() image: string;
    @Input() columns: string;
    @Input() link: ILink;
}