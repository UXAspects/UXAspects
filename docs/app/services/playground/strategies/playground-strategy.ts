import { IPlayground } from '../../../interfaces/IPlayground';
import { DocumentationType } from '../tokens/documentation.token';
import { SystemJSHelper } from '../utilities/system-helper';
import { SiteThemeService } from '../../site-theme/site-theme.service';

/**
 * This is the base implementation of a strategy to create code playground
 * for either Angular or AngularJS
 */
export abstract class PlaygroundStrategy {

    constructor(protected documentationType: DocumentationType,
                private _siteThemeService: SiteThemeService) { }

    /** Get all the external scripts that should be loaded in the `head` of the HTML */
    getGlobalExternalScripts(assetsUrl: string): string[] {
        return [];
    }

    /** Allow adding custom script tags to the `head` element */
    getGlobalScripts(assetsUrl: string): string[] {
        return [];
    }

    /** Allow adding custom script tags to the `body` element */
    getBodyScripts(): string[] {
        return [];
    }

    /** Allow adding custom external script to the `body` element */
    getBodyExternalScripts(): string[] {
        return [];
    }

    /** Get all the external styles that should be loaded in the `head` of the HTML */
    getGlobalExternalStyles(assetsUrl: string): string[] {
        const stylesheets = [
            SystemJSHelper.getPackageUrl({ name: 'bootstrap', path: 'bootstrap@3.3.7/dist/css/bootstrap.min.css' }),
        ];

        if (this.documentationType === DocumentationType.Keppel) {
            stylesheets.push(`${assetsUrl}/css/ux-aspects.css`);
        } else {
            stylesheets.push(`${assetsUrl}/styles/ux-aspects.css`);

            const theme = this._siteThemeService.theme$.value;

            if (theme === 'MicroFocus2020') {
                stylesheets.push(`https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap`);
                stylesheets.push(`${assetsUrl}/styles/quantum-ux-aspects-micro-focus-2020.css`);
            } else if (theme === 'WhiteLabel') {
                stylesheets.push(`${assetsUrl}/styles/quantum-ux-aspects-white-label.css`);
            } else {
                stylesheets.push(`${assetsUrl}/styles/quantum-ux-aspects.css`);
            }
        }

        return stylesheets;
    }

    /** Allow adding custom style tags to the `head` element */
    getGlobalStyles(): string[] {
        return [];
    }

    /** Get the content of the `body` tag */
    abstract getBody(playground: IPlayground): string;

    /** Get the files to include in the playground */
    abstract getFiles(playground: IPlayground, assetsUrl: string): { [filename: string]: string };

}
