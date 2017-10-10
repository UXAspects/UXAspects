import { Component, ViewEncapsulation } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-time-picker',
    templateUrl: './time-picker.component.html',
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsTimePickerComponent')
export class ComponentsTimePickerComponent extends BaseDocumentationSection implements IPlunkProvider {

    public myTime: Date = new Date();
    public min: Date = new Date();
    public max: Date = new Date();
    public hourStep: number = 1;
    public minuteStep: number = 1;
    public showMeridian: boolean = true;
    public showSeconds: boolean = false;
    public readonlyInput: boolean = false;
    public mousewheel: boolean = true;
    public arrowkeys: boolean = true;

    private _hourStep = 1;
    private _minuteStep = 1;

    get hStep() {
        return this._hourStep;
    }
    set hStep(value: number) {
        this._hourStep = (value >= 1) ? value : 1;
    }

    get mStep() {
        return this._minuteStep;
    }
    set mStep(value: number) {
        this._minuteStep = (value >= 1) ? value : 1;
    }

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml
        },
        modules: [{
            imports: [
                'CheckboxModule',
                'NumberPickerModule'
            ],
            library: 'ux-aspects'
        }, {
            library: 'ngx-bootstrap/accordion',
            imports: ['AccordionModule'],
            providers: ['AccordionModule.forRoot()']
        }, {
            library: 'ngx-bootstrap/timepicker',
            imports: ['TimepickerModule'],
            providers: ['TimepickerModule.forRoot()']
        }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        this.min.setHours(0);
        this.min.setMinutes(0);
        this.max.setHours(23);
        this.max.setMinutes(59);
    }

    changed(time: Date): void {
        this.myTime = time;
        console.log('Time changed to: ' + this.myTime);
    }
}
