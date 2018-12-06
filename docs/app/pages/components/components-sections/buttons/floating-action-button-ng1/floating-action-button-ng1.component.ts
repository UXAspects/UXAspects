import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FloatingActionButtonItem } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';

@Component({
    selector: 'uxd-floating-action-button-ng1',
    templateUrl: 'floating-action-button-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsFloatingActionButtonNg1Component')
export class ComponentsFloatingActionButtonNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    codepen: ICodePen = {
        html: this.snippets.raw.floatingActionButtonHtml,
        htmlAttributes: {
            'ng-controller': 'FloatingActionButtonCtrl as vm'
        },
        js: [this.snippets.raw.floatingActionButtonJs]
    };

    itemsOne: FloatingActionButtonItem[] = [
        {
            icon: 'hpe-add',
            event: () => {},
            tooltip: 'Add New Item'
        },
        {
            icon: 'hpe-analytics',
            event: () => {},
            tooltip: 'Show Analytics'
        },
        {
            icon: 'hpe-app',
            event: () => {},
            tooltip: 'Show Overview'
        }
    ];

    itemsTwo: FloatingActionButtonItem[] = [
        {
            icon: 'hpe-add',
            event: () => {},
            tooltip: 'Add New Item',
            tooltipPlacement: 'right'
        },
        {
            icon: 'hpe-analytics',
            event: () => {},
            tooltip: 'Show Analytics',
            tooltipPlacement: 'right'
        },
        {
            icon: 'hpe-app',
            event: () => {},
            tooltip: 'Show Overview',
            tooltipPlacement: 'right'
        }
    ];

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
