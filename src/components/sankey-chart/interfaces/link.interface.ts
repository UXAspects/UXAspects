export interface SankeyLink {
    source: number | string;
    target: number | string;
    value: number;
}

export interface SankeyLinkPlot {
    topLeft?: [number, number];
    topRight?: [number, number];
    bottomLeft?: [number, number];
    bottomRight?: [number, number];
}

export interface SankeyLinkInteraction {
    active?: boolean;
    focus?: boolean;
}
