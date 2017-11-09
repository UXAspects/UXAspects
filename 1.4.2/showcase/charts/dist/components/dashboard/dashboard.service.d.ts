import { DashboardWidgetComponent } from './widget/dashboard-widget.component';
import { DashboardOptions } from './dashboard.component';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class DashboardService {
    private _dashboard;
    private _widgets;
    private _options;
    private _options$;
    private _placeholder;
    private _widgetOrigin;
    private _dimensions;
    private _actionWidget;
    private _columnWidth;
    private _rowHeight;
    private _stacked;
    private _cache;
    private _mouseEvent;
    private _defaultOptions;
    height: BehaviorSubject<number>;
    layout: Subject<DashboardLayoutData[]>;
    /**
     * Return all the options currently being used as a subject
     */
    options(): Subject<DashboardOptions>;
    /**
     * Return all the options currently being used
     */
    getOptions(): DashboardOptions;
    /**
     * Get all the default dashboard options
     */
    getDefaultOptions(): DashboardOptions;
    /**
     * Set the options - automatically set default values where not specified
     * @param options The DashboardOptions that will configure the dashboard
     */
    setOptions(options: DashboardOptions): void;
    /**
     * Allow uniform spacing around each widget
     * @param padding The number of pixels around each widget
     */
    setPadding(padding: number): void;
    /**
     * Set the dashboard container element
     * @param dashboard The HTMLElement that is the dashboard container
     */
    setDashboard(dashboard: HTMLElement): void;
    /**
     * Add a widget to the dashboard
     * @param widget The widget component to add to the dashboard
     */
    addWidget(widget: DashboardWidgetComponent): void;
    /**
     * Remove a widget from the dashboard
     * @param widget The widget to remove
     */
    removeWidget(widget: DashboardWidgetComponent): void;
    /**
     * Indicate that the dashboard element has been resized
     * @param width The width of the dashboard element in px
     * @param height The height of the dashboard element in px
     */
    setDimensions(width: number, height: number): void;
    /**
     * Produce an object containing all the required layout data.
     * This can be useful for exporting/saving a layout
     */
    getLayoutData(): DashboardLayoutData[];
    /**
     * Position widgets programatically
     */
    setLayoutData(layout: DashboardLayoutData[]): void;
    /**
     * Update the positions and sizes of the widgets
     */
    renderDashboard(): void;
    /**
     * Determine where widgets should be positioned based on their positions, width and the size of the container
     */
    setDashboardLayout(): void;
    setStacked(stacked: boolean): void;
    getWidgetsByOrder(): DashboardWidgetComponent[];
    /**
     * Find a position that a widget can fit in the dashboard
     * @param widget The widget to try and position
     */
    setWidgetPosition(widget: DashboardWidgetComponent): void;
    /**
     * Check if a position in the dashboard is vacant or not
     */
    getPositionAvailable(column: number, row: number, columnSpan: number, rowSpan: number, ignoreWidget?: DashboardWidgetComponent): boolean;
    getOccupiedSpaces(): DashboardSpace[];
    /**
     * Begin resizing a widget
     * @param action The the widget to resize
     */
    onResizeStart(action: DashboardAction): void;
    onResizeDrag(action: DashboardAction): void;
    onResizeEnd(): void;
    onDragStart(action: DashboardAction): void;
    onDragEnd(): void;
    onDrag(action: DashboardAction): void;
    cacheWidgets(): void;
    restoreWidgets(ignoreActionWidget?: boolean): void;
    /**
     * When dragging any widgets that need to be moved should be moved to an appropriate position
     */
    shiftWidgets(): void;
    /**
     * After shifts have taken place we should verify the place holder position is still valid
     * @param shiftDirection - the position widgets were shifted
     */
    validatePlaceholderPosition(shiftDirection: ActionDirection): void;
    /**
     * Determine if a widget can be moved left - or if it can move the widgets to the right to make space for the widget
     */
    canWidgetMoveLeft(widget: DashboardWidgetComponent, performMove?: boolean): boolean;
    /**
     * Determine if a widget can be moved right - or if it can move the widgets to the right to make space for the widget
     */
    canWidgetMoveRight(widget: DashboardWidgetComponent, performMove?: boolean): boolean;
    /**
     * Store the initial position of the widget being dragged
     */
    setWidgetOrigin(): void;
    /**
     * Calculate all the required positions is a widget was to be positioned at a particular point
     */
    getRequiredSpacesFromPoint(widget: DashboardWidgetComponent, column: number, row: number): DashboardSpace[];
    /**
     * Position widgets based on the position of the placeholder - this is temporary until confirmed
     */
    updateWidgetPositions(widget: DashboardWidgetComponent): void;
    /**
     * Determine if a widget is occupying a specific row and column
     * @param column The columns to check if occupied
     * @param row The row to check if occupied
     * @param ignoreResizing Whether or not to ignore the widget currently being resized
     */
    getWidgetsAtPosition(column: number, row: number, ignoreResizing?: boolean): DashboardWidgetComponent[];
    /**
     * Update the placeholder visibility, position and size
     */
    setPlaceholderBounds(visible: boolean, x: number, y: number, width: number, height: number): void;
    /**
     * Get the placeholder column position
     */
    getPlaceholderColumn(x: number, width: number): number;
    /**
     * Get the column span of the placeholder
     */
    getPlaceholderColumnSpan(width: number): number;
    /**
     * Get the row position of the placeholder
     */
    getPlaceholderRow(y: number, height: number): number;
    /**
     * Get the row span of the placeholder
     */
    getPlaceholderRowSpan(height: number): number;
    getColumnFromPx(x: number, rounding?: Rounding): number;
    getRowFromPx(y: number, rounding?: Rounding): number;
    commitWidgetChanges(): void;
    getPlaceholder(): DashboardPlaceholder;
    /**
     * Get the current column width
     */
    getColumnWidth(): number;
    /**
     * Get the current column height
     */
    getRowHeight(): number;
    /**
     * Calculate the number of rows populated with widgets
     */
    getRowCount(): number;
    /**
     * Set the height of the dashboard container element
     */
    setDashboardHeight(): void;
    /**
     * Orders the z-index of all widgets to move the active one to the front
     * @param widget The widget that should be brought to the front
     */
    bringToFront(widget: DashboardWidgetComponent): void;
    /**
     * Move a widget down - if widgets are in the position below, then move them down further
     * @param widget The widget to move downwards
     */
    moveWidgetDown(widget: DashboardWidgetComponent, distance?: number): void;
    /**
     * Widgets should not be allowed to have a vacant space above them - if there is one they should move upwards to fill it
     */
    shiftWidgetsUp(): void;
    /**
     * Iterate over each space a widget occupied
     * @param widget The widget to determine spaces
     * @param callback The function to be called for each space, should expect a column and row argument witht he context being the widget
     */
    forEachBlock(widget: DashboardWidgetComponent, callback: (column: number, row: number) => void): void;
    /**
     * Returns the number of columns available
     */
    getColumnCount(): number;
}
export interface DashboardDimensions {
    width?: number;
    height?: number;
}
export interface DashboardWidgetDimensions {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface DashboardAction {
    widget: DashboardWidgetComponent;
    direction: ActionDirection;
    event: MouseEvent;
}
export interface DashboardSpace {
    widget: DashboardWidgetComponent;
    column: number;
    row: number;
}
export interface DashboardPlaceholder {
    visible: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    column?: number;
    row?: number;
    columnSpan?: number;
    rowSpan?: number;
}
export interface DashboardCache {
    id: string;
    column: number;
    row: number;
}
export interface DashboardLayoutData {
    id: string;
    col: number;
    row: number;
    colSpan: number;
    rowSpan: number;
}
export declare enum ActionDirection {
    Top = 0,
    TopRight = 1,
    Right = 2,
    BottomRight = 3,
    Bottom = 4,
    BottomLeft = 5,
    Left = 6,
    TopLeft = 7,
    Move = 8,
}
export declare enum Rounding {
    RoundDown = 0,
    RoundDownBelowHalf = 1,
    RoundUp = 2,
    RoundUpOverHalf = 3,
}
