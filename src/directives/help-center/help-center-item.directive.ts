import { Directive, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { HelpCenterItem, HelpCenterService } from './help-center.service';

@Directive({
    selector: '[uxHelpCenterItem]',
    standalone: false
})
export class HelpCenterItemDirective implements OnInit, OnDestroy {
    private readonly _helpCenterService = inject(HelpCenterService);

    @Input() uxHelpCenterItem: HelpCenterItem;

    ngOnInit(): void {

        // register the item in the service
        this._helpCenterService.registerItem(this.uxHelpCenterItem);
    }

    ngOnDestroy(): void {
        // remove this item when it is destroyed
        this._helpCenterService.unregisterItem(this.uxHelpCenterItem);
    }
}