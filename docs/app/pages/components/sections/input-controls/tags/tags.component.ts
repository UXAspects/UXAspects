import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk, MAPPINGS } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'uxd-components-tags',
    templateUrl: 'tags.component.html'
})
@DocumentationSectionComponent('ComponentsTagsComponent')
export class ComponentsTagsComponent extends BaseDocumentationSection implements IPlunkProvider {

    tagInput: FormControl;

    tags = ['Alpha', 'Beta', 'Kappa'];

    allTags = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega'];

    input: string;

    addOnPaste: boolean = true;
    disabled: boolean = false;
    enforceTagLimits: boolean = false;
    freeInput: boolean = true;
    minTags: number = 1;
    maxTags: number = 10;
    tagPatternRegExp: RegExp;
    get tagPattern(): string {
        return this.tagPatternRegExp ? this.tagPatternRegExp.source : '';
    }
    set tagPattern(value: string) {
        if (value) {
            try {
                this.tagPatternRegExp = new RegExp(value);
            } catch (e) {
                this.tagPatternRegExp = null;
            }
        } else {
            this.tagPatternRegExp = null;
        }
    }
    placeholder: string = 'Add a tag';
    tagDelimiters: string = ' ,';
    typeaheadEnabled: boolean = false;
    selectFirst: boolean = true;
    dropDirection: 'up' | 'down' = 'down';
    showTypeaheadOnClick: boolean = false;

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml
        },
        modules: [{
            imports: ['TagInputModule', 'TypeaheadModule', 'CheckboxModule', 'RadioButtonModule', 'NumberPickerModule'],
            library: '@ux-aspects/ux-aspects'
        }, {
            library: 'ngx-bootstrap',
            imports: ['AccordionModule'],
            providers: ['AccordionModule.forRoot()']
        }],
        mappings: [MAPPINGS.NgxBootstrap]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}