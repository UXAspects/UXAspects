import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime } from 'rxjs/operators';
import { DateTimePickerTimezone } from '../../../../../../../src/index';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-date-time-picker',
    templateUrl: './date-time-picker.component.html',
    styleUrls: ['./date-time-picker.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsDateTimePickerComponent')
export class ComponentsDateTimePickerComponent extends BaseDocumentationSection implements IPlunkProvider, AfterViewInit, OnDestroy {

    @ViewChild('input') dateInput: ElementRef;

    date: Date = new Date();
    timezone: DateTimePickerTimezone = { name: 'GMT', offset: 0 };

    showTime: boolean = true;
    showTimezones: boolean = true;
    showMeridians: boolean = true;
    showSpinners: boolean = true;
    subscription: Subscription;

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            { 
                imports: ['DateTimePickerModule', 'CheckboxModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: ['AccordionModule'],
                library: 'ngx-bootstrap/accordion',
                forRoot: true
            },
            {
                imports: ['PopoverModule'],
                library: 'ngx-bootstrap/popover',
                forRoot: true
            }
        ]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    ngAfterViewInit(): void {
        this.subscription = fromEvent(this.dateInput.nativeElement, 'input')
            .pipe(debounceTime(500))
            .subscribe(event => this.parse(this.dateInput.nativeElement.value));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    parse(value: string): void {

        // try and parse the date
        const date = new Date(value);

        // check if the date is valid
        if (!isNaN(date.getDate())) {
            this.date = date;
        }
    }
}