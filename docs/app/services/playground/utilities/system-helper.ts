import { DocumentationType } from '../tokens/documentation.token';

export class SystemJSHelper {

    private static _mappings: SystemJSMapping[] = [
        // Angular
        { name: '@angular/core', path: '@angular/core/bundles/core.umd.js' },
        { name: '@angular/common', path: '@angular/common/bundles/common.umd.js' },
        { name: '@angular/compiler', path: '@angular/compiler/bundles/compiler.umd.js' },
        { name: '@angular/forms', path: '@angular/forms/bundles/forms.umd.js' },
        { name: '@angular/router', path: '@angular/router/bundles/router.umd.js' },
        { name: '@angular/common/http', path: '@angular/common/bundles/common-http.umd.js' },
        { name: '@angular/platform-browser', path: '@angular/platform-browser/bundles/platform-browser.umd.js' },
        { name: '@angular/platform-browser/animations', path: '@angular/platform-browser/bundles/platform-browser-animations.umd.js' },
        { name: '@angular/platform-browser-dynamic', path: '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js' },
        { name: '@angular/upgrade/static', path: '@angular/upgrade/bundles/upgrade-static.umd.js' },
        { name: '@angular/animations', path: '@angular/animations/bundles/animations.umd.js' },
        { name: '@angular/animations/browser', path: '@angular/animations/bundles/animations-browser.umd.js' },
        // Angular CDK
        { name: '@angular/cdk/a11y', path: '@angular/cdk@6.4.7/bundles/cdk-a11y.umd.js' },
        { name: '@angular/cdk/accordion', path: '@angular/cdk@6.4.7/bundles/cdk-accordion.umd.js' },
        { name: '@angular/cdk/bidi', path: '@angular/cdk@6.4.7/bundles/cdk-bidi.umd.js' },
        { name: '@angular/cdk/coercion', path: '@angular/cdk@6.4.7/bundles/cdk-coercion.umd.js' },
        { name: '@angular/cdk/collections', path: '@angular/cdk@6.4.7/bundles/cdk-collections.umd.js' },
        { name: '@angular/cdk/keycodes', path: '@angular/cdk@6.4.7/bundles/cdk-keycodes.umd.js' },
        { name: '@angular/cdk/layout', path: '@angular/cdk@6.4.7/bundles/cdk-layout.umd.js' },
        { name: '@angular/cdk/observers', path: '@angular/cdk@6.4.7/bundles/cdk-observers.umd.js' },
        { name: '@angular/cdk/overlay', path: '@angular/cdk@6.4.7/bundles/cdk-overlay.umd.js' },
        { name: '@angular/cdk/platform', path: '@angular/cdk@6.4.7/bundles/cdk-platform.umd.js' },
        { name: '@angular/cdk/portal', path: '@angular/cdk@6.4.7/bundles/cdk-portal.umd.js' },
        { name: '@angular/cdk/scrolling', path: '@angular/cdk@6.4.7/bundles/cdk-scrolling.umd.js' },
        { name: '@angular/cdk/stepper', path: '@angular/cdk@6.4.7/bundles/cdk-stepper.umd.js' },
        { name: '@angular/cdk/table', path: '@angular/cdk@6.4.7/bundles/cdk-table.umd.js' },
        { name: '@angular/cdk/text-field', path: '@angular/cdk@6.4.7/bundles/cdk-text-field.umd.js' },
        // Dependencies
        { name: 'tslib', path: 'tslib@1.7.1' },
        { name: 'rxjs', path: 'rxjs@6.5.2' },
        { name: 'rxjs-compat', path: 'rxjs-compat@6.5.2' },
        { name: 'ngx-bootstrap', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'chance', path: 'chance' },
        { name: 'chart.js', path: 'chart.js/dist/Chart.bundle.min.js' },
        { name: 'ng2-charts', path: 'ng2-charts@1.6.0/charts/charts.js' },
        { name: 'ng2-file-upload', path: 'ng2-file-upload/bundles/ng2-file-upload.umd.js' },
        { name: 'angular-split', path: 'angular-split@1.0.0-rc.3/bundles/angular-split.umd.js' },
        { name: 'dragula', path: 'dragula/dist/dragula.js' },
        { name: 'dragula/dist/dragula', path: 'dragula/dist/dragula.js' },
        { name: 'ngx-mask', path: 'ngx-mask/bundles/ngx-mask.umd.js' },
        { name: 'resize-observer-polyfill', path: 'resize-observer-polyfill@1.5.0/dist/ResizeObserver.js' },
        // d3
        { name: 'd3', path: 'd3@5.9.2' },
        { name: 'd3-array', path: 'd3@5.9.2' },
        { name: 'd3-axis', path: 'd3@5.9.2' },
        { name: 'd3-brush', path: 'd3@5.9.2' },
        { name: 'd3-chord', path: 'd3@5.9.2' },
        { name: 'd3-collection', path: 'd3@5.9.2' },
        { name: 'd3-color', path: 'd3@5.9.2' },
        { name: 'd3-contour', path: 'd3@5.9.2' },
        { name: 'd3-dispatch', path: 'd3@5.9.2' },
        { name: 'd3-drag', path: 'd3@5.9.2' },
        { name: 'd3-dsv', path: 'd3@5.9.2' },
        { name: 'd3-ease', path: 'd3@5.9.2' },
        { name: 'd3-fetch', path: 'd3@5.9.2' },
        { name: 'd3-force', path: 'd3@5.9.2' },
        { name: 'd3-format', path: 'd3@5.9.2' },
        { name: 'd3-geo', path: 'd3@5.9.2' },
        { name: 'd3-hierarchy', path: 'd3@5.9.2' },
        { name: 'd3-interpolate', path: 'd3@5.9.2' },
        { name: 'd3-path', path: 'd3@5.9.2' },
        { name: 'd3-polygon', path: 'd3@5.9.2' },
        { name: 'd3-quadtree', path: 'd3@5.9.2' },
        { name: 'd3-random', path: 'd3@5.9.2' },
        { name: 'd3-scale', path: 'd3@5.9.2' },
        { name: 'd3-scale-chromatic', path: 'd3@5.9.2' },
        { name: 'd3-selection', path: 'd3@5.9.2' },
        { name: 'd3-shape', path: 'd3@5.9.2' },
        { name: 'd3-time', path: 'd3@5.9.2' },
        { name: 'd3-time-format', path: 'd3@5.9.2' },
        { name: 'd3-timer', path: 'd3@5.9.2' },
        { name: 'd3-transition', path: 'd3@5.9.2' },
        { name: 'd3-voronoi', path: 'd3@5.9.2' },
        { name: 'd3-zoom', path: 'd3@5.9.2' },
        // ngx-bootstrap
        { name: 'ngx-bootstrap/accordion', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'ngx-bootstrap/alert', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'ngx-bootstrap/buttons', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'ngx-bootstrap/carousel', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'ngx-bootstrap/collapse', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'ngx-bootstrap/component-loader', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'ngx-bootstrap/datepicker', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'ngx-bootstrap/dropdown', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'ngx-bootstrap/modal', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'ngx-bootstrap/pagination', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'ngx-bootstrap/popover', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'ngx-bootstrap/positioning', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'ngx-bootstrap/progressbar', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'ngx-bootstrap/rating', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'ngx-bootstrap/sortable', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'ngx-bootstrap/tabs', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'ngx-bootstrap/timepicker', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'ngx-bootstrap/tooltip', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
        { name: 'ngx-bootstrap/typeahead', path: 'ngx-bootstrap@2.0.5/bundles/ngx-bootstrap.umd.min.js' },
    ];

    static getSystemJSConfig(documentationType: DocumentationType, assetsUrl: string): string {
        return `System.config(${JSON.stringify(this.getConfig(documentationType, assetsUrl), null, 4)});`;
    }

    static getPackageUrl(mapping: SystemJSMapping): string {
        return `https://unpkg.com/${mapping.path}`;
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
        mappings['@ux-aspects/ux-aspects'] = `${assetsUrl}/lib/index.js`;

        if (documentationType === DocumentationType.MicroFocus) {
            mappings['@micro-focus/ux-aspects'] = `${assetsUrl}/lib/ux-aspects-micro-focus.js`;
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