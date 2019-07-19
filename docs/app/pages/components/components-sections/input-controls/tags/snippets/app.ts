import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    tags = ['Alpha', 'Beta', 'Kappa'];

    allTags = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa',
        'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi',
        'Psi', 'Omega'];

    input: string;

    addOnPaste: boolean = true;
    disabled: boolean = false;
    addTagIcon: boolean = false;
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
}