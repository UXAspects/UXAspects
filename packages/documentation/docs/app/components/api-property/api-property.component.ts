import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: '[uxd-api-property]',
    templateUrl: './api-property.component.html',
    styleUrls: ['./api-property.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
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
