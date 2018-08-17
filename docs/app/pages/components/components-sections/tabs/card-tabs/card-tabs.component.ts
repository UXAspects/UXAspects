import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-card-tabs',
    templateUrl: './card-tabs.component.html',
    styleUrls: ['./card-tabs.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsCardTabsComponent')
export class ComponentsCardTabsComponent extends BaseDocumentationSection implements IPlunkProvider {

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            {
                imports: ['CardTabsModule', 'RadioButtonModule', 'AccordionModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    position: string = 'top';

    tabs = [{
        title: 'Archive Totals',
        image: 'card-image-1',
        value: 637,
        unit: 'GB',
        subtitle: '63% licensed storage used',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus volutpat eros, in varius nibh ultrices a. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam pellentesque vel augue nec pellentesque. Nullam sollicitudin pulvinar lectus, non eleifend mauris finibus vitae. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
    }, {
        title: 'Data Processed',
        image: 'card-image-2',
        value: 1.3,
        unit: 'GB',
        subtitle: 'processed this month',
        content: 'Vestibulum faucibus porttitor ligula, vitae sollicitudin tellus efficitur quis. Duis sit amet sollicitudin dui. Praesent mauris tortor, dignissim sit amet convallis et, sollicitudin et risus. Phasellus eget tortor eu est egestas suscipit et eget ante. Vivamus eget ultricies felis. Ut dolor justo, finibus vel metus quis, hendrerit malesuada justo. Donec est nibh, suscipit non feugiat eget, rutrum sed ipsum.'
    }, {
        title: 'Data Retention',
        image: 'card-image-3',
        value: 242,
        unit: 'GB',
        subtitle: '39% data on hold',
        content: 'Mauris sit amet condimentum lorem. Aliquam at ante sed quam volutpat ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam congue posuere eros sed egestas. Cras gravida viverra ipsum vel porta. Ut at hendrerit velit. Fusce est est, vehicula vel elementum et, ultricies at leo.'
    }, {
        title: 'Users',
        image: 'card-image-4',
        value: 195,
        unit: null,
        subtitle: '76 logged in',
        content: 'In hac habitasse platea dictumst. Donec ut nunc mauris. Suspendisse lobortis viverra neque vitae cursus. Proin tempus arcu erat, eu sollicitudin neque efficitur interdum. Cras bibendum eget sapien sit amet hendrerit. Phasellus non dictum urna. Sed fermentum nisl nec turpis euismod lobortis. Pellentesque porta ligula at auctor tempus. Suspendisse non augue nec libero posuere tempus quis nec lectus. Sed non nisl velit.'
    }, {
        title: 'Audit Trail',
        image: 'card-image-5',
        value: null,
        unit: null,
        subtitle: 'activity (last 7 days)',
        content: 'Fusce tempus aliquet tristique. Cras mollis cursus eros, ac tincidunt arcu aliquet sed. Fusce magna nisl, euismod eget mattis ut, convallis sit amet mi. Sed tempor nunc ac blandit pretium. Aliquam ut luctus augue. Etiam luctus felis nisi. Cras a ante nec nulla mattis dignissim. Vivamus placerat faucibus ultricies. Aliquam in efficitur elit, nec egestas odio.'
    }];

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}