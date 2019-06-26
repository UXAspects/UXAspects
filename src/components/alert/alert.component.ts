import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Optional, Output } from '@angular/core';
import { ColorService } from '../../services/color/index';
import { AlertIconDirective } from './alert-icon.directive';

@Component({
    selector: 'ux-alert',
    templateUrl: './alert.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'role': 'alert',
        '[class.ux-alert-info]': 'type === "info" && !_isCustomColor',
        '[class.ux-alert-error]': 'type === "error" && !_isCustomColor',
        '[class.ux-alert-warning]': 'type === "warning" && !_isCustomColor',
        '[class.ux-alert-success]': 'type === "success" && !_isCustomColor',
        '[class.ux-alert-dark]': 'type === "dark" && !_isCustomColor',
        '[style.background-color]': '_backgroundColor',
        '[style.color]': '_foregroundColor'
    }
})
export class AlertComponent {

    /** Determine the style of the alert */
    @Input() type: AlertType = 'info';

    /** Determine the the alert can be dismissed */
    @Input() dismissible: boolean = false;

    /** Define a custom background color */
    @Input() backgroundColor: string;

    /** Define a custom foreground color */
    @Input() foregroundColor: string;

    /** Define a custom aria label for the dismiss button */
    @Input() dismissAriaLabel: string = 'Dismiss Alert';

    /** Emit when the dismiss button is pressed */
    @Output() dismiss = new EventEmitter<void>();

    /** Identify if we have an icon */
    @ContentChild(AlertIconDirective, { static: false }) icon: AlertIconDirective;

    /** Resolve the background color from the color set */
    get _backgroundColor(): string {
        return this.backgroundColor ? this.getColor(this.backgroundColor) : null;
    }

    /** Resolve the foreground color from the color set */
    get _foregroundColor(): string {
        return this.foregroundColor ? this.getColor(this.foregroundColor) : null;
    }

    /** Determine if we are using a prefined type or custom colors */
    get _isCustomColor(): boolean {
        return !!this.backgroundColor && !!this.foregroundColor;
    }

    constructor(@Optional() private readonly colorService: ColorService) { }

    private getColor(color: string): string | null {

        // if the color service is not imported in the application throw a warning
        if (!this.colorService) {
            /**
             * @deprecated - remove once Angular 5 support is dropped - ColorService will change to
             * be providedIn: 'root' which will not require a module import
             */
            console.warn('To specify an alert color please import the ColorServiceModule and specify the appropriate colorSet.');
            return;
        }

        // check if it is a color name from the color palette or just return the CSS color value
        return this.colorService.resolve(color);
    }

}

export type AlertType = 'info' | 'error' | 'warning' | 'success' | 'dark';