import { Component, Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'highlightSearch'
})
export class HighlightSearch implements PipeTransform {
    transform(text: string, filter: string): string {
        const highlightIndex = text.toLowerCase().indexOf(filter.toLowerCase());
        return (highlightIndex < 0) ?
               text :
               text.substr(0, highlightIndex) +
                 '<b>' + text.substr(highlightIndex, filter.length) + '</b>' +
                 text.substr(highlightIndex + filter.length);
    }
}


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    selected: RadioOption;
    optionList: ReadonlyArray<RadioOption> = [
        { name: 'One' }, { name: 'Two' }, { name: 'Three' }, { name: 'Four' }
    ];
    filter: string = '';
    showBusyIndicator: boolean = false;
    allowNull: boolean = false;
    componentWidth: number = 400;
    componentMaxHeight: number = 400;
    placeholder: string = 'Type to search...';
    focusIndex: number = 0;

    private index(text: string): number {
        return text.toLowerCase().indexOf(this.filter.toLowerCase());
    }

    isHidden(name: string): boolean {
        return this.filter && (this.filter.length > 0) && (this.index(name) === -1);
    }

    navigateUp(event: KeyboardEvent): void {
        if (this.focusIndex > 0) {
            this.focusIndex--;
            event.preventDefault();
        }
    }

    navigateDown(event: KeyboardEvent): void {
        if (this.focusIndex < this.optionList.length - 1) {
            this.focusIndex++;
            event.preventDefault();
        }
    }

    selectButton(event: KeyboardEvent): void {
        this.selected = this.optionList[this.focusIndex];
        event.preventDefault();
    }
}

export interface RadioOption {
    name: string;
}