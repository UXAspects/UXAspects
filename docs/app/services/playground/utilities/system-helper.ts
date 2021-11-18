import { DocumentationType } from '../tokens/documentation.token';

const ANGULAR_VERSION = '13';
const CDK_VERSION = '13';
const D3_VERSION = '5.9.2';
const NGX_BOOTSTRAP_VERSION = '6.2.0';

export class SystemJSHelper {

    private static _mappings: SystemJSMapping[] = [
        // Angular
        { name: '@angular/core', path: `@angular/core@${ ANGULAR_VERSION }/fesm2015/core.mjs` },
        { name: '@angular/common', path: `@angular/common@${ ANGULAR_VERSION }/fesm2015/common.mjs` },
        { name: '@angular/compiler', path: `@angular/compiler@${ ANGULAR_VERSION }/fesm2015/compiler.mjs` },
        { name: '@angular/forms', path: `@angular/forms@${ ANGULAR_VERSION }/fesm2015/forms.mjs` },
        { name: '@angular/router', path: `@angular/router@${ ANGULAR_VERSION }/fesm2015/router.mjs` },
        { name: '@angular/common/http', path: `@angular/common@${ ANGULAR_VERSION }/fesm2015/http.mjs` },
        {
            name: '@angular/platform-browser',
            path: `@angular/platform-browser@${ ANGULAR_VERSION }/fesm2015/platform-browser.mjs`
        },
        {
            name: '@angular/platform-browser/animations',
            path: `@angular/platform-browser@${ ANGULAR_VERSION }/fesm2015/animations.mjs`
        },
        {
            name: '@angular/platform-browser-dynamic',
            path: `@angular/platform-browser-dynamic@${ ANGULAR_VERSION }/fesm2015/platform-browser-dynamic.mjs`
        },
        { name: '@angular/upgrade/static', path: `@angular/upgrade@${ ANGULAR_VERSION }/fesm2015/upgrade-static.mjs` },
        { name: '@angular/animations', path: `@angular/animations@${ ANGULAR_VERSION }/fesm2015/animations.mjs` },
        {
            name: '@angular/animations/browser',
            path: `@angular/animations@${ ANGULAR_VERSION }/fesm2015/browser.mjs`
        },
        // Angular CDK
        { name: '@angular/cdk/a11y', path: `@angular/cdk@${ CDK_VERSION }/fesm2015/a11y.mjs` },
        { name: '@angular/cdk/accordion', path: `@angular/cdk@${ CDK_VERSION }/fesm2015/accordion.mjs` },
        { name: '@angular/cdk/bidi', path: `@angular/cdk@${ CDK_VERSION }/fesm2015/bidi.mjs` },
        { name: '@angular/cdk/coercion', path: `@angular/cdk@${ CDK_VERSION }/fesm2015/coercion.mjs` },
        { name: '@angular/cdk/collections', path: `@angular/cdk@${ CDK_VERSION }/fesm2015/collections.mjs` },
        { name: '@angular/cdk/drag-drop', path: `@angular/cdk@${ CDK_VERSION }/fesm2015/drag-drop.mjs` },
        { name: '@angular/cdk/keycodes', path: `@angular/cdk@${ CDK_VERSION }/fesm2015/keycodes.mjs` },
        { name: '@angular/cdk/layout', path: `@angular/cdk@${ CDK_VERSION }/fesm2015/layout.mjs` },
        { name: '@angular/cdk/observers', path: `@angular/cdk@${ CDK_VERSION }/fesm2015/observers.mjs` },
        { name: '@angular/cdk/overlay', path: `@angular/cdk@${ CDK_VERSION }/fesm2015/overlay.mjs` },
        { name: '@angular/cdk/platform', path: `@angular/cdk@${ CDK_VERSION }/fesm2015/platform.mjs` },
        { name: '@angular/cdk/portal', path: `@angular/cdk@${ CDK_VERSION }/fesm2015/portal.mjs` },
        { name: '@angular/cdk/scrolling', path: `@angular/cdk@${ CDK_VERSION }/fesm2015/scrolling.mjs` },
        { name: '@angular/cdk/stepper', path: `@angular/cdk@${ CDK_VERSION }/fesm2015/stepper.mjs` },
        { name: '@angular/cdk/table', path: `@angular/cdk@${ CDK_VERSION }/fesm2015/table.mjs` },
        { name: '@angular/cdk/text-field', path: `@angular/cdk@${ CDK_VERSION }/fesm2015/text-field.mjs` },
        { name: '@angular/cdk/tree', path: `@angular/cdk@${ CDK_VERSION }/fesm2015/tree.mjs` },
        // Dependencies
        { name: 'tslib', path: 'tslib@1.11.0' },
        { name: 'rxjs', path: 'rxjs@6.6.0' },
        { name: 'ngx-bootstrap', path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/bundles/ngx-bootstrap.umd.min.js` },
        { name: 'chance', path: 'chance' },
        { name: 'chart.js', path: 'chart.js@2.9.3/dist/Chart.bundle.min.js' },
        { name: 'ng2-charts', path: 'ng2-charts@2.3.0/bundles/ng2-charts.umd.js' },
        { name: 'lodash', path: 'lodash/lodash.js' },
        { name: 'ng2-file-upload', path: 'ng2-file-upload/bundles/ng2-file-upload.umd.js' },
        { name: 'angular-split', path: 'angular-split@3.0.2/bundles/angular-split.umd.js' },
        { name: 'ngx-mask', path: 'ngx-mask/bundles/ngx-mask.umd.js' },
        { name: '@juggle/resize-observer', path: '@juggle/resize-observer@3.3.1/lib/exports/resize-observer.umd.js' },
        // d3
        { name: 'd3', path: `d3@${ D3_VERSION }` },
        { name: 'd3-array', path: `d3@${ D3_VERSION }` },
        { name: 'd3-axis', path: `d3@${ D3_VERSION }` },
        { name: 'd3-brush', path: `d3@${ D3_VERSION }` },
        { name: 'd3-chord', path: `d3@${ D3_VERSION }` },
        { name: 'd3-collection', path: `d3@${ D3_VERSION }` },
        { name: 'd3-color', path: `d3@${ D3_VERSION }` },
        { name: 'd3-contour', path: `d3@${ D3_VERSION }` },
        { name: 'd3-dispatch', path: `d3@${ D3_VERSION }` },
        { name: 'd3-drag', path: `d3@${ D3_VERSION }` },
        { name: 'd3-dsv', path: `d3@${ D3_VERSION }` },
        { name: 'd3-ease', path: `d3@${ D3_VERSION }` },
        { name: 'd3-fetch', path: `d3@${ D3_VERSION }` },
        { name: 'd3-force', path: `d3@${ D3_VERSION }` },
        { name: 'd3-format', path: `d3@${ D3_VERSION }` },
        { name: 'd3-geo', path: `d3@${ D3_VERSION }` },
        { name: 'd3-hierarchy', path: `d3@${ D3_VERSION }` },
        { name: 'd3-interpolate', path: `d3@${ D3_VERSION }` },
        { name: 'd3-path', path: `d3@${ D3_VERSION }` },
        { name: 'd3-polygon', path: `d3@${ D3_VERSION }` },
        { name: 'd3-quadtree', path: `d3@${ D3_VERSION }` },
        { name: 'd3-random', path: `d3@${ D3_VERSION }` },
        { name: 'd3-scale', path: `d3@${ D3_VERSION }` },
        { name: 'd3-scale-chromatic', path: `d3@${ D3_VERSION }` },
        { name: 'd3-selection', path: `d3@${ D3_VERSION }` },
        { name: 'd3-shape', path: `d3@${ D3_VERSION }` },
        { name: 'd3-time', path: `d3@${ D3_VERSION }` },
        { name: 'd3-time-format', path: `d3@${ D3_VERSION }` },
        { name: 'd3-timer', path: `d3@${ D3_VERSION }` },
        { name: 'd3-transition', path: `d3@${ D3_VERSION }` },
        { name: 'd3-voronoi', path: `d3@${ D3_VERSION }` },
        { name: 'd3-zoom', path: `d3@${ D3_VERSION }` },
        // ngx-bootstrap
        {
            name: 'ngx-bootstrap/accordion',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/accordion/bundles/ngx-bootstrap-accordion.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/alert',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/alert/bundles/ngx-bootstrap-alert.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/buttons',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/buttons/bundles/ngx-bootstrap-buttons.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/carousel',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/carousel/bundles/ngx-bootstrap-carousel.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/chronos',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/chronos/bundles/ngx-bootstrap-chronos.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/collapse',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/collapse/bundles/ngx-bootstrap-collapse.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/component-loader',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/component-loader/bundles/ngx-bootstrap-component-loader.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/datepicker',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/datepicker/bundles/ngx-bootstrap-datepicker.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/dropdown',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/dropdown/bundles/ngx-bootstrap-dropdown.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/locale',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/locale/bundles/ngx-bootstrap-locale.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/mini-ngrx',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/mini-ngrx/bundles/ngx-bootstrap-mini-ngrx.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/modal',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/modal/bundles/ngx-bootstrap-modal.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/pagination',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/pagination/bundles/ngx-bootstrap-pagination.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/popover',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/popover/bundles/ngx-bootstrap-popover.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/positioning',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/positioning/bundles/ngx-bootstrap-positioning.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/progressbar',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/progressbar/bundles/ngx-bootstrap-progressbar.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/rating',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/rating/bundles/ngx-bootstrap-rating.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/sortable',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/sortable/bundles/ngx-bootstrap-sortable.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/tabs',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/tabs/bundles/ngx-bootstrap-tabs.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/timepicker',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/timepicker/bundles/ngx-bootstrap-timepicker.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/tooltip',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/tooltip/bundles/ngx-bootstrap-tooltip.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/typeahead',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/typeahead/bundles/ngx-bootstrap-typeahead.umd.min.js`
        },
        {
            name: 'ngx-bootstrap/utils',
            path: `ngx-bootstrap@${ NGX_BOOTSTRAP_VERSION }/utils/bundles/ngx-bootstrap-utils.umd.min.js`
        },
    ];

