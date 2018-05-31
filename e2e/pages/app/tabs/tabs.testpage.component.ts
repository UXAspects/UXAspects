import { Component } from '@angular/core';

@Component({
    selector: 'uxd-components-tabs',
    templateUrl: './tabs.testpage.component.html',
})
export class TabsTestPageComponent {

    minimal: boolean = true;
    tabs: string[] = ['Schedule', 'Protection', 'Solution', 'Analytics'];
    selected: string;

    set stacked(stacked: TabStackType) {
        this._stacked = stacked;

        // if the option is left or right we can not have minimal option disabled
        if (stacked === 'left' || stacked === 'right') {
            this.minimal = true;
        }
    }

    get stacked(): TabStackType {
        return this._stacked;
    }

    private _stacked: TabStackType = 'none';

}

export type TabStackType = 'left' | 'right' | 'none';