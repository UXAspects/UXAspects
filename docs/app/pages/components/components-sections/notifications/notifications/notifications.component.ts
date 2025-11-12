import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  TemplateRef,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AccessibilityModule,
  AccordionModule,
  ColorPickerColor,
  ColorService,
  IconModule,
  NotificationModule,
  NotificationService,
  NumberPickerModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import { Subject, Subscription } from 'rxjs';
import { buffer, debounceTime } from 'rxjs/operators';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { ColorPickerDropdownComponent } from '../../../../../components/color-picker-dropdown/color-picker-dropdown.component';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NotificationModule,
    AccessibilityModule,
    IconModule,
    AccordionModule,
    ColorPickerDropdownComponent,
    NumberPickerModule,
    FormsModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
    DatePipe,
  ],
})
@DocumentationSectionComponent('ComponentsNotificationsComponent')
export class ComponentsNotificationsComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider, OnDestroy
{
  notificationService = inject(NotificationService);
  colorService = inject(ColorService);
  private readonly _liveAnnouncer = inject(LiveAnnouncer);

  duration: number = 4;
  description: string = 'You have 16 messages';

  colors: ColorPickerColor[][] = [
    [
      new ColorPickerColor('primary', this.colorService.getColor('primary').toHex()),
      new ColorPickerColor('accent', this.colorService.getColor('accent').toHex()),
      new ColorPickerColor('chart4', this.colorService.getColor('chart4').toHex()),
      new ColorPickerColor('chart5', this.colorService.getColor('chart5').toHex()),
    ],
    [
      new ColorPickerColor('ok', this.colorService.getColor('ok').toHex()),
      new ColorPickerColor('warning', this.colorService.getColor('warning').toHex()),
      new ColorPickerColor('critical', this.colorService.getColor('critical').toHex()),
    ],
  ];

  selected: ColorPickerColor = this.colors[0][1];

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: [
          'NotificationModule',
          'NumberPickerModule',
          'ColorPickerModule',
          'AccordionModule',
          'MenuModule',
        ],
        library: '@ux-aspects/ux-aspects',
      },
      {
        imports: ['A11yModule'],
        library: '@angular/cdk/a11y',
      },
    ],
  };

  private readonly _notifications = new Subject<string>();
  private readonly _subscription: Subscription;

  constructor() {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );

    // buffer notifications then announce them
    this._subscription = this._notifications
      .pipe(buffer(this._notifications.pipe(debounceTime(1000))))
      .subscribe(notifications => {
        this._liveAnnouncer.announce(
          notifications.map(notification => `Notification: ${notification}.`).join()
        );
      });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._notifications.complete();
  }

  showNotification(template: TemplateRef<any>) {
    this.notificationService.show(
      template,
      { duration: this.duration, backgroundColor: this.selected.hex },
      { description: this.description }
    );

    // announce the notification
    this._notifications.next(this.description);
  }

  @HostListener('document:keydown.escape')
  dismissNotifications(): void {
    this.notificationService.dismissAll();
  }
}
