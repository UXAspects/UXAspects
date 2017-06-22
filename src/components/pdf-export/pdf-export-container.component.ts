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
    iframe: any;

    ngAfterContentInit() {
        for (let stylesheetIdx = 0; stylesheetIdx < document.styleSheets.length; stylesheetIdx++) {
            let stylesheet = document.styleSheets.item(stylesheetIdx) as any;

            let rules = stylesheet.rules as CSSRuleList;

            for (let ruleIdx = 0; ruleIdx < rules.length; ruleIdx++) {
                this.styles.push(rules.item(ruleIdx).cssText);
            }
        }


        this.content += `<body>`;
        this.contentChildren.forEach(child => {
            this.content += child.getElement().outerHTML + '\n';
        });
        this.content += `</body>`;

        this.iframe = document.createElement('iframe');
        document.body.appendChild(this.iframe);
    }

    test() {
        
        
        let styleElement = document.createElement('style');
        styleElement.innerHTML = this.styles.join('\n');
       
        console.log(styleElement);
        
        let head = this.iframe.contentDocument.head;

        console.log(head);
        head.appendChild(styleElement);
        
        this.iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(this.content);
        
         
    }
}