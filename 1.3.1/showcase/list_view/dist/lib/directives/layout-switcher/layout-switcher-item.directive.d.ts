import { TemplateRef, ViewContainerRef } from '@angular/core';
export declare class LayoutSwitcherItemDirective {
    private _templateRef;
    private _viewContainerRef;
    private _config;
    private _embeddedView;
    constructor(_templateRef: TemplateRef<any>, _viewContainerRef: ViewContainerRef);
    getLayout(): TemplateRef<any>;
    getConfig(): LayoutSwitcherItem;
    activate(): void;
    deactivate(): void;
}
export interface LayoutSwitcherItem {
    group?: string;
    minWidth?: number;
    maxWidth?: number;
}
