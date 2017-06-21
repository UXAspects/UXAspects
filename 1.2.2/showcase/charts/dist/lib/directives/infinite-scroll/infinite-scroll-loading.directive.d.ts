import { TemplateRef, ViewContainerRef } from '@angular/core';
export declare class InfiniteScrollLoadingDirective {
    private _templateRef;
    private _viewContainer;
    visible: boolean;
    private _visible;
    constructor(_templateRef: TemplateRef<any>, _viewContainer: ViewContainerRef);
}
