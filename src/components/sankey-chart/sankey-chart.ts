import { sum } from 'd3';
import { SankeyLink, SankeyLinkPlot } from './interfaces/link.interface';
import { SankeyNodeLink } from './interfaces/node-link.interface';
import { SankeyNode } from './interfaces/node.interface';

export class SankeyChart<T> {

    /** Define the nodes in the chart */
    private _nodes: ReadonlyArray<SankeyNode<T>> = [];

    /** Define the links in the chart */
    private _links: ReadonlyArray<SankeyLink> = [];

    /** Store the node-links */
    private _nodeLinks: ReadonlyArray<SankeyNodeLink<T>> = [];

    /** Define the minimum width of the nodes */
    private _minWidth: number = 0;

    /** Define the maximum width of the nodes */
    private _maxWidth: number = Infinity;

    /** The minimum height of a node. */
    private _minHeight: number;

    /** Define the width of the chart */
    private _width: number;

    /** Define the height of the chart */
    private _height: number;

    /** Define the vertical padding between nodes */
    private _spacing: number;

    /** Define the minimum distance from the edge of the chart */
    private _padding: number = 24;

    /** Define the spacing of the chart */
    spacing(spacing: number): this {
        this._spacing = spacing;
        return this;
    }

    /** Define the width of the chart */
    width(width: number): this {
        this._width = width;
        return this;
    }

    /** Define the height of the chart */
    height(height: number): this {
        this._height = height;
        return this;
    }

    /** Define the nodes */
    nodes(nodes: ReadonlyArray<SankeyNode<T>>): this {
        this._nodes = nodes;
        return this;
    }

    /** Define the links */
    links(links: ReadonlyArray<SankeyLink>): this {
        this._links = links;
        return this;
    }

    /** Define the minimum and maximum size of the nodes */
    size(minWidth: number, maxWidth: number, minHeight: number): this {
        this._minWidth = minWidth;
        this._maxWidth = maxWidth;
        this._minHeight = minHeight;
        return this;
    }

    /** Get the sizes of each column */
    columns(): number[] {

        // get the number of columns - we use this a lot so avoid multiple function calls
        const columnCount = this.getColumnCount();

        // get the amount of padding there should be on each side of a node
        const padding = this.getColumnPadding();

        const columnWidths: number[] = [];

        for (let idx = 0; idx < columnCount; idx++) {
            columnWidths[idx] = this.getNodeWidth() + (padding * 2);

            // do no have the default padding on the left of the start node
            // or right of the last node, instead have a default padding
            if (idx === 0 || idx === columnCount - 1) {
                columnWidths[idx] -= (padding - this._padding);
            }
        }

        return columnWidths;
    }

    /**
     * Perform the various stages of the layout
     * in the correct order as some steps are dependant
     * on the previous layout stages.
     */
    layout(): ReadonlyArray<SankeyNodeLink<T>> {
        this.getNodeLinks();
        this.getNodeValues();
        this.getNodeColumns();
        this.getNodeWidths();
        this.getNodeHeights();
        this.getNodePositions();
        this.getLinkPlots();
        return this._nodeLinks;
    }

    /** The curve equation for links */
    link(link: SankeyLink & SankeyLinkPlot): string {

        // const dist = chart.blockSpacing / 2;
        const { topLeft, topRight, bottomLeft, bottomRight } = link;
        const dist = (topRight[0] - topLeft[0]) / 2;

        const topLeftCurve = [topLeft[0] + dist, topLeft[1]];
        const topRightCurve = [topRight[0] - dist, topRight[1]];
        const bottomLeftCurve = [bottomLeft[0] + dist, bottomLeft[1]];
        const bottomRightCurve = [bottomRight[0] - dist, bottomRight[1]];

        return 'M' + topLeft[0] + ',' + topLeft[1] +
            'C' + topLeftCurve[0] + ',' + topLeftCurve[1] +
            ' ' + topRightCurve[0] + ',' + topRightCurve[1] +
            ' ' + topRight[0] + ',' + topRight[1] +
            'L' + bottomRight[0] + ',' + bottomRight[1] +
            'C' + bottomRightCurve[0] + ',' + bottomRightCurve[1] +
            ' ' + bottomLeftCurve[0] + ',' + bottomLeftCurve[1] +
            ' ' + bottomLeft[0] + ',' + bottomLeft[1] +
            'L' + topLeft[0] + ',' + topLeft[1];
    }

    getFalloffPath(nodeLink: SankeyNodeLink<T>): string {
        const x = (nodeLink.x + nodeLink.width);
        const y = nodeLink.outputs.reduce((bottom, output) => Math.max(bottom, output.bottomLeft[1]), 0);
        const width = 20;
        const radius = 6;
        const height = (nodeLink.y + nodeLink.height - y) + (this._spacing / 2);

        return 'M' + x + ',' + y +
            'h ' + (width - radius) +
            'a' + radius + ',' + radius + ' 0 0,1' +
            (radius) + ',' + (radius) + ' ' +
            'v' + Math.max(radius, height) + 'h-' + width + 'Z';
    }

