import { Component } from '@angular/core';
import { Filter } from '@ux-aspects/ux-aspects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  statusFilters: Filter[] = [
    {
      group: 'Custom',
      title: 'Status',
      name: 'Status (All)',
      initial: true,
    },
    {
      group: 'Custom',
      title: 'Active',
      name: 'Active',
    },
    {
      group: 'Custom',
      title: 'Inactive',
      name: 'Inactive',
    },
  ];
}
