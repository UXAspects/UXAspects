import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[uxInfiniteScrollLoading]'
})
export class InfiniteScrollLoadingDirective {
    private readonly _templateRef = inject<TemplateRef<any>>(TemplateRef);

    private readonly _viewContainer = inject(ViewContainerRef);

    @Input('uxInfiniteScrollLoading')
    get visible() {
        return this._visible;
    }
    set visible(value: boolean | string) {
        value = coerceBooleanProperty(value);

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
}
