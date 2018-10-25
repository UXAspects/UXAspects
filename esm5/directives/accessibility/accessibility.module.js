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
var AccessibilityModule = /** @class */ (function () {
    function AccessibilityModule() {
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
    return AccessibilityModule;
}());
export { AccessibilityModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzaWJpbGl0eS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9hY2Nlc3NpYmlsaXR5L2FjY2Vzc2liaWxpdHkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM3RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN6RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7Ozs7Z0JBRS9FLFFBQVEsU0FBQztvQkFDTixZQUFZLEVBQUU7d0JBQ1Ysb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBQ3JCLHlCQUF5Qjt3QkFDekIsOEJBQThCO3FCQUNqQztvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsVUFBVTtxQkFDYjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBQ3JCLHlCQUF5Qjt3QkFDekIsOEJBQThCO3FCQUNqQztpQkFDSjs7OEJBdkJEOztTQXdCYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvY3VzV2l0aGluRGlyZWN0aXZlIH0gZnJvbSAnLi9mb2N1cy13aXRoaW4vZm9jdXMtd2l0aGluLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTcGxpdHRlckFjY2Vzc2liaWxpdHlEaXJlY3RpdmUgfSBmcm9tICcuL3NwbGl0dGVyL3NwbGl0dGVyLWFjY2Vzc2liaWxpdHkuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL3RhYmJhYmxlLWxpc3QvdGFiYmFibGUtbGlzdC1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUYWJiYWJsZUxpc3REaXJlY3RpdmUgfSBmcm9tICcuL3RhYmJhYmxlLWxpc3QvdGFiYmFibGUtbGlzdC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBGb2N1c1dpdGhpbkRpcmVjdGl2ZSxcbiAgICAgICAgVGFiYmFibGVMaXN0RGlyZWN0aXZlLFxuICAgICAgICBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlLFxuICAgICAgICBTcGxpdHRlckFjY2Vzc2liaWxpdHlEaXJlY3RpdmVcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQTExeU1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBGb2N1c1dpdGhpbkRpcmVjdGl2ZSxcbiAgICAgICAgVGFiYmFibGVMaXN0RGlyZWN0aXZlLFxuICAgICAgICBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlLFxuICAgICAgICBTcGxpdHRlckFjY2Vzc2liaWxpdHlEaXJlY3RpdmUsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBBY2Nlc3NpYmlsaXR5TW9kdWxlIHt9Il19