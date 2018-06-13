import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { delay, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DashboardOptions } from './dashboard.component';
import { DashboardWidgetComponent } from './widget/dashboard-widget.component';

@Injectable()
export class DashboardService {

    private _widgetOrigin: { column?: number, row?: number, columnSpan?: number, rowSpan?: number };
    private _actionWidget: DashboardAction;
    private _rowHeight: number = 0;
    private _cache: DashboardCache[];
    private _mouseEvent: MouseEvent;

    widgets$ = new BehaviorSubject<DashboardWidgetComponent[]>([]);
    options$ = new BehaviorSubject<DashboardOptions>(defaultOptions);
    dimensions$ = new BehaviorSubject<DashboardDimensions>({});
    height$: Observable<number> = this.dimensions$.pipe(delay(0), map((dimensions: DashboardDimensions) => dimensions.height), distinctUntilChanged());
    placeholder$ = new BehaviorSubject<DashboardPlaceholder>({ visible: false, x: 0, y: 0, width: 0, height: 0 });
    layout$ = new Subject<DashboardLayoutData[]>();
    stacked$ = new BehaviorSubject<boolean>(false);

    get options() {
        return this.options$.getValue();
    }

    get widgets() {
        return this.widgets$.getValue();
    }

    get stacked() {
        return this.stacked$.getValue();
    }

    get dimensions() {
        return this.dimensions$.getValue();
    }

    get columnWidth() {
        return this.dimensions.width / this.options.columns;
    }

    constructor() {
        this.layout$.subscribe(this.setLayoutData.bind(this));
        this.stacked$.pipe(filter(stacked => stacked === true)).subscribe(this.updateWhenStacked.bind(this));
        this.widgets$.pipe(delay(0)).subscribe(() => this.renderDashboard());
        this.dimensions$.pipe(delay(0)).subscribe(() => this.renderDashboard());
    }

    /**
     * Add a widget to the dashboard
     * @param widget The widget component to add to the dashboard
     */
    addWidget(widget: DashboardWidgetComponent): void {
        this.widgets$.next([...this.widgets$.getValue(), widget]);
    }

    /**
     * Remove a widget from the dashboard
     * @param widget The widget to remove
     */
    removeWidget(widget: DashboardWidgetComponent): void {
        this.widgets$.next(this.widgets$.getValue().filter(_widget => _widget !== widget));
    }

    /**
     * Indicate that the dashboard element has been resized
     * @param width The width of the dashboard element in px
     * @param height The height of the dashboard element in px
     */
    setDimensions(width: number = this.dimensions.width, height: number = this.dimensions.height): void {
        if (this.dimensions.width !== width || this.dimensions.height !== height) {
            this.dimensions$.next({ width: width, height: height });
        }
    }

    /**
     * Produce an object containing all the required layout data.
     * This can be useful for exporting/saving a layout
     */
    getLayoutData(): DashboardLayoutData[] {
        return this.widgets.map(widget => {
            return { id: widget.id, col: widget.getColumn(), row: widget.getRow(), colSpan: widget.getColumnSpan(), rowSpan: widget.getRowSpan() };
        });
    }

