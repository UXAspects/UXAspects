import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-focus-indicator',
    templateUrl: './focus-indicator.component.html',
    styleUrls: ['./focus-indicator.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsFocusIndicatorComponent')
export class ComponentsFocusIndicatorComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    isFocused: boolean = false;
    hasIndicator: boolean = false;
    mouseFocusIndicator: boolean = false;
    keyboardFocusIndicator: boolean = true;

    get buttonText(): string {
        return `${this.isFocused ? 'Focused' : 'Blurred'} - ${this.hasIndicator ? 'With Indicator' : 'No Indicator'}`;
    }

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            {
                imports: ['AccordionModule', 'CheckboxModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
