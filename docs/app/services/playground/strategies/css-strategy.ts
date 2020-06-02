import { IPlayground } from '../../../interfaces/IPlayground';
import { DocumentationType } from '../tokens/documentation.token';
import { SystemJSHelper } from '../utilities/system-helper';
import { PlaygroundStrategy } from './playground-strategy';

export class CssPlaygroundStrategy extends PlaygroundStrategy {

    getGlobalExternalScripts(_assetsUrl: string): string[] {
        return [];
    }

    getBodyExternalScripts(): string[] {
        return [];
    }

    getGlobalExternalStyles(assetsUrl: string): string[] {
        const stylesheets = [
            SystemJSHelper.getPackageUrl({ name: 'bootstrap', path: 'bootstrap@3.3.7/dist/css/bootstrap.min.css' }),
        ];

        if (this.documentationType === DocumentationType.Keppel) {
            stylesheets.push(`${assetsUrl}/css/ux-aspects.css`);
            stylesheets.push(`${assetsUrl}/css/hpe-icons.css`);
        } else {
            stylesheets.push(`${assetsUrl}/styles/ux-aspects.css`);
            stylesheets.push(`${assetsUrl}/styles/hpe-icons.css`);
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
        return {
            'app.css': playground.files['app.css'] || '',
        };
    }
}
