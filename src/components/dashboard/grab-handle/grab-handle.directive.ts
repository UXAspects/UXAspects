import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';

@Directive({
    selector: '[uxDashboardGrabHandle]',
    exportAs: 'ux-dashboard-grab-handle'
})
export class DashboardGrabHandleDirective {

    @Input() @HostBinding('tabIndex') tabIndex: number = 0;

    constructor(private _widget: DashboardWidgetComponent) {

        if (!_widget) {
            throw new Error('uxDashboardGrabHandle must be used within a dashboard widget');
        }
    }

    @HostListener('keydown.arrowup', ['$event'])
    onMoveUp(event: KeyboardEvent): void {
        this._widget.dashboardService.shiftWidgetUp(this._widget);
        event.preventDefault();
    }

    @HostListener('keydown.arrowright', ['$event'])
    onMoveRight(event: KeyboardEvent): void {
        this._widget.dashboardService.shiftWidgetRight(this._widget);
        event.preventDefault();
    }

    @HostListener('keydown.arrowdown', ['$event'])
    onMoveDown(event: KeyboardEvent): void {
        this._widget.dashboardService.shiftWidgetDown(this._widget);
        event.preventDefault();
    }

    @HostListener('keydown.arrowleft', ['$event'])
    onMoveLeft(event: KeyboardEvent): void {
        this._widget.dashboardService.shiftWidgetLeft(this._widget);
        event.preventDefault();
    }

    @HostListener('keydown.control.arrowup', ['$event'])
    onResizeUp(event: KeyboardEvent): void {
        if (this._widget.resizable) {
            this._widget.dashboardService.resizeWidgetUp(this._widget);
            event.preventDefault();
        }
    }

    @HostListener('keydown.control.arrowright', ['$event'])
    onResizeRight(event: KeyboardEvent): void {
        if (this._widget.resizable) {
            this._widget.dashboardService.resizeWidgetRight(this._widget);
            event.preventDefault();
        }
    }

    @HostListener('keydown.control.arrowdown', ['$event'])
    onResizeDown(event: KeyboardEvent): void {
        if (this._widget.resizable) {
            this._widget.dashboardService.resizeWidgetDown(this._widget);
            event.preventDefault();
        }
    }

    @HostListener('keydown.control.arrowleft', ['$event'])
    onResizeLeft(event: KeyboardEvent): void {
        if (this._widget.resizable) {
            this._widget.dashboardService.resizeWidgetLeft(this._widget);
            event.preventDefault();
        }
    }
}