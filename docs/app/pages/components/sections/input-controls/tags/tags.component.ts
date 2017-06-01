import { Component, OnInit } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { TagInputEvent } from '../../../../../../../src/components/tag-input/index';

const TAG_PATTERN = new RegExp(/^[a-zA-Z0-9_\-]+$/);

@Component({
    selector: 'uxd-components-tags',
    templateUrl: 'tags.component.html'
})
@DocumentationSectionComponent('ComponentsTagsComponent')
export class ComponentsTagsComponent implements OnInit {

    tags: string[] = ['Alpha', 'Beta', 'Kappa'];

    allTags = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', '<b>Omega</b>'];

    tagInput: string;

    constructor() { }

    ngOnInit() { }

    validateTag(value: string): string {
        return TAG_PATTERN.test(value) ? null : 'Letters, numbers and underscore only.';
    }

    tagAdding(event: TagInputEvent) {
        console.log(`tagAdding: ${event.tag}`);
    }

    tagAdded(event: TagInputEvent) {
        console.log(`tagAdded: ${event.tag}`);
    }

    tagInvalidated(event: TagInputEvent) {
        console.log(`tagInvalidated: ${event.tag}`);
    }

    tagRemoving(event: TagInputEvent) {
        console.log(`tagRemoving: ${event.tag}`);
    }

    tagRemoved(event: TagInputEvent) {
        console.log(`tagRemoved: ${event.tag}`);
    }

    tagClick(event: TagInputEvent) {
        console.log(`tagClick: ${event.tag}`);
    }
}