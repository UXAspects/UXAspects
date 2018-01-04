import { Component, Input } from '@angular/core';

@Component({
    selector: '[uxd-api-property]',
    templateUrl: './api-property.component.html',
    styleUrls: ['./api-property.component.less']
})
export class ApiPropertyComponent {
    @Input() name: string;
    @Input() required: boolean;
    @Input() type: string;
    @Input() defaultValue: string;
    @Input() args: string;
    @Input() returns: string;
    @Input() binding: string;
}
