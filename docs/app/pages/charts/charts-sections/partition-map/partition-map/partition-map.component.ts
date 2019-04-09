import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PartitionMapSegment } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-charts-partition-map',
    templateUrl: './partition-map.component.html',
    styleUrls: ['./partition-map.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ChartsPartitionMapComponent')
export class ChartsPartitionMapComponent extends BaseDocumentationSection {

    dataset: Readonly<PartitionMapSegment> = {
        name: 'My Workspace',
        children: [
            {
                name: 'Financial Data',
                children: [
                    { name: 'Sensitive', value: 60 },
                    { name: 'Partially Sensitive', value: 60 },
                    { name: 'To be retained', value: 120 },
                    { name: 'Redundant', value: 30 },
                    { name: 'Obsolete', value: 30 },
                ]
            },
            {
                name: 'Identification Data',
                children: [
                    { name: 'Sensitive', value: 60 },
                    { name: 'Partially Sensitive', value: 60 },
                    { name: 'To be retained', value: 60 },
                    { name: 'Redundant', value: 10 },
                    { name: 'Obsolete', value: 10 },
                ]
            },
            {
                name: 'Contact Data',
                children: [
                    { name: 'Sensitive', value: 30 },
                    { name: 'Partially Sensitive', value: 30 },
                    { name: 'To be retained', value: 30 },
                    { name: 'Redundant', value: 5 },
                    { name: 'Obsolete', value: 5 },
                ]
            },
            {
                name: 'Account Data',
                children: [
                    { name: 'Sensitive', value: 15 },
                    { name: 'Partially Sensitive', value: 15 },
                    { name: 'To be retained', value: 15 },
                    { name: 'Redundant', value: 2 },
                    { name: 'Obsolete', value: 0 },
                ]
            }
        ]
    };

    colors: string[][] = [
        ['#7b63a3'],
        ['#635387', '#3baa43', '#025662', '#b08f5c'],
        ['#1c899a', '#18a6df', '#98c972', '#839de8', '#839b9d']
    ];

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }
}