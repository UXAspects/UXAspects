export interface IPlunk {
    files: {
        [key: string]: string;
    };
    modules?: {
        imports?: string[];
        library?: string;
        map?: {
            alias: string;
            source: string;
        };
    };  
}