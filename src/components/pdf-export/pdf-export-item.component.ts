import { Component, Directive, ContentChildren, QueryList, ElementRef, OnInit, OnDestroy, Input, ViewChild, TemplateRef, ViewChildren, ViewContainerRef, Optional } from '@angular/core';
import { PdfExportService } from './pdf-export.service';

@Directive({
    selector: '[pdfExportItem]'
})
export class PdfExportItemDirective implements OnInit, OnDestroy {

    @Input() row: number;
    @Input() columns: number;
    @Input() data: any;

    constructor(private _elementRef: ElementRef, private _pdfExportService: PdfExportService,
        private _viewContainerRef: ViewContainerRef, @Optional() private _templateRef: TemplateRef<any>) {}

    ngOnInit(): void {
        this._pdfExportService.registerItem(this);
    }

    ngOnDestroy(): void {
        this._pdfExportService.unregisterItem(this);
    }

    getElement(): HTMLElement {
        if (this._templateRef) {
            let embeddedView = this._viewContainerRef.createEmbeddedView(this._templateRef, { data: this.data }, 0);
            let root: HTMLElement = embeddedView.rootNodes.find(node => node instanceof HTMLElement);
            embeddedView.detectChanges();
            embeddedView.destroy();

            return root;
        } else {
            return this._elementRef.nativeElement as HTMLElement;
        }
    }
}