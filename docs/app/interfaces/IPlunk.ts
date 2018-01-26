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
    mappings?: {
        alias: string;
        source: string;
    }[];
    routes?: {
        path: string;
        pathMatch?: string;
        component: string
    }[];
}

export const MAPPINGS = {
    NgxBootstrap: {
        alias: 'ngx-bootstrap',
        source: 'https://unpkg.com/ngx-bootstrap'
    },
    Chance: {
        alias: 'chance',
        source: 'npm:chance@1.0.6'
    },
    ChartJs: {
        alias: 'chart.js',
        source: 'https://unpkg.com/chart.js@2.5.0/dist/Chart.min.js'
    },
    Ng2Charts: {
        alias: 'ng2-charts',
        source: 'https://unpkg.com/ng2-charts@1.5.0/bundles/ng2-charts.umd.min.js'
    }
};