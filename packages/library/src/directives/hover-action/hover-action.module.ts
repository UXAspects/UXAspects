import { NgModule } from '@angular/core';
import { HoverActionContainerDirective } from './hover-action-container.directive';
import { HoverActionDirective } from './hover-action.directive';

const DECLARATIONS = [
    HoverActionDirective,
    HoverActionContainerDirective
];

@NgModule({
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class HoverActionModule { }
