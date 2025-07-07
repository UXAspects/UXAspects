import { Component } from '@angular/core';
import { AccessibilityModule } from '@ux-aspects/ux-aspects';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { TextPageLayoutComponent } from '../../components/text-page-layout/text-page-layout.component';

@Component({
  selector: 'uxd-licenses-page',
  templateUrl: './licenses.component.html',
  imports: [PageHeaderComponent, TextPageLayoutComponent, AccessibilityModule],
})
export class LicensesPageComponent {
  year: number = new Date().getFullYear();
}
