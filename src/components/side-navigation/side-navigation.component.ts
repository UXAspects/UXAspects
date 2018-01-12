import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SideNavigationService } from './side-navigation.service';

@Component({
  selector: 'ux-side-navigation',
  template: '<ng-content></ng-content>',
  providers: [SideNavigationService],
  encapsulation: ViewEncapsulation.None
})
export class SideNavigationComponent {

}