    /**
     * Position widgets programatically
     */
    setLayoutData(widgets: DashboardLayoutData[]): void {

        // iterate through each widget data and find a match
        widgets.forEach(widget => {

            // find the matching widget
            const target = this.widgets.find(_widget => _widget.id === widget.id);

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
        this._rowHeight = this.options.rowHeight || this.columnWidth;

        // ensure the column width is not below the min widths
        this.stacked$.next(this.columnWidth < this.options.minWidth);

        // ensure the row height is not below the min widths
        if (this._rowHeight < this.options.minWidth) {
            this._rowHeight = this.options.minWidth;
        }

        this.setDashboardLayout();

        // iterate through each widget and set the size - except the one being resized
        this.widgets.filter(widget => !this._actionWidget || widget !== this._actionWidget.widget)
            .forEach(widget => widget.render());
    }

    /**
     * Determine where widgets should be positioned based on their positions, width and the size of the container
     */
    setDashboardLayout(): void {

        // find any widgets that do not currently have a position set
        this.widgets.filter(widget => widget.getColumn() === undefined || widget.getRow() === undefined)
            .forEach(widget => this.setWidgetPosition(widget));

        this.setDashboardHeight();
    }

    updateWhenStacked(): void {

        // iterate through each widget set it's stacked state and
        this.getWidgetsByOrder().forEach((widget, idx) => {
            widget.setColumn(0);
            widget.setRow(idx);
        });

    }

    getWidgetsByOrder(): DashboardWidgetComponent[] {
        return this.widgets.sort((w1, w2) => {

            const w1Position = w1.getColumn() * w1.getRow();
            const w2Position = w2.getColumn() * w2.getRow();

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
            const column = position % this.options.columns;
            const row = Math.floor(position / this.options.columns);

            // check the current position
            if (this.getPositionAvailable(column, row, widget.getColumnSpan(), widget.getRowSpan())) {
                success = true;
                widget.setColumn(column);
                widget.setRow(row);
                return;
            }

            if (column === 0 && widget.colSpan > this.options.columns) {
                throw new Error('Dashboard widgets have a colSpan greater than the max number of dashboard columns!');
            }

            position++;
        }
    }

    /**
     * Check if a position in the dashboard is vacant or not
     */
    getPositionAvailable(column: number, row: number, columnSpan: number, rowSpan: number, ignoreWidget?: DashboardWidgetComponent): boolean {

        // get a list of grid spaces that are populated
        const spaces = this.getOccupiedSpaces();

        // check if the block would still be in bounds
        if (column + columnSpan > this.options.columns) {
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
        return this.widgets.filter(widget => widget.getColumn() !== undefined && widget.getRow() !== undefined)
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

        const mousePosX = this._mouseEvent.pageX - pageXOffset;
        const mousePosY = this._mouseEvent.pageY - pageYOffset;

        // if there was no movement then do nothing
        if (action.event.x === mousePosX && action.event.y === mousePosY) {
            return;
        }

        // update the stored mouse event
        this._mouseEvent = action.event;

        // get handle for direction
        const { handle } = action;

        // get the bounds of the handle
        const bounds = handle.getBoundingClientRect();

        // get the center of the handle
        const centerX = bounds.left + (bounds.width / 2);
        const centerY = bounds.top + (bounds.height / 2);

        // get the current mouse position
        const mouseX = mousePosX - centerX;
        const mouseY = mousePosY - centerY;

        // store the new proposed dimensions for the widget
        const dimensions: DashboardWidgetDimensions = {
            x: action.widget.x,
            y: action.widget.y,
            width: action.widget.width,
            height: action.widget.height
        };

        // update widget based on the handle being dragged
        switch (action.direction) {

            case ActionDirection.Right:
                dimensions.width += mouseX;
                break;

            case ActionDirection.Left:
                dimensions.x += mouseX;
                dimensions.width -= mouseX;

                if (dimensions.width < this.options.minWidth) {
                    const difference = this.options.minWidth - dimensions.width;
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

                if (dimensions.height < this.options.minHeight) {
                    const difference = this.options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;

            // Support resizing on multiple axis simultaneously
            case ActionDirection.TopLeft:

                dimensions.x += mouseX;
                dimensions.width -= mouseX;

                if (dimensions.width < this.options.minWidth) {
                    const difference = this.options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }

                dimensions.y += mouseY;
                dimensions.height -= mouseY;

                if (dimensions.height < this.options.minHeight) {
                    const difference = this.options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;

            case ActionDirection.TopRight:
                dimensions.width += mouseX;
                dimensions.y += mouseY;
                dimensions.height -= mouseY;

                if (dimensions.height < this.options.minHeight) {
                    const difference = this.options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;

            case ActionDirection.BottomLeft:
                dimensions.height += mouseY;
                dimensions.x += mouseX;
                dimensions.width -= mouseX;

                if (dimensions.width < this.options.minWidth) {
                    const difference = this.options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                break;

            case ActionDirection.BottomRight:
                dimensions.height += mouseY;
                dimensions.width += mouseX;
                break;
        }

        const currentWidth = action.widget.x + action.widget.width;
        const currentHeight = action.widget.y + action.widget.height;

        // ensure values are within the dashboard bounds
        if (dimensions.x < 0) {
            dimensions.x = 0;
            dimensions.width = currentWidth;
        }

        if (dimensions.y < 0) {
            dimensions.y = 0;
            dimensions.height = currentHeight;
        }

        if ((dimensions.x + dimensions.width) > this.dimensions.width) {
            dimensions.width = this.dimensions.width - dimensions.x;
        }

        // if the proposed width is smaller than allowed then reset width to minimum and ignore x changes
        if (dimensions.width < this.options.minWidth) {
            dimensions.x = action.widget.x;
            dimensions.width = this.options.minWidth;
        }

        // if the proposed height is smaller than allowed then reset height to minimum and ignore y changes
        if (dimensions.height < this.options.minHeight) {
            dimensions.y = action.widget.y;
            dimensions.height = this.options.minHeight;
        }

        // update the widget actual values
        action.widget.setBounds(dimensions.x, dimensions.y, dimensions.width, dimensions.height);

        // update placeholder position and value
        this.setPlaceholderBounds(true, dimensions.x, dimensions.y, dimensions.width, dimensions.height);

        // show the widget positions if the current positions and sizes were to persist
        this.updateWidgetPositions(action.widget);
    }

    onResizeEnd(): void {

        const placeholder = this.placeholder$.getValue();

        // commit resize changes
        this.commitWidgetChanges();

        // hide placeholder
        placeholder.visible = false;

        // update the placeholder
        this.placeholder$.next(placeholder);

        this._actionWidget = null;
        this._mouseEvent = null;

        // ensure any vacant upper spaces are filled where required
        this.shiftWidgetsUp();

        // update dashboard height
        this.setDashboardHeight();

        // emit information about the layout
        this.layout$.next(this.getLayoutData());
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
        if (action.event.pageX === this._mouseEvent.pageX && action.event.pageY === this._mouseEvent.pageY) {
            return;
        }

        // get the current mouse position
        const mouseX = action.event.pageX - this._mouseEvent.pageX;
        const mouseY = action.event.pageY - this._mouseEvent.pageY;

        // store the latest event
        this._mouseEvent = action.event;

        const dimensions: DashboardWidgetDimensions = {
            x: action.widget.x + mouseX,
            y: action.widget.y + mouseY,
            width: action.widget.width,
            height: action.widget.height
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

    getRowHeight(): number {
        return this._rowHeight;
    }

    cacheWidgets(): void {
        this._cache = this.widgets.map(widget => ({ id: widget.id, column: widget.getColumn(), row: widget.getRow() }));
    }

    restoreWidgets(ignoreActionWidget: boolean = false): void {
        this._cache.filter(widget => !ignoreActionWidget || widget.id !== this._actionWidget.widget.id).forEach(widget => {

            const match = this.widgets.find(wgt => wgt.id === widget.id);

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

        const placeholder = this.placeholder$.getValue();

        // check if there are any widgets under the placeholder
        for (let row = placeholder.row; row < placeholder.row + placeholder.rowSpan; row++) {
            for (let column = placeholder.column; column < placeholder.column + placeholder.columnSpan; column++) {

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
        const unmovedWidgets = widgetsToMove.slice();

        // attempt to move any widgets to the previous widget position
        widgetsToMove.forEach(widget => {

            // get a grid off all occupied spaces - taking into account the placeholder and ignoring widgets that need moved
            const grid = this.getOccupiedSpaces().filter(space => !unmovedWidgets.find(wgt => wgt === space.widget));

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

                // after the shift check if placeholder position is still valid
                this.validatePlaceholderPosition(ActionDirection.Right);
                return;
            }

            // next try moving left
            if (this.canWidgetMoveLeft(widget, true)) {

                // after the shift check if placeholder position is still valid
                this.validatePlaceholderPosition(ActionDirection.Left);
                return;
            }

            // determine the distance that the widget needs to be moved down
            let distance = (this._actionWidget.widget.getRow() - widget.getRow()) + this._actionWidget.widget.getRowSpan();

            // as a last resort move the widget downwards
            this.moveWidgetDown(widget, distance);
        });
    }

    /**
     * After shifts have taken place we should verify the place holder position is still valid
     * @param shiftDirection - the position widgets were shifted
     */
    validatePlaceholderPosition(shiftDirection: ActionDirection) {

        const placeholder = this.placeholder$.getValue();

        // check if the placeholder is over a widget
        if (this.getWidgetsAtPosition(placeholder.column, placeholder.row, true).length > 0) {

            // move the placeholder the opposite direction
            switch (shiftDirection) {

                case ActionDirection.Left:
                    this.setPlaceholderBounds(placeholder.visible, placeholder.x + this.getColumnWidth(), placeholder.y, placeholder.width, placeholder.height);
                    break;

                case ActionDirection.Right:
                    this.setPlaceholderBounds(placeholder.visible, placeholder.x - this.getColumnWidth(), placeholder.y, placeholder.width, placeholder.height);
                    break;
            }

            // validate this new position again
            this.validatePlaceholderPosition(shiftDirection);
        }
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
        const targetSpaces = this.getOccupiedSpaces().filter(space => space.widget === widget).map(space => {
            return { column: space.column - widget.getColumnSpan(), row: space.row, widget: space.widget };
        });

        // check if there are widget in the required positions and if so, can they move right?
        const moveable = targetSpaces.every(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).every(wgt => this.canWidgetMoveLeft(wgt)));

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
        if (widget === this._actionWidget.widget || widget.getColumn() + widget.getColumnSpan() === this.options.columns) {
            return false;
        }

        // find the positions required
        const targetSpaces = this.getOccupiedSpaces().filter(space => space.widget === widget).map(space => {
            return { column: space.column + widget.getColumnSpan(), row: space.row, widget: space.widget };
        });

        // check if there are widget in the required positions and if so, can they move right?
        const moveable = targetSpaces.every(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).every(wgt => this.canWidgetMoveRight(wgt)));

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
        const spaces: DashboardSpace[] = [];

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

        const placeholder = this.placeholder$.getValue();

        // check all spaces the placeholder will occupy and move any widget currently in them down
        for (let column = placeholder.column; column < placeholder.column + placeholder.columnSpan; column++) {
            for (let row = placeholder.row; row < placeholder.row + placeholder.rowSpan; row++) {

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

        const placeholder = this.placeholder$.getValue();

        const rounding = this._actionWidget.direction === ActionDirection.Left ||
            this._actionWidget.direction === ActionDirection.Top ? Rounding.RoundDownBelowHalf : Rounding.RoundUpOverHalf;

        placeholder.visible = visible;

        placeholder.column = this.getPlaceholderColumn(x, width);
        placeholder.row = this.getPlaceholderRow(y, height);
        placeholder.columnSpan = this.getPlaceholderColumnSpan(width);
        placeholder.rowSpan = this.getPlaceholderRowSpan(height);

        // calculate the maximum number of rows
        const rowCount = this.widgets.filter(widget => widget !== this._actionWidget.widget)
            .reduce((previous, widget) => Math.max(widget.getRow() + widget.getRowSpan(), previous), 0);

        // constrain maximum placeholder row
        placeholder.row = Math.min(placeholder.row, rowCount);

        placeholder.x = (placeholder.column * this.getColumnWidth()) + this.options.padding;
        placeholder.y = (placeholder.row * this._rowHeight) + this.options.padding;
        placeholder.width = (placeholder.columnSpan * this.getColumnWidth()) - (this.options.padding * 2);
        placeholder.height = (placeholder.rowSpan * this._rowHeight) - (this.options.padding * 2);

        // set the values of the widget to match the values of the placeholder - however do not render the changes
        this._actionWidget.widget.setColumn(placeholder.column, false);
        this._actionWidget.widget.setRow(placeholder.row, false);
        this._actionWidget.widget.setColumnSpan(placeholder.columnSpan, false);
        this._actionWidget.widget.setRowSpan(placeholder.rowSpan, false);

        // update the placeholder
        this.placeholder$.next(placeholder);
    }

    /**
     * Get the placeholder column position
     */
    getPlaceholderColumn(x: number, width: number): number {

        const column = this.getColumnFromPx(x, this._actionWidget.direction === ActionDirection.Move ? Rounding.RoundUpOverHalf : Rounding.RoundDown);
        const columnSpan = Math.floor(width / this.getColumnWidth());
        const upperLimit = this.getColumnCount() - columnSpan;

        // if we arent dragging left then just return the column
        if (this._actionWidget.direction !== ActionDirection.Left &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.BottomLeft) {
            return Math.max(Math.min(column, upperLimit), 0);
        }

        // get any overflow
        const overflow = width % this.getColumnWidth();

        return (x <= 0 || overflow === 0 || columnSpan === 0 || overflow > (this.getColumnWidth() / 2)) ?
            Math.max(Math.min(column, upperLimit), 0) :
            Math.max(Math.min(column + 1, upperLimit), 0);
    }

    /**
     * Get the column span of the placeholder
     */
    getPlaceholderColumnSpan(width: number): number {

        const columnSpan = this.getColumnFromPx(width);

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
        const overflow = width % this.getColumnWidth();

        return (columnSpan > 0 && overflow > (this.getColumnWidth() / 2)) ? Math.max(columnSpan + 1, 1) : Math.max(columnSpan, 1);
    }

    /**
     * Get the row position of the placeholder
     */
    getPlaceholderRow(y: number, height: number): number {

        const row = this.getRowFromPx(y, this._actionWidget.direction === ActionDirection.Move ? Rounding.RoundUpOverHalf : Rounding.RoundDown);
        const rowSpan = Math.ceil(height / this._rowHeight);

        // if we arent dragging up then just return the row
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight) {
            return Math.max(row, 0);
        }

        // get any overflow
        let overflow = height < this._rowHeight ? 0 : height % this._rowHeight;

        return (y <= 0 || rowSpan === 0 || overflow === 0 || overflow > (this._rowHeight / 2)) ? Math.max(row, 0) : Math.max(row + 1, 0);
    }

    /**
     * Get the row span of the placeholder
     */
    getPlaceholderRowSpan(height: number): number {

        const rowSpan = this.getRowFromPx(height);

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
        const overflow = height % this._rowHeight;

        return (overflow > (this._rowHeight / 2)) ? Math.max(rowSpan + 1, 1) : Math.max(rowSpan, 1);
    }

    getColumnFromPx(x: number, rounding: Rounding = Rounding.RoundDown): number {

        const column = Math.floor(x / Math.floor(this.getColumnWidth()));
        const overflow = (x % Math.floor(this.getColumnWidth()));
        const half = this.getColumnWidth() / 2;

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

        const row = Math.floor(y / Math.floor(this._rowHeight));
        const overflow = (y % Math.floor(this._rowHeight));
        const half = this._rowHeight / 2;

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

        const placeholder = this.placeholder$.getValue();

        // check that we have all the values we need
        if (placeholder.column === undefined || placeholder.row === undefined ||
            placeholder.columnSpan === undefined || placeholder.rowSpan === undefined) {
            return;
        }

        if (this._actionWidget) {
            this._actionWidget.widget.setColumn(placeholder.column);
            this._actionWidget.widget.setRow(placeholder.row);
            this._actionWidget.widget.setColumnSpan(placeholder.columnSpan);
            this._actionWidget.widget.setRowSpan(placeholder.rowSpan);
        }

        // reset all placeholder values
        placeholder.column = undefined;
        placeholder.row = undefined;
        placeholder.columnSpan = undefined;
        placeholder.rowSpan = undefined;

        // emit the new placeholder values
        this.placeholder$.next(placeholder);
    }

    /**
     * Get the current column width
     */
    getColumnWidth(): number {
        return Math.floor(this.columnWidth);
    }

    /**
     * Calculate the number of rows populated with widgets
     */
    getRowCount(): number {
        return this.widgets.reduce((previous, widget) => Math.max(widget.getRow() + widget.getRowSpan(), previous), 0);
    }

    /**
     * Set the height of the dashboard container element
     */
    setDashboardHeight(): void {

        // size the dashboard container to ensure all rows fit
        let rowCount = this.getRowCount();

        // if we should show an empty row increment the row count by 1
        if (this.options.emptyRow) {
            rowCount++;
        }

        this.setDimensions(undefined, rowCount * this._rowHeight);
    }

    /**
     * Orders the z-index of all widgets to move the active one to the front
     * @param widget The widget that should be brought to the front
     */
    bringToFront(widget: DashboardWidgetComponent): void {
        this.widgets.forEach(_widget => _widget === widget ? _widget.bringToFront() : _widget.sendToBack());
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
        this.widgets.forEach(widget => {

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
        return this.stacked ? 1 : this.options.columns;
    }
}

export const defaultOptions: DashboardOptions = { columns: 5, padding: 5, minWidth: 100, minHeight: 100, emptyRow: true };

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
    handle?: HTMLElement;
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
    Top = 0,
    TopRight = 1,
    Right = 2,
    BottomRight = 3,
    Bottom = 4,
    BottomLeft = 5,
    Left = 6,
    TopLeft = 7,
    Move = 8
}

export enum Rounding {
    RoundDown,
    RoundDownBelowHalf,
    RoundUp,
    RoundUpOverHalf
}