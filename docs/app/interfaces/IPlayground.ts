export interface IPlayground {
    framework?: 'angular' | 'css';
    files: {
        [key: string]: string;
    };
    modules?: IPlaygroundModule[];
}

export interface IPlaygroundModule {
    imports?: string | string[];
    importsWithProviders?: string | string[];
    providers?: string[];
    library?: string;
    importAs?: boolean;
    declaration?: boolean;
    forRoot?: boolean;
}
