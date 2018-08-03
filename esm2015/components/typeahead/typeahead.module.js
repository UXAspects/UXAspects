/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from '../../directives/infinite-scroll/index';
import { ScrollModule } from '../../directives/scroll/index';
import { TypeaheadHighlightDirective } from './typeahead-highlight.directive';
import { TypeaheadKeyService } from './typeahead-key.service';
import { TypeaheadComponent } from './typeahead.component';
export class TypeaheadModule {
}
TypeaheadModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    InfiniteScrollModule,
                    ScrollModule
                ],
                exports: [TypeaheadComponent],
                declarations: [TypeaheadComponent, TypeaheadHighlightDirective],
                providers: [TypeaheadKeyService],
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3R5cGVhaGVhZC90eXBlYWhlYWQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFZM0QsTUFBTTs7O1lBVkwsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLG9CQUFvQjtvQkFDcEIsWUFBWTtpQkFDZjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDN0IsWUFBWSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsMkJBQTJCLENBQUM7Z0JBQy9ELFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2FBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbmZpbml0ZVNjcm9sbE1vZHVsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvaW5maW5pdGUtc2Nyb2xsL2luZGV4JztcbmltcG9ydCB7IFNjcm9sbE1vZHVsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvc2Nyb2xsL2luZGV4JztcbmltcG9ydCB7IFR5cGVhaGVhZEhpZ2hsaWdodERpcmVjdGl2ZSB9IGZyb20gJy4vdHlwZWFoZWFkLWhpZ2hsaWdodC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVHlwZWFoZWFkS2V5U2VydmljZSB9IGZyb20gJy4vdHlwZWFoZWFkLWtleS5zZXJ2aWNlJztcbmltcG9ydCB7IFR5cGVhaGVhZENvbXBvbmVudCB9IGZyb20gJy4vdHlwZWFoZWFkLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEluZmluaXRlU2Nyb2xsTW9kdWxlLFxuICAgICAgICBTY3JvbGxNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtUeXBlYWhlYWRDb21wb25lbnRdLFxuICAgIGRlY2xhcmF0aW9uczogW1R5cGVhaGVhZENvbXBvbmVudCwgVHlwZWFoZWFkSGlnaGxpZ2h0RGlyZWN0aXZlXSxcbiAgICBwcm92aWRlcnM6IFtUeXBlYWhlYWRLZXlTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgVHlwZWFoZWFkTW9kdWxlIHsgfVxuIl19