    /**
     * Get a `SankeyNodeLink` object from the id of a node
     */
    getNodeLink(id: string | number): SankeyNodeLink<T> {
        return this._nodeLinks.find(nodeLink => nodeLink.node.id === id);
    }

    /** Replace the node ids with actual references */
    private getNodeLinks(): void {
        this._nodeLinks = this._nodes.map(node => {
            // get all the links that input into and output from this node
            const inputs = this._links.filter(link => link.target === node.id);
            const outputs = this._links.filter(link => link.source === node.id);

            return { node, inputs, outputs, value: 0, column: 0, x: 0, y: 0, width: 0, height: 0, naturalHeight: 0, falloff: 0, active: false, focus: false } as SankeyNodeLink<T>;
        });
    }

    /** Get the value for the node based on all its inputs and outputs */
    private getNodeValues(): void {
        for (const node of this._nodeLinks) {
            // the node value can be determined by the total values from all inputs
            // however the first column of nodes have no inputs so must be based of their outputs.
            // We should take the maximum value based on the inputs and outputs as nodes that are
            // not in the first column may not output all of the amount the receive from inputs,
            // for example in the case of falloff etc..
            node.value = Math.max(
                sum(node.inputs, input => input.value),
                sum(node.outputs, output => output.value)
            );
        }
    }

    /**
     * We need to determine which column the node should
     * be placed in. This is determined by taking the input
     * and adding one.
     */
    private getNodeColumns(nodeLinks: SankeyNodeLink<T>[] = this._nodeLinks.filter(node => node.inputs.length === 0), column: number = 0): void {
        for (const nodeLink of nodeLinks) {
            nodeLink.column = column;

            // call this function to all output links
            this.getNodeColumns(nodeLink.outputs.map(output => this.getNodeLink(output.target)), column + 1);
        }
    }

    /** Get the width of each node */
    private getNodeWidths(): void {
        this._nodeLinks.forEach(node => node.width = this.getNodeWidth());
    }

    /**
     * Scale the nodes height based on the value the represent
     */
    private getNodeHeights(): void {

        // get columns by group
        const groups = this.getColumnGroups();
        const groupList = Object.keys(groups).map<SankeyNodeLink<T>[]>(group => groups[group]);

        // get the column with the largest total value
        const total = groupList.reduce(
            (count, nodes) => Math.max(count, nodes.reduce((accumulation, node) => accumulation + node.value, 0)),
            0
        );

        // Calculate node heights
        for (const nodeLinks of groupList) {

            // get the proportional size of each node based on the available space
            for (const nodeLink of nodeLinks) {
                nodeLink.naturalHeight = ((nodeLink.value / total) * this._height) - this._spacing;
                nodeLink.height = Math.max(nodeLink.naturalHeight, this._minHeight);
            }
        }

        // If minHeight is defined, it might cause some columns to exceed the height of the chart following the
        // initial height calculation.
        if (this._minHeight > 0) {

            try {
                // Recalculate node heights until they fit (if possible)
                this.adjustNodeHeightsToFit(groupList);
            } catch (error) {
                // If the above recalculation fails, give up and use the naturalHeight (ignore minHeight)
                this.setNodesToNaturalHeight(groupList);
            }
        }
    }

    /**
     * Recalculate node heights within height limits until they fit (if possible).
     * @throws If it is not possible to fit all nodes in the chart due to `minHeight`.
     */
    private adjustNodeHeightsToFit(groupList: SankeyNodeLink<T>[][]) {

        let largestColumn = this.getLargestColumn(groupList);

        while (largestColumn.height > this._height) {

            // Get the list of nodes whose height cannot be reduced
            const fixedNodes = largestColumn.nodes.filter(nodeLink => nodeLink.height <= this._minHeight);

            // Get the total height in the column which cannot shrink (including spacing)
            const fixedHeight = fixedNodes.length * this._minHeight + largestColumn.nodes.length * this._spacing;

            // If the unshrinkable height is greater than the available height, we can't continue
            if (fixedHeight > this._height) {
                throw new Error(`Cannot fit data into chart with minHeight = ${this._minHeight}px (need ${fixedHeight}px; ${this._height}px available)`);
            }

            // Find the amount of height which can potentially be reduced
            const flexibleHeight = largestColumn.height - fixedHeight;

            // Find the amount of height that the above needs to fit into
            const availableHeight = this._height - fixedHeight;

            // Get the multiplier to reduce the nodes in order to fit the available height
            const ratio = availableHeight / flexibleHeight;

            // Adjust the nodes and reapply the minHeight
            for (const group of groupList) {
                for (const nodeLink of group) {
                    if (nodeLink.height > this._minHeight) {
                        nodeLink.height *= ratio;
                    }
                    if (nodeLink.height < this._minHeight) {
                        nodeLink.height = this._minHeight;
                    }
                }
            }

            largestColumn = this.getLargestColumn(groupList);
        }
    }

