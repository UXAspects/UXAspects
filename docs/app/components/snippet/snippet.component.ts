import { Component, Input, ViewChild, ViewContainerRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'uxd-snippet',
    templateUrl: './snippet.component.html'
})
export class SnippetComponent implements AfterViewInit {

    @Input() language: string = 'html';
    @Input() code: string;

    @ViewChild('code', { read: ViewContainerRef }) codeContainer: ViewContainerRef;

    constructor() { }

    ngAfterViewInit() {

        if (!this.code) {
            return;
        }

        // create a blob containing prismjs
        let blob = new Blob([require('raw-loader!prismjs')], { type: 'application/javascript' });

        // create a worker for code highlightinh
        let worker = new Worker(URL.createObjectURL(blob));

        worker.onmessage = (evt: MessageEvent) => {

            // insert the code in the code snippet element
            this.codeContainer.element.nativeElement.innerHTML = `<code>${evt.data}</code>`;

            // terminate worker
            worker.terminate();
        };

        // send the language and code through to the other thread
        worker.postMessage(JSON.stringify({
            language: this.language,
            code: this.code
        }));

    }
}
