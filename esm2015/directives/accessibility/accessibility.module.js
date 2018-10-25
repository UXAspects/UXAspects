/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { FocusWithinDirective } from './focus-within/focus-within.directive';
import { SplitterAccessibilityDirective } from './splitter/splitter-accessibility.directive';
import { TabbableListItemDirective } from './tabbable-list/tabbable-list-item.directive';
import { TabbableListDirective } from './tabbable-list/tabbable-list.directive';
export class AccessibilityModule {
}
AccessibilityModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FocusWithinDirective,
                    TabbableListDirective,
                    TabbableListItemDirective,
                    SplitterAccessibilityDirective
                ],
                imports: [
                    A11yModule
                ],
                exports: [
                    FocusWithinDirective,
                    TabbableListDirective,
                    TabbableListItemDirective,
                    SplitterAccessibilityDirective,
                ]
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzaWJpbGl0eS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9hY2Nlc3NpYmlsaXR5L2FjY2Vzc2liaWxpdHkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM3RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN6RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQW1CaEYsTUFBTTs7O1lBakJMLFFBQVEsU0FBQztnQkFDTixZQUFZLEVBQUU7b0JBQ1Ysb0JBQW9CO29CQUNwQixxQkFBcUI7b0JBQ3JCLHlCQUF5QjtvQkFDekIsOEJBQThCO2lCQUNqQztnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsVUFBVTtpQkFDYjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsb0JBQW9CO29CQUNwQixxQkFBcUI7b0JBQ3JCLHlCQUF5QjtvQkFDekIsOEJBQThCO2lCQUNqQzthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb2N1c1dpdGhpbkRpcmVjdGl2ZSB9IGZyb20gJy4vZm9jdXMtd2l0aGluL2ZvY3VzLXdpdGhpbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU3BsaXR0ZXJBY2Nlc3NpYmlsaXR5RGlyZWN0aXZlIH0gZnJvbSAnLi9zcGxpdHRlci9zcGxpdHRlci1hY2Nlc3NpYmlsaXR5LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi90YWJiYWJsZS1saXN0L3RhYmJhYmxlLWxpc3QtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGFiYmFibGVMaXN0RGlyZWN0aXZlIH0gZnJvbSAnLi90YWJiYWJsZS1saXN0L3RhYmJhYmxlLWxpc3QuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgRm9jdXNXaXRoaW5EaXJlY3RpdmUsXG4gICAgICAgIFRhYmJhYmxlTGlzdERpcmVjdGl2ZSxcbiAgICAgICAgVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSxcbiAgICAgICAgU3BsaXR0ZXJBY2Nlc3NpYmlsaXR5RGlyZWN0aXZlXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEExMXlNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgRm9jdXNXaXRoaW5EaXJlY3RpdmUsXG4gICAgICAgIFRhYmJhYmxlTGlzdERpcmVjdGl2ZSxcbiAgICAgICAgVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSxcbiAgICAgICAgU3BsaXR0ZXJBY2Nlc3NpYmlsaXR5RGlyZWN0aXZlLFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQWNjZXNzaWJpbGl0eU1vZHVsZSB7fSJdfQ==