    /** Set all nodes height to be the same as the naturalHeight. */
    private setNodesToNaturalHeight(groupList: SankeyNodeLink<T>[][]) {
        for (const group of groupList) {
            for (const nodeLink of group) {
                nodeLink.height = nodeLink.naturalHeight;
            }
        }
    }

    /**
     * Get all nodes grouped in their corresponding columns
     */
    private getColumnGroups(): { [key: number]: SankeyNodeLink<T>[] } {
        // group nodes by columns
        return this._nodeLinks.reduce<{ [key: number]: SankeyNodeLink<T>[] }>((collection, nodeLink) => {
            collection[nodeLink.column] = collection[nodeLink.column] || [];
            collection[nodeLink.column].push(nodeLink);
            return collection;
        }, {});
    }

    /**
     * Get the number of columns
     */
    private getColumnCount(): number {
        return this._nodeLinks.reduce((column, nodeLink) => Math.max(nodeLink.column + 1, column), 0);
    }

    /**
     * Position the nodes in their corresponding x and y positions
     */
    private getNodePositions(): void {

        // get all nodes by group
        const groups = this.getColumnGroups();

        // get the amount of padding required between each item
        const padding = this.getColumnPadding();

        for (const nodeLink of this._nodeLinks) {
            // get the x position based on the column
            nodeLink.x = this.getColumnPosition(nodeLink.column) + padding;

            if (nodeLink.column === 0) {
                nodeLink.x = this._padding;
            }

            // get the y position based on the accumulative height of the nodes above it
            nodeLink.y = groups[nodeLink.column]
                .slice(0, groups[nodeLink.column].indexOf(nodeLink))
                .reduce((top, _node) => top + _node.height, 0) + (this._spacing * groups[nodeLink.column].indexOf(nodeLink));
        }
    }

    private getColumnPadding(): number {
        // get the number of columns - we use this a lot so avoid multiple function calls
        const columnCount = this.getColumnCount();

        // get the chart width minus the width of the nodes
        const width = (this._width - (columnCount * this.getNodeWidth())) - (this._padding * 2);

        // get the total amount of places requiring padding (the first and last columns only have padding on one side)
        const paddingCount = Math.max(((columnCount * 2) - 2), 0);

        // get the actual size of the padding
        return width / paddingCount;
    }

    private getLinkPlots(): void {

        for (const nodeLink of this._nodeLinks) {

            let inputY: number = nodeLink.y;

            // process each input link
            for (const link of nodeLink.inputs) {
                link.topRight = [nodeLink.x, inputY];
                inputY += ((link.value / nodeLink.value) * nodeLink.height);
                link.bottomRight = [nodeLink.x, inputY];
            }

            let outputValue: number = 0;
            let outputY: number = nodeLink.y;

            // process each output link
            for (const link of nodeLink.outputs) {
                link.topLeft = [nodeLink.x + nodeLink.width, outputY];
                outputY += ((link.value / nodeLink.value) * nodeLink.height);
                link.bottomLeft = [nodeLink.x + nodeLink.width, outputY];

                outputValue += link.value;
            }

            // determine how much falloff there is
            nodeLink.falloff = nodeLink.value - outputValue;
        }
    }

    /** Determine the position at which a column starts */
    private getColumnPosition(column: number): number {
        // the position is the acculation of the widths of all previous columns
        return this.columns().splice(0, column).reduce((total, width) => total + width, 0);
    }

    /** Get the pixel width of a node */
    private getNodeWidth(): number {
        const width = (this._width - (this._padding * 2)) / ((this.getColumnCount() * 2) - 1);
        return Math.min(this._maxWidth, Math.max(this._minWidth, width));
    }

    /** Get the column with the greatest height (along with its height) */
    private getLargestColumn(groupList: SankeyNodeLink<T>[][]): ColumnWithHeight<T> {

        let largestColumn = null;
        let largestColumnHeight = 0;

        for (const group of groupList) {
            let totalHeight = group.reduce((acc, node) => acc += node.height, 0) + group.length * this._spacing;
            if (totalHeight > largestColumnHeight) {
                largestColumnHeight = totalHeight;
                largestColumn = group;
            }
        }

        return {
            nodes: largestColumn,
            height: largestColumnHeight
        };
    }
}

interface ColumnWithHeight<T> {
    nodes: SankeyNodeLink<T>[];
    height: number;
}
