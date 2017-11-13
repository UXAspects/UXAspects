import { Component, Input } from '@angular/core';

@Component({
    selector: 'uxd-api-properties',
    templateUrl: './api-properties.component.html',
    styleUrls: ['./api-properties.component.less']
})
export class ApiPropertiesComponent {
    @Input() title: string;
}
