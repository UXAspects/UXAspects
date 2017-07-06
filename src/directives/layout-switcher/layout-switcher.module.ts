import { NgModule } from '@angular/core';
import { LayoutSwitcherDirective } from './layout-switcher.directive';
import { LayoutSwitcherItemDirective } from './layout-switcher-item.directive';
import { ResizeModule } from '../resize/index';

const DECLARATIONS = [
    LayoutSwitcherDirective,
    LayoutSwitcherItemDirective
];

@NgModule({
    imports: [
        ResizeModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS,
    providers: [],
})
export class LayoutSwitcherModule { }
