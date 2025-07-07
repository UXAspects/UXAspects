import { Component } from '@angular/core';

@Component({
  selector: 'uxd-licenses-page',
  templateUrl: './licenses.component.html',
  standalone: false,
})
export class LicensesPageComponent {
  year: number = new Date().getFullYear();
}
