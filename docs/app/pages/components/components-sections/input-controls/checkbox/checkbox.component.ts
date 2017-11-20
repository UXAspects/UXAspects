import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-checkbox',
    templateUrl: './checkbox.component.html'
})
@DocumentationSectionComponent('ComponentsCheckboxComponent')
export class ComponentsCheckboxComponent extends BaseDocumentationSection implements IPlunkProvider {

    checkModel: any;
    simplified: boolean;
    indeterminateValue: number;
    disableCheck: boolean;

    sliderValue: number = 50;
    sliderOptions: any = {
        type: 'value',
        handles: {
            style: 'button',
            callout: {
                trigger: 'none',
                background: '#464646',
                color: '#fff',
                formatter: function (value: any) {
                    return value;
                }
            }
        },
        track: {
            height: 'wide',
            min: 0,
            max: 100,
            ticks: {
                snap: 'none',
                major: {
                    show: true,
                    steps: 10,
                    labels: true,
                    formatter: function (value: any) {
                        return value;
                    }
                },
                minor: {
                    show: true,
                    steps: 5,
                    labels: false,
                    formatter: function (value: any) {
                        return value;
                    }
                }
            },
            colors: {
                lower: '#f2f2f2',
                range: 'rgba(96,121,141, 0.75)',
                higher: '#f2f2f2'
            }
        }
    };

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml
        },
        modules: [{
            imports: ['CheckboxModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    constructor() {
 
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        this.checkModel = {
            option1: true,
            option2: false,
            option3: false,
            option4: false
        };

        this.simplified = false;
        this.indeterminateValue = -1;
        this.disableCheck = false;
    }
}
