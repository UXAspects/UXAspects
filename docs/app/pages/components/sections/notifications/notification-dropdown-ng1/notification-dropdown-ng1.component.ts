import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-notification-dropdown-ng1',
    templateUrl: './notification-dropdown-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsNotificationDropdownNg1Component')
export class ComponentsNotificationDropdownNg1Component implements ICodePenProvider {

    private layoutHtml = require('./snippets/layout.html');
    private controllerJs = require('./snippets/controller.js');
    private modalLayoutHtml = require('./snippets/modalLayout.html');
    private notificationHtml = require('./snippets/notification.html');
    private stylesCss = require('./snippets/styles.css');
    private modalControllerJs = require('./snippets/modalController.js');
    private buttonExampleHtml = require('./snippets/button.example.html');
    private dropdownExampleHtml = require('./snippets/dropdown.example.html');

    public codepen: ICodePen = {
        html: this.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'NotificationDropdownDemoCtrl as vm'
        },
        htmlTemplates: [{
            id: 'modalLayout.html',
            content: this.modalLayoutHtml
        }, {
            id: 'notification.html',
            content: this.notificationHtml
        }],
        css: [this.stylesCss],
        js: [this.controllerJs, this.modalControllerJs]
    };

}
