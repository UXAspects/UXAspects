export interface IPlunk {
    files: {
        [key: string]: string;
    };
    modules?: {
        imports?: string | string[];
        providers?: string | string[];
        library?: string;
        importAs?: boolean;
        declaration?: boolean;
        forRoot?: boolean;
    }[];
}