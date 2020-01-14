import { Component } from '@angular/core';
import { PartitionMapSegment, PopoverDirective } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'uxd-partition-map',
    templateUrl: './partition-map.component.html',
    styleUrls: ['./partition-map.component.less']
})
export class PartitionMapShowcaseComponent {

    dataset: Readonly<PartitionMapSegment> = {
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
            },
            {
                name: 'Contact Data',
                children: [
                    { name: 'Sensitive', value: 30 },
                    { name: 'Partially Sensitive', value: 30 },
                    { name: 'To be retained', value: 30 },
                    { name: 'Redundant', value: 5 },
                    { name: 'Obsolete', value: 5 },
                ]
            },
            {
                name: 'Account Data',
                children: [
                    { name: 'Sensitive', value: 15 },
                    { name: 'Partially Sensitive', value: 15 },
                    { name: 'To be retained', value: 15 },
                    { name: 'Redundant', value: 2 },
                    { name: 'Obsolete', value: 0 },
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
}