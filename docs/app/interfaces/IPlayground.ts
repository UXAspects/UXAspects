export interface IPlayground {
    framework?: 'angular' | 'css';
    files: {
        [key: string]: string;
    };
    modules?: IPlaygroundModule[];
}

export interface IPlaygroundModule {
    imports?: string | string[];
    providers?: string | string[];
    library?: string;
    importAs?: boolean;
    declaration?: boolean;
    forRoot?: boolean;
}