    static getSystemJSConfig(documentationType: DocumentationType, assetsUrl: string): string {
        return `System.config(${ JSON.stringify(this.getConfig(documentationType, assetsUrl), null, 4) });`;
    }

    static getPackageUrl(mapping: SystemJSMapping): string {
        return `https://unpkg.com/${ mapping.path }`;
    }

    private static getConfig(documentationType: DocumentationType, assetsUrl: string): SystemJSConfig {
        // create a new config
        return {
            transpiler: 'typescript',
            typescriptOptions: {
                emitDecoratorMetadata: true
            },
            map: this.getPackageMappings(documentationType, assetsUrl),
            packages: this.getPackageConfig()
        } as SystemJSConfig;
    }

    private static getPackageMappings(documentationType: DocumentationType, assetsUrl: string): { [library: string]: string } {
        // create a new list of mappings
        const mappings: { [library: string]: string } = {};

        // add in the UX Aspects packages
        mappings['@ux-aspects/ux-aspects'] = `${ assetsUrl }/lib/index.js`;

        if (documentationType === DocumentationType.MicroFocus) {
            mappings['@micro-focus/ux-aspects'] = `${ assetsUrl }/lib/ux-aspects-micro-focus.js`;
        }

        // add all external libraries
        this._mappings.forEach(mapping => mappings[mapping.name] = this.getPackageUrl(mapping));

        return mappings;
    }

    private static getPackageConfig(): { [key: string]: SystemJSPackage } {
        return {
            '.': {
                defaultExtension: 'ts'
            },
            'vendor': {
                defaultExtension: 'js'
            },
            'rxjs': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            'rxjs/operators': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            'rxjs/internal-compatibility': {
                main: 'index.js',
                defaultExtension: 'js'
            }
        };
    }

}

export interface SystemJSConfig {
    transpiler: string;
    typescriptOptions: {
        emitDecoratorMetadata: boolean;
    };
    map: { [library: string]: string };
    packages: { [key: string]: SystemJSPackage };
}

export interface SystemJSPackage {
    main?: string;
    defaultExtension: string;
}

export interface SystemJSMapping {
    name: string;
    path: string;
}
