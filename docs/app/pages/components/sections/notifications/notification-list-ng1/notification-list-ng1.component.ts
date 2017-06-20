import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-notification-list-ng1',
    templateUrl: './notification-list-ng1.component.html',
    styleUrls: ['./notification-list-ng1.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsNotificationListNg1Component')
export class ComponentsNotificationListNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    public codepen: ICodePen = {
        html: this.snippets.examples.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'NotificationListDemoCtrl as vm'
        },
        htmlTemplates: [{
            id: 'modalLayout.html',
            content: this.snippets.examples.modalLayoutHtml
        }, {
            id: 'notification.html',
            content: this.snippets.examples.notificationHtml
        }],
        css: [this.snippets.examples.stylesCss],
        js: [this.snippets.examples.controllerJs, this.snippets.examples.modalControllerJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
