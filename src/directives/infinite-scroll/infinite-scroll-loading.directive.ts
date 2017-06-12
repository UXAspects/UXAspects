import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[uxInfiniteScrollLoading]'
})
export class InfiniteScrollLoadingDirective {

    @Input('uxInfiniteScrollLoading')
    get visible() {
        return this._visible;
    }
    set visible(value: boolean) {
        if (value !== this._visible) {
            if (value) {
                this._viewContainer.createEmbeddedView(this._templateRef);
            } else {
                this._viewContainer.clear();
            }
        }
        
        this._visible = value;
    }

    private _visible: boolean = false;

    constructor(
        private _templateRef: TemplateRef<any>,
        private _viewContainer: ViewContainerRef) { }
}
