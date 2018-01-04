import { Component, Input } from '@angular/core';
import { ILink } from '../../interfaces/ILink';

@Component({
    selector: 'uxd-landing-page-feature',
    templateUrl: './landing-page-feature.component.html',
    styleUrls: ['./landing-page-feature.component.less'],
    host: {
        '[class.col-md-4.col-sm-4]': 'columns === 3',
        '[class.col-md-3.col-sm-6]': 'columns === 4'
    }
})
export class LandingPageFeatureComponent {
    
    @Input() header: string;
    @Input() description: string;
    @Input() image: string;
    @Input() link: ILink;
    @Input() columns: number = 4;

}