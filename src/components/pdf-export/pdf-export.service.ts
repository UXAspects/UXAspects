import { Injectable, Renderer2 } from '@angular/core';
import { PdfExportItemDirective } from './pdf-export-item.component';

@Injectable()
export class PdfExportService {

    private _items: PdfExportItemDirective[] = [];

    registerItem(item: PdfExportItemDirective): void {
        this._items.push(item);
    }

    unregisterItem(item: PdfExportItemDirective): void {
        let idx = this._items.indexOf(item);

        if (idx !== -1) {
            this._items.splice(idx, 1);
        }
    }

    getDocument(): HTMLHtmlElement {

        // group items by row
        let groupings: PDFExportGrouping[] = [];

        this._items.forEach(item => {

            let row = groupings.find(group => group.row === item.row);

            if (!row) {
                groupings.push({ row: item.row, items: [{ columns: item.columns, element: this.clone(item.getElement()) }] });
            } else {
                row.items.push({ columns: item.columns, element: this.clone(item.getElement()) });
            }

        });

        // map to an html structure
        let rows = groupings.map(rowData => {
            let row = document.createElement('div');
            row.classList.add('row');

            rowData.items.forEach(item => {
                let column = document.createElement('div');

                if (item.columns) {
                    column.classList.add(`col-md-${item.columns}`);
                }

                column.appendChild(item.element);
                row.appendChild(column);
            });

            return row;
        });

 
        let head = this.cloneHead();
        let body = document.createElement('body');
        let htmlElement = document.createElement('html');

        rows.forEach(row => {
            body.appendChild(row);
        });

        htmlElement.appendChild(head);
        htmlElement.appendChild(body);

        return htmlElement;
    }

    private cloneHead(): HTMLHeadElement {
        let head = document.head.cloneNode(true) as HTMLHeadElement;
        return head;
    }

    private clone(element: HTMLElement): HTMLElement {
        return element instanceof HTMLCanvasElement ? this.cloneCanvas(element) 
        : element.tagName === 'ng-template' ? this.template(element)
        : this.cloneElement(element);
    }

    private template(element: HTMLElement): HTMLElement {
        let x = element;
        return element;
    }

    private cloneCanvas(canvas: HTMLCanvasElement): HTMLImageElement {
 
         // extract canvas image
        let imageUrl = canvas.toDataURL();
        let imgElement = document.createElement('img');
        imgElement.src = imageUrl;

        this.applyStyles(canvas, imgElement);

        return imgElement;
    }

    private replaceCanvas(source: HTMLCanvasElement, target: HTMLCanvasElement): void {
        // extract canvas image
        let imageUrl = source.toDataURL();
        let imgElement = document.createElement('img');
        imgElement.src = imageUrl;

        target.parentNode.replaceChild(imgElement, target);

        this.applyStyles(target, imgElement);
    }

    private cloneElement(element: HTMLElement): HTMLElement {
    
        // create a duplicate of the element
        let clone = element.cloneNode(true) as HTMLElement;

        // get all the styles applied to the element and inline them
        this.applyStyles(element, clone);

        return clone;
    }

    private applyStyles(source: HTMLElement, target: HTMLElement): void {

        let styles = window.getComputedStyle(source);

        for (let i = 0; i < styles.length; i++) {
            let prop = styles[i];
            let value = styles[prop];
            target.style[prop] = value;
        }

        // apply styles to all children too
        for (let childIdx = 0; childIdx < target.children.length; childIdx++) {
            if (source.children.item(childIdx) instanceof HTMLCanvasElement) {
                this.replaceCanvas(<HTMLCanvasElement>(source.children.item(childIdx)), <HTMLCanvasElement>(target.children.item(childIdx)));    
            }

            this.applyStyles(source.children.item(childIdx) as HTMLElement, target.children.item(childIdx) as HTMLElement);
        }
    }

}

export interface PDFExportGrouping {
    row: number;
    items: [{
        columns: number;
        element: HTMLElement;
    }];
}