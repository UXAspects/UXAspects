import { IPlayground } from '../../../interfaces/IPlayground';
import { PlaygroundStrategy } from './playground-strategy';

export class CssPlaygroundStrategy extends PlaygroundStrategy {

    getGlobalExternalScripts(_assetsUrl: string): string[] {
        return [];
    }

    getBodyExternalScripts(): string[] {
        return [];
    }

    getGlobalExternalStyles(assetsUrl: string): string[] {
        return [...super.getGlobalExternalStyles(assetsUrl), 'app.css'];
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
