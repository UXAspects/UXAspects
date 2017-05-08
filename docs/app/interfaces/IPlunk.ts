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
    }[];
    mappings?: {
        alias: string;
        source: string;
    }[];
}

export const MAPPINGS = {
    NgxBootstrap: {
        alias: 'ngx-bootstrap',
        source: 'https://unpkg.com/ngx-bootstrap'
    }
};