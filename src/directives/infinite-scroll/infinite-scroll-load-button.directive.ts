import { Directive, ElementRef, Input, Output, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
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
                this._viewContainer.createEmbeddedView(this._template);

                // Template content follows the elementRef, which is a comment.
                const clickTarget = this.getNextElementSibling(this._template.elementRef.nativeElement);
                this._renderer.listen(clickTarget, 'click', this.onClick.bind(this));
            } else {
                this._viewContainer.clear();
            }
        }

        this._visible = value;
    }

    @Output() load: Observable<Event>;

    private _visible: boolean = false;
    private _load = new Subject();

    constructor(
        private _element: ElementRef,
        private _template: TemplateRef<any>,
        private _viewContainer: ViewContainerRef,
        private _renderer: Renderer2) {

        this.load = this._load.asObservable() as Observable<Event>;
    }

    private onClick(event: MouseEvent) {
        this._load.next(event);
    }

    private getNextElementSibling(element: any): Element {
        var next = element;
        while (next = next.nextSibling) {
            if (next.nodeType === 1) {
                return next;
            }
        }
        return null;
    }
}
