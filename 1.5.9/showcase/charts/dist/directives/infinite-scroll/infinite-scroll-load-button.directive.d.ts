import { ElementRef, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
export declare class InfiniteScrollLoadButtonDirective {
    private _element;
    private _template;
    private _viewContainer;
    private _renderer;
    visible: boolean;
    load: Observable<Event>;
    private _visible;
    private _load;
    constructor(_element: ElementRef, _template: TemplateRef<any>, _viewContainer: ViewContainerRef, _renderer: Renderer2);
    private onClick(event);
    private getNextElementSibling(element);
}
