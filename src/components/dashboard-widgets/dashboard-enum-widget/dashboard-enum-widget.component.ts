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
import { EnumConfig, EnumWidgetConfig } from '../interfaces/enum-widget.interface';

@Component({
    selector: 'ux-dashboard-enum-widget',
    templateUrl: './dashboard-enum-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardEnumWidgetComponent implements PredefinedWidgetConfig, EnumWidgetConfig {
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() heading: string = '';
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;

    @Input() enums: EnumConfig[];
    @Input() value: string;

    @ViewChildren('enumItems') enumItems: QueryList<ElementRef>;

    @Output() valueChange = new EventEmitter<string>();

    selectValue(value: string, key: number): void {
        if (key === 32 || key === 13 || key === null) {
            this.value = value;
            this.valueChange.emit(value);
        }
    }

    dropdownOpenChange(open: boolean): void {
        if (open) {
            this.enumItems.toArray()[0].nativeElement.focus();
        }
    }
}

@Pipe({name: 'getEnumByValue'})
export class GetEnumByValuePipe implements PipeTransform {
    transform(enums: ReadonlyArray<EnumConfig>, value: string) {
        return (enums?.find(item => item.value === value));
    }
}
