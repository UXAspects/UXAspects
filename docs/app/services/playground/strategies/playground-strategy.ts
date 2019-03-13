import { IPlayground } from '../../../interfaces/IPlayground';
import { DocumentationType } from '../tokens/documentation.token';

/**
 * This is the base implementation of a strategy to create code playground
 * for either Angular or AngularJS
 */
export abstract class PlaygroundStrategy {

    constructor(protected documentationType: DocumentationType) { }

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
        return [];
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