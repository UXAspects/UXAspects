import { ColumnSortingComponent } from './../../../../../../../src/components/column-sorting/column-sorting.component';
import { Component, Inject, ElementRef } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from './../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-hotkeys',
    templateUrl: './hotkeys.component.html',
    styleUrls: ['./hotkeys.component.less'],
    host: {'(window:keydown)': 'hotkeys($event)'}
})
@DocumentationSectionComponent('ComponentsHotkeysComponent')
export class ComponentsHotkeysComponent extends BaseDocumentationSection implements IPlunkProvider {

    nativeElement: HTMLElement;
    qButtons: HTMLElement;
    qSelected: number = 0;
    qText: string = 'None';
    wButtons: HTMLElement;
    wSelected: number = 0;
    wText: string = 'None';

    constructor( @Inject(ElementRef) private element: ElementRef) {

        super(
            null, // require.context('!!prismjs-loader?lang=html!./snippets/', false, /\.html$/),
            null, // require.context('!!prismjs-loader?lang=css!./snippets/', false, /\.css$/),
            null, // require.context('!!prismjs-loader?lang=javascript!./snippets/', false, /\.js$/),
            null, // require.context('!!prismjs-loader?lang=typescript!./snippets/', false, /\.ts$/),
            require.context('./snippets/', false, /\.(html|less|js|ts)$/)
        );

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

    public plunk: IPlunk = {
        files: {
            'app.component.ts': require('./snippets/app.ts'),
            'app.component.html': require('./snippets/app.html'),
            'app.component.less': require('./snippets/app.less')
        }
    };

}