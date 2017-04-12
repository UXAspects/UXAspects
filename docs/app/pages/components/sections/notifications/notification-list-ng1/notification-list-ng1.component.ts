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
        html: this.snippets.raw.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'NotificationListDemoCtrl as vm'
        },
        htmlTemplates: [{
            id: 'modalLayout.html',
            content: this.snippets.raw.modalLayoutHtml
        }, {
            id: 'notification.html',
            content: this.snippets.raw.notificationHtml
        }],
        css: [this.snippets.raw.stylesCss],
        js: [this.snippets.raw.controllerJs, this.snippets.raw.modalControllerJs]
    };

    constructor() {
        super(
            require.context('!!prismjs-loader?lang=html!./snippets/', false, /\.html$/),
            require.context('!!prismjs-loader?lang=css!./snippets/', false, /\.css$/),
            require.context('!!prismjs-loader?lang=javascript!./snippets/', false, /\.js$/),
            require.context('!!prismjs-loader?lang=typescript!./snippets/', false, /\.ts$/),
            require.context('./snippets/', false, /\.(html|css|js|ts)$/)
        );
    }
}
