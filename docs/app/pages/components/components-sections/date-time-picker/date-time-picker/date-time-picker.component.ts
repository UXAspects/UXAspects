import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AccessibilityModule,
  AccordionModule,
  CheckboxModule,
  DateTimePickerModule,
  DateTimePickerTimezone,
  IconModule,
  PopoverModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.less'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    AccessibilityModule,
    IconModule,
    FormsModule,
    PopoverModule,
    DateTimePickerModule,
    AccordionModule,
    CheckboxModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
    DatePipe,
  ],
})
@DocumentationSectionComponent('ComponentsDateTimePickerComponent')
export class ComponentsDateTimePickerComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider, AfterViewInit, OnDestroy
{
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
          library: '@ux-aspects/ux-aspects',
        },
      ],
    };
  };

  constructor() {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );
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
