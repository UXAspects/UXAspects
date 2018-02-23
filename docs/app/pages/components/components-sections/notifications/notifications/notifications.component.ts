import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
// import { NotificationService } from '../../../../../../../src/index';

@Component({
    selector: 'ux-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsNotificationsComponent')
export class ComponentsNotificationsComponent extends BaseDocumentationSection {

    // constructor(public notificationService: NotificationService) {
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}

