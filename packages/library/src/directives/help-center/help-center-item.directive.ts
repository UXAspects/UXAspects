import { Directive, Input, OnInit, OnDestroy } from '@angular/core';
import { HelpCenterService, HelpCenterItem } from './help-center.service';

@Directive({ selector: '[uxHelpCenterItem]' })
export class HelpCenterItemDirective implements OnInit, OnDestroy {

    @Input() uxHelpCenterItem: HelpCenterItem;

    constructor(private _helpCenterService: HelpCenterService) { }

    ngOnInit(): void {

        // register the item in the service
        this._helpCenterService.registerItem(this.uxHelpCenterItem);
    }

    ngOnDestroy(): void {
        // remove this item when it is destroyed
        this._helpCenterService.unregisterItem(this.uxHelpCenterItem);
    }
}