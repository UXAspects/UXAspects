import { Injectable } from '@angular/core';
import { DashboardWidgetComponent } from './widget/dashboard-widget.component';
import { DashboardOptions } from './dashboard.component';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DashboardService {

    private _dashboard: HTMLElement;
    private _widgets: DashboardWidgetComponent[] = [];
    private _options: DashboardOptions;
    private _options$: Subject<DashboardOptions> = new Subject<DashboardOptions>();
    private _placeholder: DashboardPlaceholder = { visible: false, x: 0, y: 0, width: 0, height: 0 };
    private _widgetOrigin: { column?: number, row?: number, columnSpan?: number, rowSpan?: number };
    private _dimensions: DashboardDimensions = {};
    private _actionWidget: DashboardAction;
    private _columnWidth: number = 0;
    private _rowHeight: number = 0;
    private _stacked: boolean = false;
    private _cache: DashboardCache[];
    private _mouseEvent: MouseEvent;
    private _defaultOptions: DashboardOptions = {
        columns: 5,
        padding: 5,
        minWidth: 100,
        minHeight: 100,
        emptyRow: true
    };

    height: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    layout: Subject<DashboardLayoutData[]> = new Subject<DashboardLayoutData[]>();

    /**
     * Return all the options currently being used as a subject
     */
    options(): Subject<DashboardOptions> {
        return this._options$;
    }

    /**
     * Return all the options currently being used
     */
    getOptions(): DashboardOptions {
        return this._options;
    }

    /**
     * Get all the default dashboard options
     */
    getDefaultOptions(): DashboardOptions {
        return this._defaultOptions;
    }

    /**
     * Set the options - automatically set default values where not specified
     * @param options The DashboardOptions that will configure the dashboard
     */
    setOptions(options: DashboardOptions): void {
        this._options = Object.assign({}, this._defaultOptions, options);

        // update the observable
        this._options$.next(this._options);
    }

    /**
     * Allow uniform spacing around each widget
     * @param padding The number of pixels around each widget
     */
    setPadding(padding: number) {
        this._options.padding = padding;
        this.options().next(this._options);
    }

    /**
     * Set the dashboard container element
     * @param dashboard The HTMLElement that is the dashboard container
     */
    setDashboard(dashboard: HTMLElement): void {
        this._dashboard = dashboard;
    }

    /**
     * Add a widget to the dashboard
     * @param widget The widget component to add to the dashboard
     */
    addWidget(widget: DashboardWidgetComponent): void {
        this._widgets.push(widget);
    }

    /**
     * Remove a widget from the dashboard
     * @param widget The widget to remove
     */
    removeWidget(widget: DashboardWidgetComponent): void {
        this._widgets.findIndex(wgt => wgt === widget);
    }

    /**
     * Indicate that the dashboard element has been resized
     * @param width The width of the dashboard element in px
     * @param height The height of the dashboard element in px
     */
    setDimensions(width: number, height: number): void {
        this._dimensions.width = width;
        this._dimensions.height = height;

        // trigger re-render
        this.renderDashboard();
    }

    /**
     * Produce an object containing all the required layout data.
     * This can be useful for exporting/saving a layout
     */
    getLayoutData(): DashboardLayoutData[] {
        return this._widgets.map(widget => {
            return { id: widget.getId(), col: widget.getColumn(), row: widget.getRow(), colSpan: widget.getColumnSpan(), rowSpan: widget.getRowSpan() };
        });
    }

    /**
     * Position widgets programatically
     */
    setLayoutData(layout: DashboardLayoutData[]): void {
        // iterate through each widget data and find a match
        layout.forEach(widget => {

            // find the matching widget
            let target = this._widgets.find(wgt => wgt.getId() === widget.id);

            if (target) {
                target.setColumn(widget.col);
                target.setRow(widget.row);
                target.setColumnSpan(widget.colSpan);
                target.setRowSpan(widget.rowSpan);
            }
        });
    }

    /**
     * Update the positions and sizes of the widgets
     */
    renderDashboard(): void {

        // get the dimensions of the dashboard
        this._columnWidth = this._dimensions.width / this._options.columns;
        this._rowHeight = this._options.rowHeight || this._columnWidth;

        // ensure the column width is not below the min widths
        if (this._columnWidth < this._options.minWidth) {
            this.setStacked(true);
        } else {
            this.setStacked(false);
        }

        // ensure the row height is not below the min widths
        if (this._rowHeight < this._options.minWidth) {
            this._rowHeight = this._options.minWidth;
        }

        this.setDashboardLayout();

        // iterate through each widget and set the size - except the one being resized
        this._widgets.filter(widget => !this._actionWidget || widget !== this._actionWidget.widget)
            .forEach(widget => widget.render());
    }

    /**
     * Determine where widgets should be positioned based on their positions, width and the size of the container
     */
    setDashboardLayout(): void {

        // find any widgets that do not currently have a position set
        this._widgets.filter(widget => widget.getColumn() === undefined || widget.getRow() === undefined)
            .forEach(widget => this.setWidgetPosition(widget));

        this.setDashboardHeight();
    }

    setStacked(stacked: boolean): void {

        // only do the following if the stacked state has changed
        if (stacked === this._stacked) {
            return;
        }

        // store the stacked state
        this._stacked = stacked;

        // update the stacked state for all widgets
        this._widgets.forEach(widget => widget.setStacked(this._stacked));

        // if stacked is true we need to do some reordering etc..
        if (stacked === true) {

            // iterate through each widget set it's stacked state and
            this.getWidgetsByOrder().forEach((widget, idx) => {
                widget.setStacked(true);
                widget.setColumn(0);
                widget.setRow(idx);
            });
        }

    }

    getWidgetsByOrder(): DashboardWidgetComponent[] {
        return this._widgets.sort((w1, w2) => {

            let w1Position = w1.getColumn() * w1.getRow();
            let w2Position = w2.getColumn() * w2.getRow();

            if (w1Position < w2Position) {
                return -1;
            }

            if (w1Position > w2Position) {
                return 1;
            }

            return 0;
        });
    }

    /**
     * Find a position that a widget can fit in the dashboard
     * @param widget The widget to try and position
     */
    setWidgetPosition(widget: DashboardWidgetComponent): void {

        // find a position for the widget
        let position = 0;
        let success = false;

        // repeat until a space is found
        while (!success) {

            // get a position to try
            let column = position % this._options.columns;
            let row = Math.floor(position / this._options.columns);

            // check the current position
            if (this.getPositionAvailable(column, row, widget.getColumnSpan(), widget.getRowSpan())) {
                success = true;
                widget.setColumn(column);
                widget.setRow(row);
                return;
            }

            position++;
        }
    }

    /**
     * Check if a position in the dashboard is vacant or not
     */
    getPositionAvailable(column: number, row: number, columnSpan: number, rowSpan: number, ignoreWidget?: DashboardWidgetComponent): boolean {

        // get a list of grid spaces that are populated
        let spaces = this.getOccupiedSpaces();

        // check if the block would still be in bounds
        if (column + columnSpan > this._options.columns) {
            return false;
        }

        // check each required position
        for (let x = column; x < column + columnSpan; x++) {
            for (let y = row; y < row + rowSpan; y++) {
                if (spaces.find(block => block.column === x && block.row === y && block.widget !== ignoreWidget)) {
                    return false;
                }
            }
        }

        return true;
    }

    getOccupiedSpaces(): DashboardSpace[] {

        // find all spaces that are currently occupied
        return this._widgets.filter(widget => widget.getColumn() !== undefined && widget.getRow() !== undefined)
            .reduce((value, widget) => {

                this.forEachBlock(widget, (column, row) => value.push({ widget: widget, column: column, row: row }));

                return value;
            }, []);
    }

    /**
     * Begin resizing a widget
     * @param action The the widget to resize
     */
    onResizeStart(action: DashboardAction): void {

        // store the mouse event
        this._mouseEvent = action.event;
        this._actionWidget = action;

        // bring the widget to the font
        this.bringToFront(action.widget);
    }

    onResizeDrag(action: DashboardAction): void {

        // if there was no movement then do nothing
        if (action.event.x === this._mouseEvent.x && action.event.y === this._mouseEvent.y) {
            return;
        }

        // update the stored mouse event
        this._mouseEvent = action.event;

        // get handle for direction
        let handle = action.widget.getHandles().find(hnd => hnd.direction === action.direction);

        // get the bounds of the handle
        let bounds = handle.element.getBoundingClientRect();

        // get the center of the handle
        let centerX = bounds.left + (bounds.width / 2);
        let centerY = bounds.top + (bounds.height / 2);

        // get the current mouse position
        let mouseX = action.event.x - centerX;
        let mouseY = action.event.y - centerY;

        // store the new proposed dimensions for the widget
        let dimensions: DashboardWidgetDimensions = {
            x: action.widget.actualX,
            y: action.widget.actualY,
            width: action.widget.actualWidth,
            height: action.widget.actualHeight
        };

        // update widget based on the handle being dragged
        switch (action.direction) {

            case ActionDirection.Right:
                dimensions.width += mouseX;
                break;

            case ActionDirection.Left:
                dimensions.x += mouseX;
                dimensions.width -= mouseX;

                if (dimensions.width < this._options.minWidth) {
                    let difference = this._options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }

                break;

            case ActionDirection.Bottom:
                dimensions.height += mouseY;
                break;

            case ActionDirection.Top:
                dimensions.y += mouseY;
                dimensions.height -= mouseY;

                if (dimensions.height < this._options.minHeight) {
                    let difference = this._options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;

            // Support resizing on multiple axis simultaneously
            case ActionDirection.TopLeft:

                dimensions.x += mouseX;
                dimensions.width -= mouseX;

                if (dimensions.width < this._options.minWidth) {
                    let difference = this._options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }

                dimensions.y += mouseY;
                dimensions.height -= mouseY;

                if (dimensions.height < this._options.minHeight) {
                    let difference = this._options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;

            case ActionDirection.TopRight:
                dimensions.width += mouseX;
                dimensions.y += mouseY;
                dimensions.height -= mouseY;

                if (dimensions.height < this._options.minHeight) {
                    let difference = this._options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;

            case ActionDirection.BottomLeft:
                dimensions.height += mouseY;
                dimensions.x += mouseX;
                dimensions.width -= mouseX;

                if (dimensions.width < this._options.minWidth) {
                    let difference = this._options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                break;

            case ActionDirection.BottomRight:
                dimensions.height += mouseY;
                dimensions.width += mouseX;
                break;
        }

        let currentWidth = action.widget.actualX + action.widget.actualWidth;
        let currentHeight = action.widget.actualY + action.widget.actualHeight;

        // ensure values are within the dashboard bounds
        if (dimensions.x < 0) {
            dimensions.x = 0;
            dimensions.width = currentWidth;
        }

        if (dimensions.y < 0) {
            dimensions.y = 0;
            dimensions.height = currentHeight;
        }

        if ((dimensions.x + dimensions.width) > this._dimensions.width) {
            dimensions.width = this._dimensions.width - dimensions.x;
        }

        if ((dimensions.y + dimensions.height) > this._dimensions.height) {
            dimensions.height = currentHeight;
        }

        // if the proposed width is smaller than allowed then reset width to minimum and ignore x changes
        if (dimensions.width < this._options.minWidth) {
            dimensions.x = action.widget.actualX;
            dimensions.width = this._options.minWidth;
        }

        // if the proposed height is smaller than allowed then reset height to minimum and ignore y changes
        if (dimensions.height < this._options.minHeight) {
            dimensions.y = action.widget.actualY;
            dimensions.height = this._options.minHeight;
        }

        // update the widget actual values
        action.widget.setBounds(dimensions.x, dimensions.y, dimensions.width, dimensions.height);

        // update placeholder position and value
        this.setPlaceholderBounds(true, dimensions.x, dimensions.y, dimensions.width, dimensions.height);

        // show the widget positions if the current positions and sizes were to persist
        this.updateWidgetPositions(action.widget);
    }

    onResizeEnd(): void {

        // commit resize changes
        this.commitWidgetChanges();

        // hide placeholder
        this.getPlaceholder().visible = false;

        this._actionWidget = null;
        this._mouseEvent = null;

        // ensure any vacant upper spaces are filled where required
        this.shiftWidgetsUp();

        // update dashboard height
        this.setDashboardHeight();

        // emit information about the layout
        this.layout.next(this.getLayoutData());
    }

    onDragStart(action: DashboardAction): void {
        this.onResizeStart(action);

        // store the starting placeholder position
        this.setWidgetOrigin();

        this.cacheWidgets();
    }

    onDragEnd(): void {
        this.onResizeEnd();

        this._widgetOrigin = {};
    }

    onDrag(action: DashboardAction): void {

        // if there was no movement then do nothing
        if (action.event.x === this._mouseEvent.x && action.event.y === this._mouseEvent.y) {
            return;
        }

        // get the current mouse position
        let mouseX = action.event.x - this._mouseEvent.x;
        let mouseY = action.event.y - this._mouseEvent.y;

        // store the latest event
        this._mouseEvent = action.event;

        let dimensions: DashboardWidgetDimensions = {
            x: action.widget.actualX + mouseX,
            y: action.widget.actualY + mouseY,
            width: action.widget.actualWidth,
            height: action.widget.actualHeight
        };

        this.restoreWidgets(true);

        // update widget position
        action.widget.setBounds(dimensions.x, dimensions.y, dimensions.width, dimensions.height);

        // update placeholder position and value
        this.setPlaceholderBounds(true, dimensions.x, dimensions.y, dimensions.width, dimensions.height);

        // show the widget positions if the current positions and sizes were to persist
        this.shiftWidgets();

        this.setDashboardHeight();
    }

    cacheWidgets(): void {
        this._cache = this._widgets.map(widget => {
            return {
                id: widget.getId(),
                column: widget.getColumn(),
                row: widget.getRow()
            };
        });
    }

    restoreWidgets(ignoreActionWidget: boolean = false): void {
        this._cache.filter(widget => !ignoreActionWidget || widget.id !== this._actionWidget.widget.getId()).forEach(widget => {
            let match = this._widgets.find(wgt => wgt.getId() === widget.id);

            if (match) {
                match.setColumn(widget.column);
                match.setRow(widget.row);
            }
        });
    }

    /**
     * When dragging any widgets that need to be moved should be moved to an appropriate position
     */
    shiftWidgets(): void {

        let widgetsToMove: DashboardWidgetComponent[] = [];

        // check if there are any widgets under the placeholder
        for (let row = this.getPlaceholder().row; row < this.getPlaceholder().row + this.getPlaceholder().rowSpan; row++) {
            for (let column = this.getPlaceholder().column; column < this.getPlaceholder().column + this.getPlaceholder().columnSpan; column++) {

                // store reference to any widgets that need moved
                this.getOccupiedSpaces()
                    .filter(space => space.column === column && space.row === row && space.widget !== this._actionWidget.widget)
                    .forEach(space => widgetsToMove.push(space.widget));
            }
        }

        // remove any duplicates
        widgetsToMove = widgetsToMove.filter((widget, idx, array) => array.indexOf(widget) === idx);

        // if no widgets need moved then we can stop here
        if (widgetsToMove.length === 0) {
            return;
        }

        // create a duplicate we can use to keep track of which have been moved
        let unmovedWidgets = widgetsToMove.slice();

        // attempt to move any widgets to the previous widget position
        widgetsToMove.forEach(widget => {

            // get a grid off all occupied spaces - taking into account the placeholder and ignoring widgets that need moved
            let grid = this.getOccupiedSpaces().filter(space => !unmovedWidgets.find(wgt => wgt === space.widget));

            // iterate each free block
            for (let row = this._widgetOrigin.row; row < this._widgetOrigin.row + this._widgetOrigin.rowSpan; row++) {
                for (let column = this._widgetOrigin.column; column < this._widgetOrigin.column + this._widgetOrigin.columnSpan; column++) {

                    // determine if the block can fit in this space
                    let requiredSpaces = this.getRequiredSpacesFromPoint(widget, column, row);

                    // check if widget would fit in space
                    let available = requiredSpaces.every(space => {
                        return !grid.find(gridSpace => gridSpace.column === space.column && gridSpace.row === space.row) && space.column < this.getColumnCount();
                    });

                    if (available) {
                        widget.setColumn(column);
                        widget.setRow(row);
                        unmovedWidgets.splice(unmovedWidgets.findIndex(wgt => wgt === widget), 1);
                        return;
                    }
                }
            }

            // if we get to here then we can't simply swap the positions - next try moving right
            if (this.canWidgetMoveRight(widget, true)) {
                return;
            }

            // next try moving left
            if (this.canWidgetMoveLeft(widget, true)) {
                return;
            }

            // determine the distance that the widget needs to be moved down
            let distance = (this._actionWidget.widget.getRow() - widget.getRow()) + this._actionWidget.widget.getRowSpan();

            // as a last resort move the widget downwards
            this.moveWidgetDown(widget, distance);
        });
    }

    /**
     * Determine if a widget can be moved left - or if it can move the widgets to the right to make space for the widget
     */
    canWidgetMoveLeft(widget: DashboardWidgetComponent, performMove: boolean = false): boolean {

        // check if the widget is the action widget or occupies the first column
        if (widget === this._actionWidget.widget || widget.getColumn() === 0) {
            return false;
        }

        // find the positions required
        let targetSpaces = this.getOccupiedSpaces().filter(space => space.widget === widget).map(space => {
            return { column: space.column - widget.getColumnSpan(), row: space.row, widget: space.widget };
        });

        // check if there are widget in the required positions and if so, can they move right?
        let moveable = targetSpaces.every(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).every(wgt => this.canWidgetMoveLeft(wgt)));

        if (performMove && moveable) {

            // move all widgets to the right
            targetSpaces.forEach(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).forEach(wgt => this.canWidgetMoveLeft(wgt, true)));

            // move current widget to the right
            widget.setColumn(widget.getColumn() - 1);
        }

        return moveable;
    }

    /**
     * Determine if a widget can be moved right - or if it can move the widgets to the right to make space for the widget
     */
    canWidgetMoveRight(widget: DashboardWidgetComponent, performMove: boolean = false): boolean {

        // check if the widget is the dragging widget or the widget occupies the final column
        if (widget === this._actionWidget.widget || widget.getColumn() + widget.getColumnSpan() === this._options.columns) {
            return false;
        }

        // find the positions required
        let targetSpaces = this.getOccupiedSpaces().filter(space => space.widget === widget).map(space => {
            return { column: space.column + widget.getColumnSpan(), row: space.row, widget: space.widget };
        });

        // check if there are widget in the required positions and if so, can they move right?
        let moveable = targetSpaces.every(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).every(wgt => this.canWidgetMoveRight(wgt)));

        if (performMove && moveable) {

            // move all widgets to the right
            targetSpaces.forEach(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).forEach(wgt => this.canWidgetMoveRight(wgt, true)));

            // move current widget to the right
            widget.setColumn(widget.getColumn() + 1);
        }

        return moveable;
    }

    /**
     * Store the initial position of the widget being dragged
     */
    setWidgetOrigin(): void {
        this._widgetOrigin = {
            column: this._actionWidget.widget.getColumn(),
            row: this._actionWidget.widget.getRow(),
            columnSpan: this._actionWidget.widget.getColumnSpan(),
            rowSpan: this._actionWidget.widget.getRowSpan()
        };
    }

    /**
     * Calculate all the required positions is a widget was to be positioned at a particular point
     */
    getRequiredSpacesFromPoint(widget: DashboardWidgetComponent, column: number, row: number): DashboardSpace[] {
        let spaces: DashboardSpace[] = [];

        for (let y = row; y < row + widget.getRowSpan(); y++) {
            for (let x = column; x < column + widget.getColumnSpan(); x++) {
                spaces.push({ column: x, row: y, widget: widget });
            }
        }

        return spaces;
    }

    /**
     * Position widgets based on the position of the placeholder - this is temporary until confirmed
     */
    updateWidgetPositions(widget: DashboardWidgetComponent) {

        // check all spaces the placeholder will occupy and move any widget currently in them down
        for (let column = this._placeholder.column; column < this._placeholder.column + this._placeholder.columnSpan; column++) {
            for (let row = this._placeholder.row; row < this._placeholder.row + this._placeholder.rowSpan; row++) {

                this.getWidgetsAtPosition(column, row, true)
                    .filter(wgt => wgt !== widget)
                    .forEach(wgt => this.moveWidgetDown(wgt));
            }
        }

        // update the height of the dashboard
        this.setDashboardHeight();

        // if we arent dragging the top handle then fill spaces
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight) {
            this.shiftWidgetsUp();
        }
    }

    /**
     * Determine if a widget is occupying a specific row and column
     * @param column The columns to check if occupied
     * @param row The row to check if occupied
     * @param ignoreResizing Whether or not to ignore the widget currently being resized
     */
    getWidgetsAtPosition(column: number, row: number, ignoreResizing: boolean = false): DashboardWidgetComponent[] {
        return this.getOccupiedSpaces()
            .filter(space => space.column === column && space.row === row)
            .filter(space => space.widget !== this._actionWidget.widget || !ignoreResizing)
            .map(space => space.widget);
    }

    /**
     * Update the placeholder visibility, position and size
     */
    setPlaceholderBounds(visible: boolean, x: number, y: number, width: number, height: number): void {

        let rounding = this._actionWidget.direction === ActionDirection.Left ||
            this._actionWidget.direction === ActionDirection.Top ? Rounding.RoundDownBelowHalf : Rounding.RoundUpOverHalf;

        this._placeholder.visible = visible;

        this._placeholder.column = this.getPlaceholderColumn(x, width);
        this._placeholder.row = this.getPlaceholderRow(y, height);
        this._placeholder.columnSpan = this.getPlaceholderColumnSpan(width);
        this._placeholder.rowSpan = this.getPlaceholderRowSpan(height);

        // calculate the maximum number of rows
        let rowCount = this._widgets.filter(widget => widget !== this._actionWidget.widget)
            .reduce((previous, widget) => Math.max(widget.getRow() + widget.getRowSpan(), previous), 0);

        // constrain maximum placeholder row
        this._placeholder.row = Math.min(this._placeholder.row, rowCount);

        this._placeholder.x = (this._placeholder.column * this.getColumnWidth()) + this._options.padding;
        this._placeholder.y = (this._placeholder.row * this.getRowHeight()) + this._options.padding;
        this._placeholder.width = (this._placeholder.columnSpan * this.getColumnWidth()) - (this._options.padding * 2);
        this._placeholder.height = (this._placeholder.rowSpan * this.getRowHeight()) - (this._options.padding * 2);

        // set the values of the widget to match the values of the placeholder - however do not render the changes
        this._actionWidget.widget.setColumn(this._placeholder.column, false);
        this._actionWidget.widget.setRow(this._placeholder.row, false);
        this._actionWidget.widget.setColumnSpan(this._placeholder.columnSpan, false);
        this._actionWidget.widget.setRowSpan(this._placeholder.rowSpan, false);
    }

    /**
     * Get the placeholder column position
     */
    getPlaceholderColumn(x: number, width: number): number {

        let column = this.getColumnFromPx(x, this._actionWidget.direction === ActionDirection.Move ? Rounding.RoundUpOverHalf : Rounding.RoundDown);
        let columnSpan = Math.floor(width / this.getColumnWidth());
        let upperLimit = this.getColumnCount() - columnSpan;

        // if we arent dragging left then just return the column
        if (this._actionWidget.direction !== ActionDirection.Left &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.BottomLeft) {
            return Math.max(Math.min(column, upperLimit), 0);
        }

        // get any overflow
        let overflow = width % this.getColumnWidth();

        return (x <= 0 || overflow === 0 || columnSpan === 0 || overflow > (this.getColumnWidth() / 2)) ?
            Math.max(Math.min(column, upperLimit), 0) :
            Math.max(Math.min(column + 1, upperLimit), 0);
    }

    /**
     * Get the column span of the placeholder
     */
    getPlaceholderColumnSpan(width: number): number {

        let columnSpan = this.getColumnFromPx(width);

        // if we arent dragging right or left then just return the column span
        if (this._actionWidget.direction !== ActionDirection.Right &&
            this._actionWidget.direction !== ActionDirection.TopRight &&
            this._actionWidget.direction !== ActionDirection.BottomRight &&
            this._actionWidget.direction !== ActionDirection.Left &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.BottomLeft) {
            return Math.max(columnSpan, 1);
        }

        // get the current column span and any overflow
        let overflow = width % this.getColumnWidth();

        return (columnSpan > 0 && overflow > (this.getColumnWidth() / 2)) ? Math.max(columnSpan + 1, 1) : Math.max(columnSpan, 1);
    }

    /**
     * Get the row position of the placeholder
     */
    getPlaceholderRow(y: number, height: number): number {

        let row = this.getRowFromPx(y, this._actionWidget.direction === ActionDirection.Move ? Rounding.RoundUpOverHalf : Rounding.RoundDown);
        let rowSpan = Math.ceil(height / this.getRowHeight());

        // if we arent dragging up then just return the row
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight) {
            return Math.max(row, 0);
        }

        // get any overflow
        let overflow = height < this.getRowHeight() ? 0 : height % this.getRowHeight();

        return (y <= 0 || rowSpan === 0 || overflow === 0 || overflow > (this.getRowHeight() / 2)) ? Math.max(row, 0) : Math.max(row + 1, 0);
    }

    /**
     * Get the row span of the placeholder
     */
    getPlaceholderRowSpan(height: number): number {

        let rowSpan = this.getRowFromPx(height);

        // if we arent dragging up or down then just return the column span
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight &&
            this._actionWidget.direction !== ActionDirection.Bottom &&
            this._actionWidget.direction !== ActionDirection.BottomLeft &&
            this._actionWidget.direction !== ActionDirection.BottomRight) {
            return Math.max(rowSpan, 1);
        }

        // get the current column span and any overflow
        let overflow = height % this.getRowHeight();

        return (overflow > (this.getRowHeight() / 2)) ? Math.max(rowSpan + 1, 1) : Math.max(rowSpan, 1);
    }

    getColumnFromPx(x: number, rounding: Rounding = Rounding.RoundDown): number {

        let column = Math.floor(x / Math.floor(this.getColumnWidth()));
        let overflow = (x % Math.floor(this.getColumnWidth()));
        let half = this.getColumnWidth() / 2;

        switch (rounding) {

            case Rounding.RoundDown:
                return column;

            case Rounding.RoundDownBelowHalf:
                return overflow < half ? column : column + 1;

            case Rounding.RoundUpOverHalf:
                return overflow > half ? column + 1 : column;

            case Rounding.RoundUp:
                return overflow > 0 ? column + 1 : column;
        }

    }

    getRowFromPx(y: number, rounding: Rounding = Rounding.RoundDown): number {

        let row = Math.floor(y / Math.floor(this.getRowHeight()));
        let overflow = (y % Math.floor(this.getRowHeight()));
        let half = this.getRowHeight() / 2;

        switch (rounding) {

            case Rounding.RoundDown:
                return row;

            case Rounding.RoundDownBelowHalf:
                return overflow < half ? row : row + 1;

            case Rounding.RoundUpOverHalf:
                return overflow > half ? row + 1 : row;

            case Rounding.RoundUp:
                return overflow > 0 ? row + 1 : row;
        }
    }

    commitWidgetChanges(): void {

        // check that we have all the values we need
        if (this._placeholder.column === undefined || this._placeholder.row === undefined ||
            this._placeholder.columnSpan === undefined || this._placeholder.rowSpan === undefined) {
            return;
        }

        if (this._actionWidget) {
            this._actionWidget.widget.setColumn(this._placeholder.column);
            this._actionWidget.widget.setRow(this._placeholder.row);
            this._actionWidget.widget.setColumnSpan(this._placeholder.columnSpan);
            this._actionWidget.widget.setRowSpan(this._placeholder.rowSpan);
        }

        // reset all placeholder values
        this._placeholder.column = undefined;
        this._placeholder.row = undefined;
        this._placeholder.columnSpan = undefined;
        this._placeholder.rowSpan = undefined;
    }

    getPlaceholder(): DashboardPlaceholder {
        return this._placeholder;
    }

    /**
     * Get the current column width
     */
    getColumnWidth(): number {
        return Math.floor(this._columnWidth);
    }

    /**
     * Get the current column height
     */
    getRowHeight(): number {
        return this._rowHeight;
    }

    /**
     * Calculate the number of rows populated with widgets
     */
    getRowCount(): number {
        return this._widgets.reduce((previous, widget) => Math.max(widget.getRow() + widget.getRowSpan(), previous), 0);
    }

    /**
     * Set the height of the dashboard container element
     */
    setDashboardHeight(): void {

        // size the dashboard container to ensure all rows fit
        let rowCount = this.getRowCount();

        // if we should show an empty row increment the row count by 1
        if (this._options.emptyRow) {
            rowCount++;
        }

        this._dimensions.height = rowCount * this.getRowHeight();
        this.height.next(this._dimensions.height);
    }

    /**
     * Orders the z-index of all widgets to move the active one to the front
     * @param widget The widget that should be brought to the front
     */
    bringToFront(widget: DashboardWidgetComponent): void {
        this._widgets.forEach(wgt => wgt.sendToBack());
        widget.bringToFront();
    }

    /**
     * Move a widget down - if widgets are in the position below, then move them down further
     * @param widget The widget to move downwards
     */
    moveWidgetDown(widget: DashboardWidgetComponent, distance: number = 1): void {

        // move the widget down one position
        widget.setRow(widget.getRow() + distance);

        // check every space the widget occupies for collisions
        this.forEachBlock(widget, (column, row) =>
            this.getWidgetsAtPosition(column, row, true)
                .filter(wgt => wgt !== widget)
                .forEach(wgt => this.moveWidgetDown(wgt, distance)));
    }

    /**
     * Widgets should not be allowed to have a vacant space above them - if there is one they should move upwards to fill it
     */
    shiftWidgetsUp(): void {

        // check whether or not changes have been made - if so we need to repeat until stable
        let stable = true;

        // iterate each widget and 
        this._widgets.forEach(widget => {

            // if widget is already on the top row then do nothing
            if (widget.getRow() === 0) {
                return;
            }

            // if we are currently dragging and this is the dragging widget then skip
            if (this._actionWidget && this._actionWidget.widget === widget) {
                return;
            }

            if (this.getPositionAvailable(widget.getColumn(), widget.getRow() - 1, widget.getColumnSpan(), 1)) {
                widget.setRow(widget.getRow() - 1);
                stable = false;
            }
        });

        // if changes occurred then we should repeat the process
        if (!stable) {
            this.shiftWidgetsUp();
        }
    }

    /**
     * Iterate over each space a widget occupied
     * @param widget The widget to determine spaces
     * @param callback The function to be called for each space, should expect a column and row argument witht he context being the widget
     */
    forEachBlock(widget: DashboardWidgetComponent, callback: (column: number, row: number) => void): void {
        for (let row = widget.getRow(); row < widget.getRow() + widget.getRowSpan(); row++) {
            for (let column = widget.getColumn(); column < widget.getColumn() + widget.getColumnSpan(); column++) {
                callback.call(widget, column, row);
            }
        }
    }

    /**
     * Returns the number of columns available
     */
    getColumnCount(): number {
        return this._stacked ? 1 : this._options.columns;
    }
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

export enum ActionDirection {
    Top,
    TopRight,
    Right,
    BottomRight,
    Bottom,
    BottomLeft,
    Left,
    TopLeft,
    Move
}

export enum Rounding {
    RoundDown,
    RoundDownBelowHalf,
    RoundUp,
    RoundUpOverHalf
}