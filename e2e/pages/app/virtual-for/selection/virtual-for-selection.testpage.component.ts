import { ChangeDetectionStrategy, Component, Pipe, PipeTransform } from '@angular/core';
import { SelectionMode } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app-virtual-for-selection',
    templateUrl: 'virtual-for-selection.testpage.component.html',
    styleUrls: ['virtual-for-selection.testpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualForSelectionTestPageComponent {
    items: TestItem[] = [];
    selection: TestItem[] = [];
    selectionMode: SelectionMode = 'simple';

    constructor() {
        for (let i = 0; i < 1000; i += 1) {
            this.items.push({ id: i, name: `Item ${i}` });
        }
    }
}

@Pipe({
    name: 'formatTestItem',
})
export class FormatTestItemPipe implements PipeTransform {
    transform(value: TestItem[]): string {
        return value.map((v) => v.id).join(', ');
    }
}

interface TestItem {
    id: number;
    name: string;
}
