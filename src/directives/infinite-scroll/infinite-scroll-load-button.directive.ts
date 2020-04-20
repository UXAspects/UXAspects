import { Directive, Input, Output, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Directive({
    selector: '[uxInfiniteScrollLoadButton]'
})
export class InfiniteScrollLoadButtonDirective {

    @Input('uxInfiniteScrollLoadButton')
    get visible() {
        return this._visible;
    }
    set visible(value: boolean) {
        if (value !== this._visible) {
            if (value) {
                const viewRef = this._viewContainer.createEmbeddedView(this._template);
                this._renderer.listen(viewRef.rootNodes[0], 'click', this.onClick.bind(this));
            } else {
                this._viewContainer.clear();
            }
        }

        this._visible = value;
    }

    @Output() loading: Observable<Event>;

    private _visible: boolean = false;
    private _load = new Subject();

    constructor(
        private _template: TemplateRef<any>,
        private _viewContainer: ViewContainerRef,
        private _renderer: Renderer2
    ) {
        this.loading = this._load.asObservable() as Observable<Event>;
    }

    private onClick(event: MouseEvent) {
        this._load.next(event);
    }
}
