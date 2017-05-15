import { ColorService } from './../../../../../../../src/services/color/color.service';
import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import 'chance';

@Component({
    selector: 'uxd-item-display-panel-component',
    templateUrl: './item-display-panel.component.html'
})
@DocumentationSectionComponent('ComponentsItemDisplayPanelComponent')
export class ComponentsItemDisplayPanelComponent {

    visible = false;
    title = '';
    top = 0;
    main = '';
    selected = 0;
    previousEnabled = true;
    nextEnabled = true;
    
    sparkBarColor: string;
    sparkTrackColor: string;

    constructor(colorService: ColorService) {
        this.sparkTrackColor = colorService.getColor('accent').setAlpha(0.2).toRgba();
        this.sparkBarColor = colorService.getColor('accent').toHex();
    }

    show(panel: any, $event: MouseEvent, id: any) {
        this.selected = id;
        this.updatePanel();
        panel.show($event);
    }

    previous() {
        this.selected--;
        this.updatePanel();
    }

    next() {
        this.selected++;
        this.updatePanel();
    }

    updatePanel() {
        this.title = this.items[this.selected - 1].panel.title;
        this.top = this.items[this.selected - 1].panel.top;
        this.main = this.items[this.selected - 1].panel.main;
        this.selected = this.items[this.selected - 1].id;

        if (this.selected < 5) {
            this.nextEnabled = true;
        } else {
            this.nextEnabled = false;
        }

        if (this.selected > 1) {
            this.previousEnabled = true;
        } else {
            this.previousEnabled = false;
        }
    }

    items = [{
                'id': 1,
                'name': chance.name(),
                'dateString': '3 Oct 2015',
                'document': 'Document 4.ppt',
                'extension': '.ppt',
                'storage': '95.25',
                'active': false,
                'panel': {
                    'title': 'Site Detail - UX Aspects (PPT)',
                    'main': require('./modalPPT.html'),
                    'top': 53
                }
            }, {
                'id': 2,
                'name': chance.name(),
                'dateString': '3 Oct 2015',
                'document': 'Document 9.pdf',
                'extension': '.pdf',
                'storage': '15.25',
                'active': true,
                'panel': {
                    'title': 'Site Detail - UX Aspects (PDF)',
                    'main': require('./modalPDF.html'),
                    'top': 53
                }
            }, {
                'id': 3,
                'name': chance.name(),
                'dateString': '3 Oct 2015',
                'document': 'Document 14.doc',
                'extension': '.doc',
                'storage': '25.25',
                'active': false,
                'panel': {
                    'title': 'Site Detail - UX Aspects (DOC)',
                    'main': require('./modalDOC.html'),
                    'top': 53
                }
            }, {
                'id': 4,
                'name': chance.name(),
                'dateString': '3 Oct 2015',
                'document': 'Document 29.pdf',
                'extension': '.pdf',
                'storage': '15.25',
                'active': true,
                'panel': {
                    'title': 'Site Detail - UX Aspects (PDF)',
                    'main': require('./modalPDF.html'),
                    'top': 53
                }
            }, {
                'id': 5,
                'name': chance.name(),
                'dateString': '3 Oct 2015',
                'document': 'Document 34.doc',
                'extension': '.doc',
                'storage': '15.25',
                'active': false,
                'panel': {
                    'title': 'Site Detail - UX Aspects (DOC)',
                    'main': require('./modalDOC.html'),
                    'top': 53
                }
            }];

}
