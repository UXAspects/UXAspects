import {
  BooleanInput,
  coerceBooleanProperty,
  coerceNumberProperty,
  NumberInput,
} from '@angular/cdk/coercion';
import {
  AfterViewInit,
  Component,
  HostBinding,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ActionDirection, DashboardService } from '../dashboard.service';
import { DashboardStackMode } from './dashboard-stack-mode.enum';

@Component({
  selector: 'ux-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  standalone: false,
})
export class DashboardWidgetComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  readonly dashboardService = inject(DashboardService);

  /** Sets the ID of the widget. Each widget should be given a unique ID. */
  @Input() id: string;

  /** Defines a name for the widget used for accessibility */
  @Input() name: string;

  /** Defines the column the widget is placed in */
  @Input() set col(col: number) {
    if (col !== null && col !== undefined) {
      this.setColumn(coerceNumberProperty(col));
      this.dashboardService.renderDashboard();
    }
  }

  get col(): number {
    return this.getColumn();
  }

  /** Defines the row the widget is placed in */
  @Input() set row(row: number) {
    if (row !== null && row !== undefined) {
      this.setRow(coerceNumberProperty(row));
      this.dashboardService.renderDashboard();
    }
  }

  get row(): number {
    return this.getRow();
  }

  /** Defines the number of columns this widget should occupy. */
  @Input() get colSpan() {
    return this.getColumnSpan();
  }

  set colSpan(colSpan: number) {
    if (colSpan !== null && colSpan !== undefined) {
      this.setColumnSpan(coerceNumberProperty(colSpan));
    }
  }

  /** Defines the number of rows this widget should occupy. */
  @Input() get rowSpan() {
    return this.getRowSpan();
  }

  set rowSpan(rowSpan: number) {
    if (rowSpan !== null && rowSpan !== undefined) {
      this.setRowSpan(coerceNumberProperty(rowSpan));
    }
  }

  /** Defines the minimum number of columns this widget should occupy. */
  @Input() get minColSpan(): number {
    return this._minColSpan;
  }

  set minColSpan(minColumns: number) {
    this._minColSpan = coerceNumberProperty(minColumns);
  }

  /** Defines the minimum number of rows this widget should occupy. */
  @Input() get minRowSpan(): number {
    return this._minRowSpan;
  }

  set minRowSpan(minRows: number) {
    this._minRowSpan = coerceNumberProperty(minRows);
  }

  /** Defines whether or not this widget can be resized. */
  @Input() resizable: boolean = false;

  /** Defines whether or not this widget will be automatically repositioned */
  @Input() set autoPositioning(autoPositioning: boolean) {
    this._autoPositioning = coerceBooleanProperty(autoPositioning);
  }

  get autoPositioning(): boolean {
    return this._autoPositioning;
  }

  /** Defines a function that returns an aria label for the widget */
  @Input() widgetAriaLabel: (widgets: DashboardWidgetComponent) => string | string =
    this.getDefaultAriaLabel;

  @HostBinding('style.left.px') x: number = 0;
  @HostBinding('style.top.px') y: number = 0;
  @HostBinding('style.width.px') width: number = 100;
  @HostBinding('style.height.px') height: number = 100;
  @HostBinding('style.padding.px') padding: number = 0;
  @HostBinding('style.z-index') zIndex: number = null;
  @HostBinding('attr.aria-label') ariaLabel: string;
  @HostBinding('attr.role') @Input() role: string = 'group';
  @HostBinding('class.dragging') isDragging: boolean = false;
  @HostBinding('class.grabbing') isGrabbing: boolean = false;
  @HostBinding('class.resizing') isResizing: boolean = false;

  isDraggable: boolean = false;

  private readonly _column: StackableValue = { regular: undefined, stacked: undefined };
  private readonly _row: StackableValue = { regular: undefined, stacked: undefined };
  private readonly _columnSpan: StackableValue = { regular: 1, stacked: 1 };
  private readonly _rowSpan: StackableValue = { regular: 1, stacked: 1 };
  private _minColSpan: number = 1;
  private _minRowSpan: number = 1;
  private _autoPositioning: boolean = true;
  private readonly _onDestroy = new Subject<void>();

  constructor() {
    // subscribe to option changes
    this.dashboardService.options$.pipe(takeUntil(this._onDestroy)).subscribe(() => this.update());

    // every time the layout changes we want to update the aria label
    this.dashboardService.layout$
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => (this.ariaLabel = this.getAriaLabel()));

    // allow widget movements to be animated
    this.dashboardService.isDragging$
      .pipe(
        takeUntil(this._onDestroy),
        map(widget => widget === this)
      )
      .subscribe(isDragging => (this.isDragging = isDragging));

    // allow widget movements to be animated
    this.dashboardService.isGrabbing$
      .pipe(
        takeUntil(this._onDestroy),
        map(widget => widget === this)
      )
      .subscribe(isGrabbing => (this.isGrabbing = isGrabbing));
  }

  ngOnInit(): void {
    this._columnSpan.regular = this.colSpan;
    this._rowSpan.regular = this.rowSpan;
    this._rowSpan.stacked = this.rowSpan;
    this._row.regular = this.row;
    this._row.stacked = this.row;
    this._column.regular = this.col;
    this._column.stacked = this.col;

    if (!this.id) {
      console.warn('Dashboard Widget is missing an ID.');

      // set random id - keeps things working but prevents exporting of positions
      this.id = Math.floor(Math.random() * 100000).toString();
    }
  }

  ngAfterViewInit(): void {
    // add the widget to the dashboard
    this.dashboardService.addWidget(this);

    // apply the current options
    this.update();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.hasPosition() && (changes.colSpan || changes.rowSpan)) {
      this.dashboardService.resizeWidget(this);
      this.dashboardService.renderDashboard();
    }
  }

  /**
   * If component is removed, then unregister it from the service
   */
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
    this.dashboardService.removeWidget(this);
  }

  /**
   * Apply the current dashboard options
   */
  update(): void {
    // get the current options at the time
    const { padding, columns } = this.dashboardService.options;

    this.padding = padding;
    this._columnSpan.stacked = columns;
  }

  /**
   * Set the actual position and size values
   */
  render(): void {
    this.x = this.getColumn() * this.dashboardService.getColumnWidth();
    this.y = this.getRow() * this.dashboardService.getRowHeight();
    this.width = this.getColumnSpan() * this.dashboardService.getColumnWidth();
    this.height = this.getRowSpan() * this.dashboardService.getRowHeight();
  }

  getColumn(mode: DashboardStackMode = DashboardStackMode.Auto): number {
    switch (mode) {
      case DashboardStackMode.Auto:
        return this.getStackableValue(this._column);

      case DashboardStackMode.Regular:
        return this._column.regular;

      case DashboardStackMode.Stacked:
        return this._column.stacked;
    }
  }

  getRow(mode: DashboardStackMode = DashboardStackMode.Auto): number {
    switch (mode) {
      case DashboardStackMode.Auto:
        return this.getStackableValue(this._row);

      case DashboardStackMode.Regular:
        return this._row.regular;

      case DashboardStackMode.Stacked:
        return this._row.stacked;
    }
  }

  setColumn(column: number, render: boolean = true): void {
    this.setStackableValue(this._column, column);

    if (render) {
      this.render();
    }
  }

  setRow(row: number, render: boolean = true): void {
    this.setStackableValue(this._row, row);

    if (render) {
      this.render();
    }
  }

  getColumnSpan(): number {
    return this.getStackableValue(this._columnSpan);
  }

  getRowSpan(): number {
    return this.getStackableValue(this._rowSpan);
  }

  setColumnSpan(columnSpan: number, render: boolean = true): void {
    if (columnSpan >= this.minColSpan) {
      this.setStackableValue(this._columnSpan, columnSpan);

      if (render) {
        this.render();
      }
    }
  }

  setRowSpan(rowSpan: number, render: boolean = true): void {
    if (rowSpan >= this.minRowSpan) {
      this.setStackableValue(this._rowSpan, rowSpan);

      if (render) {
        this.render();
      }
    }
  }

  bringToFront(): void {
    this.zIndex = 1;
  }

  sendToBack(): void {
    this.zIndex = null;
  }

  setBounds(x: number, y: number, width: number, height: number): void {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  dragstart(handle: HTMLElement, event: MouseEvent, direction: ActionDirection): void {
    this.isResizing = true;
    this.dashboardService.isGrabbing$.next(null);
    this.dashboardService.onResizeStart({ widget: this, direction, event, handle });
  }

  drag(handle: HTMLElement, event: MouseEvent, direction: ActionDirection): void {
    this.dashboardService.onResizeDrag({ widget: this, direction, event, handle });
  }

  dragend(): void {
    this.isResizing = false;
    this.dashboardService.onResizeEnd();
  }

  getAriaLabel(): string {
    if (this.widgetAriaLabel && typeof this.widgetAriaLabel === 'string') {
      return this.widgetAriaLabel;
    } else if (this.widgetAriaLabel && typeof this.widgetAriaLabel === 'function') {
      return this.widgetAriaLabel(this);
    }

    return this.ariaLabel;
  }

  private getDefaultAriaLabel(widget: DashboardWidgetComponent): string {
    let options: string = '';

    if (widget.resizable && widget.isDraggable) {
      options = 'It can be moved and resized.';
    } else if (widget.resizable) {
      options = 'It can be resized.';
    } else if (widget.isDraggable) {
      options = 'It can be moved.';
    }

    return `${widget.name} panel in row ${widget.getRow()}, column ${widget.getColumn()}, is ${widget.getColumnSpan()} columns wide and ${widget.getRowSpan()} rows high. ${options}`;
  }

  /**
   * Allows automatic setting of stackable value
   * @param property The current StackableValue object
   * @param value The value to set in the appropriate field
   */
  private setStackableValue(property: StackableValue, value: number): void {
    if (this.dashboardService.stacked) {
      property.stacked = value;
    } else {
      property.regular = value;
    }
  }

  /**
   * Return the appropriate value from a stackable value
   * @param property The Stackable value object
   */
  private getStackableValue(property: StackableValue): number {
    return this.dashboardService.stacked ? property.stacked : property.regular;
  }

  /** Determine if the layout has been performed yet */
  private hasPosition(): boolean {
    return this.getColumn() !== undefined && this.getRow() !== undefined;
  }

  static ngAcceptInputType_autoPositioning: BooleanInput;
  static ngAcceptInputType_col: NumberInput;
  static ngAcceptInputType_row: NumberInput;
  static ngAcceptInputType_colSpan: NumberInput;
  static ngAcceptInputType_rowSpan: NumberInput;
  static ngAcceptInputType_minColSpan: NumberInput;
  static ngAcceptInputType_minRowSpan: NumberInput;
}

export interface StackableValue {
  regular: number;
  stacked: number;
}
