import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccessibilityModule, IconModule, TooltipModule } from '@ux-aspects/ux-aspects';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { TextPageLayoutComponent } from '../../components/text-page-layout/text-page-layout.component';

@Component({
  selector: 'uxd-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.less'],
  imports: [
    PageHeaderComponent,
    TextPageLayoutComponent,
    RouterLink,
    AccessibilityModule,
    TooltipModule,
    IconModule,
  ],
})
export class FeaturesPageComponent {}
