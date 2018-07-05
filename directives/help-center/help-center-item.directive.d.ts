import { OnInit, OnDestroy } from '@angular/core';
import { HelpCenterService, HelpCenterItem } from './help-center.service';
export declare class HelpCenterItemDirective implements OnInit, OnDestroy {
    private _helpCenterService;
    uxHelpCenterItem: HelpCenterItem;
    constructor(_helpCenterService: HelpCenterService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
