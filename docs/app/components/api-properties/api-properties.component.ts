import { NgIf } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'uxd-api-properties',
  templateUrl: './api-properties.component.html',
  styleUrls: ['./api-properties.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf],
})
export class ApiPropertiesComponent {
  @Input() tableTitle: string;
}
