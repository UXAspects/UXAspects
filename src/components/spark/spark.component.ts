import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ColorIdentifier, ColorService } from '../../services/color/index';

@Component({
  selector: 'ux-spark',
  templateUrl: './spark.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SparkComponent {
  private readonly _colorService = inject(ColorService);

  values: number[] = [];

  @Input() barHeight: number = 10;
  @Input() inlineLabel: string;
  @Input() topLeftLabel: string;
  @Input() topRightLabel: string;
  @Input() bottomLeftLabel: string;
  @Input() bottomRightLabel: string;
  @Input() tooltip: string;
  @Input('aria-label') ariaLabel: string | string[];
  @Input('aria-description') ariaDescription: string;

  private _trackColor: string;
  private _theme: ColorIdentifier = 'primary';
  private _barColor: string | string[] = [];

  @Input()
  set theme(value: string) {
    this._theme = this._colorService.resolveColorName(value);
  }

  get theme(): string {
    return this._theme;
  }

  @Input()
  set trackColor(value: string) {
    this._trackColor = this._colorService.resolve(value);
  }

  get trackColor(): string {
    return this._trackColor;
  }

  @Input()
  set barColor(value: string | string[]) {
    if (Array.isArray(value)) {
      this._barColor = value.map(color => this._colorService.resolve(color));
    } else {
      this._barColor = [this._colorService.resolve(value)];
    }
  }

  get barColor(): string | string[] {
    return this._barColor;
  }

  @Input()
  set value(value: number | number[]) {
    // ensure 'value' is an array at this point
    const values = Array.isArray(value) ? value : [value];

    // get the total value of all lines
    const total = Math.max(
      values.reduce((previous, current) => previous + current, 0),
      100
    );

    // figure out the percentages for each spark line
    this.values = values.map(val => (val / total) * 100);
  }

  get value(): number | number[] {
    return this.values;
  }

  /**
   * Get the aria label for the spark chart
   */
  getAriaLabel(): string | undefined {
    if (!Array.isArray(this.ariaLabel)) {
      return this.ariaLabel || this.tooltip;
    } else {
      return this.ariaLabel.join(', ');
    }
  }
}
