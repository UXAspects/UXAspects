import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input, Output,
    Pipe, PipeTransform, QueryList,
    ViewChildren
} from '@angular/core';
import { PredefinedWidgetConfig } from '../interfaces/predefined-widget.interface';
import { SelectConfig, SelectWidgetConfig } from '../interfaces/select-widget.interface';
import {coerceBooleanProperty, coerceNumberProperty} from '@angular/cdk/coercion';

@Component({
    selector: 'ux-dashboard-select-widget',
    templateUrl: './dashboard-select-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSelectWidgetComponent implements PredefinedWidgetConfig, SelectWidgetConfig {
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

    @Input() options: SelectConfig[];
    @Input() value: string;

    @ViewChildren('selectItems') selectItems: QueryList<ElementRef>;

    @Output() valueChange = new EventEmitter<string>();

    selectValue(value: string, key: number): void {
        if (key === 32 || key === 13 || key === null) {
            this.value = value;
            this.valueChange.emit(value);
        }
    }

    dropdownOpenChange(open: boolean): void {
        if (open) {
            this.selectItems.toArray()?.[0]?.nativeElement?.focus();
        }
    }
}

@Pipe({name: 'getOptionByValue'})
export class GetOptionByValuePipe implements PipeTransform {
    transform(options: ReadonlyArray<SelectConfig>, value: string) {
        const option = options?.find(item => item.value === value);
        return option ? option : null;
    }
}
