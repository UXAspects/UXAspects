export interface IPlunk {
    files: {
        [key: string]: string;
    };
    modules?: {
        imports?: string[];
        library?: string;
    }[];
    mappings?: {
        alias: string;
        source: string;
    }[];
}