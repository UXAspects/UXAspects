import { Component, Input, ViewChild, ViewContainerRef, OnInit, AfterViewInit } from '@angular/core';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
    selector: 'uxd-snippet',
    templateUrl: './snippet.component.html'
})
export class SnippetComponent implements OnInit {

    @Input() language: string = 'html';
    @Input() code: string;

    @ViewChild('code', { read: ViewContainerRef }) codeContainer: ViewContainerRef;

    constructor(private navigation: NavigationService) { }

    ngOnInit() {

        console.log('SnippetComponent.ngOnInit');

        if (!this.code) {
            return;
        }

        // this.navigation.setRendering();

        // // create a blob containing prismjs
        // let blob = new Blob([require('raw-loader!prismjs')], { type: 'application/javascript' });

        // // create a worker for code highlightinh
        // let worker = new Worker(URL.createObjectURL(blob));

        // worker.onmessage = (evt: MessageEvent) => {

        //     // insert the code in the code snippet element
        //     this.codeContainer.element.nativeElement.innerHTML = `<code>${evt.data}</code>`;

        //     // terminate worker
        //     worker.terminate();

        //     this.navigation.doneRendering();
        // };

        // // send the language and code through to the other thread
        // worker.postMessage(JSON.stringify({
        //     language: this.language,
        //     code: this.code
        // }));

        // Temporarily loading these upfront to solve navigation issues
        let prism = require('prismjs');
        let snippet = prism.highlight(this.code, prism.languages[this.language]);

        this.codeContainer.element.nativeElement.innerHTML = `<code>${snippet}</code>`;
    }
}
