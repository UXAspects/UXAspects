import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-notifications-ng1',
    templateUrl: './notifications-ng1.component.html',
    styleUrls: ['./notifications-ng1.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsNotificationsNg1Component')
export class ComponentsNotificationsNg1Component implements ICodePenProvider {

    private layoutHtml = require('./snippets/layout.html');
    private layoutExampleHtml = require('./snippets/layout.example.html');
    private stylesCss = require('./snippets/styles.css');
    private controllerJs = require('./snippets/controller.js');
    private controllerExampleJs = require('./snippets/controller.example.js');

    public codepen: ICodePen = {
        html: this.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'NotificationsDemoCtrl as vm'
        },
        css: [this.stylesCss],
        js: [this.controllerJs]
    };

}
