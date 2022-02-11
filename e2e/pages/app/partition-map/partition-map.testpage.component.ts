import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PopoverDirective } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app-partition-map',
    templateUrl: './partition-map.testpage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartitionMapTestPageComponent {

    dataset: any = {
        name: 'My Workspace',
        children: [
            {
                name: 'Financial Data',
                children: [
                    { name: 'Sensitive', value: 60 },
                    { name: 'Partially Sensitive', value: 60 },
                    { name: 'To be retained', value: 120 },
                    { name: 'Redundant', value: 30 },
                    { name: 'Obsolete', value: 30 },
                ]
            },
            {
                name: 'Identification Data',
                children: [
                    { name: 'Sensitive', value: 60 },
                    { name: 'Partially Sensitive', value: 60 },
                    { name: 'To be retained', value: 60 },
                    { name: 'Redundant', value: 10 },
                    { name: 'Obsolete', value: 10 },
                ]
            }
        ]
    };

    colors: string[][] = [
        ['#7b63a3'],
        ['#635387', '#3baa43', '#025662', '#b08f5c'],
        ['#1c899a', '#18a6df', '#98c972', '#839de8', '#839b9d']
    ];

    private _pendingHide: ReadonlyArray<PopoverDirective> = [];

    show(popover: PopoverDirective): void {
        popover.show();

        // if this was pending hide then remove this from the list
        this._pendingHide = this._pendingHide.filter(_popover => _popover !== popover);
    }

    /** Debounce the hide event */
    hide(popover: PopoverDirective): void {
        // add this to the list of items to hide
        this._pendingHide = [...this._pendingHide, popover];

        // hide the popover after a small duration
        setTimeout(() => {
            // check if we still should hide the popover
            if (this._pendingHide.indexOf(popover) !== -1) {
                popover.hide();

                // if this was pending hide then remove this from the list
                this._pendingHide = this._pendingHide.filter(_popover => _popover !== popover);
            }
        }, 200);
    }

    changeDataset() {​​​​​​​​​
        this.dataset = {​​​​​​​​​
            name: 'Another Workspace',
            children: [
                {
                    name: 'Financial',
                    children: [
                        { name: 'Sensitive', value: 160 },
                        { name: 'Partially Sensitive', value: 260 },
                        { name: 'To be retained', value: 20 },
                        { name: 'Redundant', value: 50 },
                        { name: 'Obsolete', value: 70 },
                    ]
                }​​​​​​​​​​​​​​​​​​
            ]
        }​​​​​​​​​;
    }​​​​​​​​​
}