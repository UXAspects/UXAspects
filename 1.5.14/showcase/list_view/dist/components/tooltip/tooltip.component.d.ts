import { ChangeDetectorRef, TemplateRef, OnDestroy } from '@angular/core';
import { AnchorPlacement } from './tooltip.directive';
import { Subject } from 'rxjs/Subject';
export declare class TooltipComponent implements OnDestroy {
    protected _changeDetectorRef: ChangeDetectorRef;
    /** Define a unique id for each tooltip */
    id: string;
    /** Define the tooltip role */
    role: string;
    /** The content of the tooltip, either a string or a TemplateRef for further customization */
    content: string | TemplateRef<any>;
    /** Allow the user to supply a context for the tooltip TemplateRef */
    context: any;
    /** The position the tooltip should display relative to the associated element */
    placement: AnchorPlacement;
    /** Allow a custom class to be added to the tooltip to allow custom styling */
    customClass: string;
    /** Indicates whether or not the content is a string or a TemplateRef */
    isTemplateRef: boolean;
    /** Emit when the tooltip need to update it's position */
    reposition$: Subject<void>;
    constructor(_changeDetectorRef: ChangeDetectorRef);
    /** Cleanup after the component is destroyed */
    ngOnDestroy(): void;
    /** Inform the parent directive that it needs to recalulate the position */
    reposition(): void;
    /** This will update the content of the tooltip and trigger change detection */
    setContent(content: string | TemplateRef<any>): void;
    /** This will update the tooltip placement and trigger change detection */
    setPlacement(placement: AnchorPlacement): void;
    /** This will set a custom class on the tooltip and trigger change detection */
    setClass(customClass: string): void;
    /** Updates the context used by the TemplateRef */
    setContext(context: any): void;
    /** Specify the tooltip role attribute */
    setRole(role: string): void;
}
