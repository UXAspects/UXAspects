import { Directive, Input, TemplateRef, SimpleChanges, ViewContainerRef, EmbeddedViewRef } from '@angular/core';

@Directive({
    selector: '[uxLayoutSwitcherItem]'
})
export class LayoutSwitcherItemDirective {

    @Input('uxLayoutSwitcherItem') private _config: LayoutSwitcherItem;

    private _embeddedView: EmbeddedViewRef<any>;

    constructor(private _templateRef: TemplateRef<any>, private _viewContainerRef: ViewContainerRef) { }

    getLayout(): TemplateRef<any> {
        return this._templateRef;
    }

    getConfig(): LayoutSwitcherItem {
        return this._config;
    }

    activate(): void {
        this._embeddedView = this._viewContainerRef.createEmbeddedView(this._templateRef);
    }

    deactivate(): void {
        let index = this._viewContainerRef.indexOf(this._embeddedView);
        this._viewContainerRef.remove(index);
        this._embeddedView = null;
    }

}

export interface LayoutSwitcherItem {
    group?: string;
    minWidth?: number;
    maxWidth?: number;
}