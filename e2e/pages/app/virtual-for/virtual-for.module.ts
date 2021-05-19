import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    AccessibilityModule,
    FixedHeaderTableModule,
    RadioButtonModule,
    SelectionModule,
    VirtualScrollModule,
} from '@ux-aspects/ux-aspects';
import {
    FormatTestItemPipe,
    VirtualForSelectionTestPageComponent,
} from './selection/virtual-for-selection.testpage.component';
import { VirtualForTestPageComponent } from './virtual-for.testpage.component';

const ROUTES = [
    {
        path: '',
        component: VirtualForTestPageComponent,
    },
    {
        path: 'selection',
        component: VirtualForSelectionTestPageComponent,
    },
];

@NgModule({
    imports: [
        AccessibilityModule,
        FixedHeaderTableModule,
        RadioButtonModule,
        RouterModule.forChild(ROUTES),
        SelectionModule,
        VirtualScrollModule,
    ],
    declarations: [FormatTestItemPipe, VirtualForTestPageComponent, VirtualForSelectionTestPageComponent],
})
export class VirtualForTestPageModule {}
