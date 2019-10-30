import { SankeyLink, SankeyLinkInteraction, SankeyLinkPlot } from './link.interface';
import { SankeyNode } from './node.interface';

/**
 * This data structure represents the node
 * combined with all the the input and output
 * links that flow to and from it.
 */
export interface SankeyNodeLink<T> {
    node: SankeyNode<T>;
    value: number;
    falloff: number;
    column: number;
    x: number;
    y: number;
    width: number;
    height: number;
    naturalHeight: number;
    active: boolean;
    focus: boolean;
    inputs: ReadonlyArray<SankeyLink & SankeyLinkPlot & SankeyLinkInteraction>;
    outputs: ReadonlyArray<SankeyLink & SankeyLinkPlot & SankeyLinkInteraction>;
}
