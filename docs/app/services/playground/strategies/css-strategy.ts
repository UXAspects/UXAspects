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
        } else {
            stylesheets.push(`${assetsUrl}/styles/ux-aspects.css`);

            const theme = this.persistentDataService.getItem('uxd-site-theme');

            if (theme === 'MicroFocus2020') {
                stylesheets.push(`https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap`);
                stylesheets.push(`${assetsUrl}/styles/quantum-ux-aspects-micro-focus-2020.css`);
            } else if (theme === 'WhiteLabel') {
                stylesheets.push(`${assetsUrl}/styles/quantum-ux-aspects-white-label.css`);
            } else {
                stylesheets.push(`${assetsUrl}/styles/quantum-ux-aspects.css`);
            }
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
