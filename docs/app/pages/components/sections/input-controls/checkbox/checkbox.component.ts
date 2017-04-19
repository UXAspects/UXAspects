import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-checkbox',
    templateUrl: './checkbox.component.html'
})
@DocumentationSectionComponent('ComponentsCheckboxComponent')
export class ComponentsCheckboxComponent implements IPlunkProvider {

    public checkModel: any;
    public simplified: boolean;
    public indeterminateValue: number;
    public disableCheck: boolean;

    public sliderValue: number = 50;
    public sliderOptions: any = {
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

    public plunk: IPlunk = {
        files: {
            'app.ts': require('./snippets/app.ts'),
            'app.html': require('./snippets/app.html')
        },
        modules: {
            imports: ['CheckboxModule'],
            library: 'ux-aspects'
        }
    };

    constructor() {

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
