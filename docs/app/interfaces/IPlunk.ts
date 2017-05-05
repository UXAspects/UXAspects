export interface IPlunk {
    files: {
        [key: string]: string;
    };
    modules?: {
        imports?: string | string[];
        library?: string;
        importAs?: boolean;
        declaration?: boolean;
    }[];
    mappings?: {
        alias: string;
        source: string;
    }[];
}