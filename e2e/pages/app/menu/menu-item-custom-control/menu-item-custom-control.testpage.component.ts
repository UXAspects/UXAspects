import { Component } from '@angular/core';

@Component({
  selector: 'uxd-menu-item-custom-control',
  templateUrl: './menu-item-custom-control.testpage.component.html',
  styleUrls: ['./menu-item-custom-control.testpage.component.less'],
  standalone: false,
})
export class MenuItemCustomControlTestPageComponent {
  radioSelected: string = 'option1';
  toggleSwitchValue: boolean = false;

  radioOptions = {
    option1: 'option1',
    option2: 'option2',
    option3: 'option3',
  };

  checkOptions = {
    option1: true,
    option2: false,
    option3: false,
  };

  disabled = false;
}
