import { IPlayground } from '../../../interfaces/IPlayground';
import { DocumentationType } from '../tokens/documentation.token';
import { SystemJSHelper } from '../utilities/system-helper';
import { PlaygroundStrategy } from './playground-strategy';

export class AngularJSPlaygroundStrategy extends PlaygroundStrategy {

    getGlobalExternalScripts(assetsUrl: string): string[] {
        return [
            'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js',
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/chance/0.8.0/chance.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.6/angular.js',
            'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.13.0/ui-bootstrap-tpls.js',
            'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.13/moment-timezone-with-data.min.js',
            assetsUrl + '/ng1/ux-aspects-ng1.js'
        ];
    }

    getBodyExternalScripts(): string[] {
        return ['app.js'];
    }

    getGlobalExternalStyles(assetsUrl: string): string[] {
        const stylesheets = [
            SystemJSHelper.getPackageUrl({ name: 'bootstrap', path: 'bootstrap@3.3.7/dist/css/bootstrap.min.css' }),
        ];

        if (this.documentationType === DocumentationType.Keppel) {
            stylesheets.push(`${assetsUrl}/css/ux-aspects.css`);
        } else {
            stylesheets.push(`${assetsUrl}/styles/ux-aspects.css`);
            stylesheets.push(`${assetsUrl}/styles/quantum-ux-aspects.css`);
        }

        stylesheets.push(`app.css`);

        return stylesheets;
    }

    getGlobalStyles(): string[] {
        return [`body { padding: 15px; background-color: #fff; }`];
    }

    getBody(playground: IPlayground): string {
        return [
            playground.files['app.html']
        ].join('\n');
    }

    /** Get the files to include in the playground */
    getFiles(playground: IPlayground): { [filename: string]: string } {

        const javascript = [
            `angular.module('app', ['ux-aspects']).run(['$colorService', function($colorService) {`,
            `\t$colorService.setColorSet('${this.documentationType === DocumentationType.Keppel ? 'keppel' : 'microFocus'}');`,
            `}]);\n`,
            playground.files['app.js'] || '',
            `angular.bootstrap(document, ['app']);`
        ].join('\n');

        return {
            'app.css': playground.files['app.css'] || '',
            'app.js': javascript,
        };
    }
}