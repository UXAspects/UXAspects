import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-toggle-switch-ng1',
    templateUrl: './toggle-switch-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsToggleSwitchNg1Component')
export class ComponentsToggleSwitchNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    public codepen: ICodePen = {
        html: this.snippets.raw.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'ToggleSwitchDemoCtrl as vm'
        },
        css: [this.snippets.raw.sampleCss],
        js: [this.snippets.raw.sampleJs]
    };

}