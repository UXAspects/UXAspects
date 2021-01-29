import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {coerceBooleanProperty, coerceNumberProperty} from '@angular/cdk/coercion';
import { PredefinedWidgetConfig } from '../interfaces/predefined-widget.interface';
import { ActionConfig, ActionStatus, ActionsWidgetConfig } from '../interfaces/actions-widget.interface';

@Component({
    selector: 'ux-dashboard-actions-widget',
    templateUrl: './dashboard-actions-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardActionsWidgetComponent implements PredefinedWidgetConfig, ActionsWidgetConfig {
    static ngAcceptInputType_fixedMode: boolean | string;
    static ngAcceptInputType_colSpan: number | string;
    static ngAcceptInputType_rowSpan: number | string;

    private _fixedMode: boolean = false;
    private _colSpan: number = 1;
    private _rowSpan: number = 1;

    @Input() get fixedMode(): boolean {
        return this._fixedMode;
    }
    set fixedMode(fixedMode: boolean) {
        this._fixedMode = coerceBooleanProperty(fixedMode);
    }

    @Input() get colSpan(): number {
        return this._colSpan;
    }
    set colSpan(colSpan: number) {
        this._colSpan = coerceNumberProperty(colSpan);
    }

    @Input() get rowSpan(): number {
        return this._rowSpan;
    }
    set rowSpan(rowSpan: number) {
        this._rowSpan = coerceNumberProperty(rowSpan);
    }

    @Input() id: string = '';
    @Input() name: string = '';
    @Input() heading: string = '';

    @Input() status: ActionStatus = { label: '-', icon: 'radial' };
    @Input() actions: ReadonlyArray<ActionConfig>;

    @Output() actionSelected = new EventEmitter<string>();
}
