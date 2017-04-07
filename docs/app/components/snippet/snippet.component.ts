import { Component, Input, ViewChild, ViewContainerRef, OnInit, AfterViewInit } from '@angular/core';
import { NavigationService } from '../../services/navigation/navigation.service';
import { Http } from '@angular/http';

@Component({
    selector: 'uxd-snippet',
    templateUrl: './snippet.component.html'
})
export class SnippetComponent implements OnInit {

    @Input() language: string = 'html';
    @Input() code: string;
    @Input() content: any;
    @Input() url: any;

    @ViewChild('code', { read: ViewContainerRef }) codeContainer: ViewContainerRef;

    constructor(private navigation: NavigationService, private http: Http) { }

    ngOnInit() {
        if (this.url) {
            this.loadUrl();
        } else if (this.code) {
            this.loadCode();
        } else if (this.content) {
            this.loadContent();
        }
    }

    loadUrl() {
        this.navigation.setRendering();

        this.http.get(this.url).subscribe(response => {
            this.code = response.text();
            this.loadCode();
            this.navigation.doneRendering();
        });
    }

    private loadCode() {
        this.navigation.setRendering();

        // create a blob containing prismjs
        let blob = new Blob([require('raw-loader!prismjs')], { type: 'application/javascript' });

        // create a worker for code highlightinh
        let worker = new Worker(URL.createObjectURL(blob));

        worker.onmessage = (evt: MessageEvent) => {

            // insert the code in the code snippet element
            this.codeContainer.element.nativeElement.innerHTML = `<code>${evt.data}</code>`;

            // terminate worker
            worker.terminate();

            this.navigation.doneRendering();
        };

        // send the language and code through to the other thread
        worker.postMessage(JSON.stringify({
            language: this.language,
            code: this.code
        }));
    }

    private loadContent() {
        this.codeContainer.element.nativeElement.innerHTML = `<code>${this.content}</code>`;
    }
}
