import { Component, Directive, ContentChildren, QueryList, ElementRef } from '@angular/core';

@Directive({
    selector: '[pdfExportItem]'
})
export class PdfExportItemDirective {

    constructor(private _elementRef: ElementRef) { }

    getElement(): HTMLElement {
        return this._elementRef.nativeElement as HTMLElement;
    }
}

@Component({
    selector: 'ux-pdf-export-container',
    templateUrl: './pdf-export-container.component.html'
})
export class PdfExportContainerComponent { 
    
    @ContentChildren(PdfExportItemDirective) contentChildren: QueryList<PdfExportItemDirective>;

    content: string = '';
    styles: string[] = [];
    links: string[] = [];
    iframe: any;
    fullHtml: string = '';
    link = '';

    ngAfterContentInit() {
        this.createIframe(); 
    }

    getContent() {
        this.content = '';
        // get computed styles and add to content
        this.contentChildren.forEach(child => {
            let childElement = child.getElement().cloneNode(true) as HTMLElement;
            let height = childElement.style.height || '';
            let width = childElement.style.width || '';
            let style = window.getComputedStyle(child.getElement());
            childElement.setAttribute('style', style.cssText);
            childElement.style.height = width;
            childElement.style.width = height;
            let children = childElement.getElementsByTagName('*');
            let originalChildren = (<HTMLElement>child.getElement()).getElementsByTagName('*');
            for (let i = 0; i < children.length; i++) {
                if (children[i].tagName === 'CANVAS') {
                    // convert canvas to an image
                    let parentElement = children[i].parentNode;
                    let image = (<HTMLCanvasElement>originalChildren[i]).toDataURL();
                    let imageElement = document.createElement('img');
                    imageElement.src = image;
                    parentElement.replaceChild(imageElement, children[i]);
                }
                let childStyle = window.getComputedStyle(originalChildren[i]);
                let childHeight = (<HTMLElement>originalChildren[i]).style.height || '';
                let childWidth = (<HTMLElement>originalChildren[i]).style.width || '';
                children[i].setAttribute('style', childStyle.cssText);
                (<HTMLElement>children[i]).style.height = width;
                (<HTMLElement>children[i]).style.width = height;
            }
            this.content += childElement.outerHTML + '\n';
        });

        this.content += `<script type="text/javascript" src="polyfills.js"></script><script type="text/javascript" src="vendor.js"></script><script type="text/javascript" src="app.js"></script>`;
        this.link = `<link rel="shortcut icon" href="favicon.ico"><link href="styles.css" rel="stylesheet">`;      
        
        // get full HTML
        this.fullHtml = `<head>` + this.link + `</head><body>` + this.content + `</body>`;
    }

    createIframe() {
        // create iframe ( dont know if we want this all yet)
        this.link = `<link rel="shortcut icon" href="favicon.ico"><link href="styles.css" rel="stylesheet">`; 
        this.iframe = document.createElement('iframe');
        document.body.appendChild(this.iframe);
        let linkElement = document.createElement('span');
        linkElement.innerHTML = this.link;
        // need the timeout for firefox
        setTimeout(() => {
            this.iframe.contentDocument.head.appendChild(linkElement);
        });
    }

    showIframe() {
        this.getContent();
        // this.createIframe();
        let contentElement = document.createElement('span');
        contentElement.innerHTML = this.content;
        this.iframe.contentDocument.body.appendChild(contentElement);         
    }

    openWindow() {
        this.getContent();
        window.open('about:blank', '', '_blank').document.write(this.fullHtml);
    }

    
}