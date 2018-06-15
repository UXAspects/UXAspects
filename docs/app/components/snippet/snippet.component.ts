import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'uxd-snippet',
    templateUrl: './snippet.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnippetComponent implements OnInit {

    @Input() language: string = 'html';
    @Input() code: string;
    @Input() content: any;

    @ViewChild('code', { read: ViewContainerRef }) codeContainer: ViewContainerRef;

    constructor() { }

    ngOnInit(): void {
        if (this.code) {
            this.loadCode();
        } else if (this.content) {
            // removing for temporary build output improvements
            this.loadContent();
        }
    }

    private loadCode(): void {
        // create a blob containing prismjs
        const blob = new Blob([require('raw-loader!prismjs')], { type: 'application/javascript' });

        // create a worker for code highlightinh
        const worker = new Worker(URL.createObjectURL(blob));

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

    private loadContent(): void {
        this.codeContainer.element.nativeElement.innerHTML = `<code>${this.content}</code>`;
    }
}
