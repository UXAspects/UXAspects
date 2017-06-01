import { Component, Inject, ElementRef } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html',
    styleUrls: ['./src/app.component.less'],
    host: {'(window:keydown)': 'hotkeys($event)'}
})
export class AppComponent {

    nativeElement: HTMLElement;
    qButtons: HTMLElement;
    qSelected: number = 0;
    qText: string = 'None';
    wButtons: HTMLElement;
    wSelected: number = 0;
    wText: string = 'None';

    constructor(@Inject(ElementRef) private element: ElementRef) {
        this.nativeElement = <HTMLElement> this.element.nativeElement;
    }

    hotkeys (event: KeyboardEvent) {
        if (event.keyCode === 81) {
            this.qKeypress();
        }
        if (event.keyCode === 87) {
            this.wKeypress();
        }
    }

    qKeypress() {
        if (!this.qButtons) {
            this.qButtons = <HTMLElement> this.nativeElement.children[0].children[1];
        }
        let focusedElement = <HTMLElement> this.nativeElement.children[0];
        switch (this.qSelected) {
            case 0:
                focusedElement.focus();
                this.qSelected = 1;
                break;
            case 1:
                focusedElement = <HTMLElement> this.qButtons.children[0];
                focusedElement.focus();
                this.qSelected = 2;
                break;
            case 2:
                focusedElement = <HTMLElement> this.qButtons.children[1];
                focusedElement.focus();
                this.qSelected = 3;
                break;
            case 3:
                focusedElement = <HTMLElement> this.qButtons.children[2];
                focusedElement.focus();
                this.qSelected = 0;
        }
    }

    updateQ(event: KeyboardEvent, text: string) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.qText = text;
        }
    }

    updateQClick(text: string) {
        this.qText = text;
    }

    wKeypress() {
        if (!this.wButtons) {
            this.wButtons = <HTMLElement> this.nativeElement.children[1].children[1];
        }
        let focusedElement = <HTMLElement> this.nativeElement.children[1];
        switch (this.wSelected) {
            case 0:
                focusedElement.focus();
                this.wSelected = 1;
                break;
            case 1:
                focusedElement = <HTMLElement> this.wButtons.children[0];
                focusedElement.focus();
                this.wSelected = 2;
                break;
            case 2:
                focusedElement = <HTMLElement> this.wButtons.children[1];
                focusedElement.focus();
                this.wSelected = 3;
                break;
            case 3:
                focusedElement = <HTMLElement> this.wButtons.children[2];
                focusedElement.focus();
                this.wSelected = 0;
        }
    }

    updateW(text: string) {
        this.wText = text;
    }

}