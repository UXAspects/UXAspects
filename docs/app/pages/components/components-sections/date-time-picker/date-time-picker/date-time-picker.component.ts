import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateTimePickerTimezone } from '@ux-aspects/ux-aspects';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-date-time-picker',
    templateUrl: './date-time-picker.component.html',
    styleUrls: ['./date-time-picker.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsDateTimePickerComponent')
export class ComponentsDateTimePickerComponent extends BaseDocumentationSection implements IPlaygroundProvider, AfterViewInit, OnDestroy {

    @ViewChild('input', { static: false }) dateInput: ElementRef;

    date: Date = new Date();
    timezone: DateTimePickerTimezone = { name: 'GMT', offset: 0 };

    showTime: boolean = true;
    showTimezones: boolean = true;
    showMeridians: boolean = true;
    showSpinners: boolean = true;
    subscription: Subscription;

    playground = () => {
        return {
            files: {
                'app.component.html': this.snippets.raw.appHtml,
                'app.component.ts': this.snippets.raw.appTs,
                'app.component.css': this.snippets.raw.appCss,
            },
            modules: [
                {
                    imports: ['DateTimePickerModule', 'CheckboxModule', 'PopoverModule', 'AccordionModule'],
                    library: '@ux-aspects/ux-aspects'
                }
            ]
        };
    }

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    ngAfterViewInit(): void {
        this.subscription = fromEvent(this.dateInput.nativeElement, 'input')
            .pipe(debounceTime(500))
            .subscribe(() => this.parse(this.dateInput.nativeElement.value));
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
