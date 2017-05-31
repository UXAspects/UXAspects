import { ColumnSortingComponent } from './../../../../../../../src/components/column-sorting/column-sorting.component';
import { Component, Inject, ElementRef } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-hotkeys',
    templateUrl: './hotkeys.component.html',
    styleUrls: ['./hotkeys.component.less'],
    host: {'(window:keydown)': 'hotkeys($event)'}
})
@DocumentationSectionComponent('ComponentsHotkeysComponent')
export class ComponentsHotkeysComponent {

    nativeElement: any;
    qButtons: any;
    qSelected = 0;
    qText = 'None';
    wButtons: any;
    wSelected = 0;
    wText = 'None';

    constructor(@Inject(ElementRef) private element: ElementRef) {
        this.nativeElement = this.element.nativeElement;
    }

    hotkeys (event: any) {
        if (event.keyCode === 81) {
            this.qKeypress();
        }
        if (event.keyCode === 87) {
            this.wKeypress();
        }
    }

    qKeypress() {
        if (!this.qButtons) {
            this.qButtons = this.nativeElement.children[0].children[1];
        }
        switch (this.qSelected) {
            case 0:
                this.nativeElement.children[0].focus();
                this.qSelected = 1;
                break;
            case 1:
                this.qButtons.children[0].focus();
                this.qSelected = 2;
                break;
            case 2:
                this.qButtons.children[1].focus();
                this.qSelected = 3;
                break;
            case 3:
                this.qButtons.children[2].focus();
                this.qSelected = 0;
        }
    }

    wKeypress() {
        if (!this.wButtons) {
            this.wButtons = this.nativeElement.children[1].children[1];
        }
        switch (this.wSelected) {
            case 0:
                this.nativeElement.children[1].focus();
                this.wSelected = 1;
                break;
            case 1:
                this.wButtons.children[0].focus();
                this.wSelected = 2;
                break;
            case 2:
                this.wButtons.children[1].focus();
                this.wSelected = 3;
                break;
            case 3:
                this.wButtons.children[2].focus();
                this.wSelected = 0;
        }
    }

    updateQ(text: string) {
        this.qText = text;
    }

    updateW(text: string) {
        this.wText = text;
    }



}