export interface ConduitProperties {
    id: number | string;
    acceptsInput?: boolean | string[];
    producesOutput?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    changeDetection?: (x: any, y: any) => boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map?: any;
}

export const defaultConduitProps: Partial<ConduitProperties> = {
    acceptsInput: true,
    producesOutput: true,
};
