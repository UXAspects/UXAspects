import { IPlayground } from '../../../interfaces/IPlayground';
import { PlaygroundStrategy } from '../strategies/playground-strategy';

export class PlaygroundHelper {

    static create(strategy: PlaygroundStrategy, assetsUrl: string, playground: IPlayground): { [file: string]: string } {
        return { ...strategy.getFiles(playground, assetsUrl), 'index.html': this.getIndexPage(strategy, assetsUrl, playground) };
    }

    static getIndexPage(strategy: PlaygroundStrategy, assetsUrl: string, playground: IPlayground): string {
        return [
            `<!DOCTYPE html>`,
            `<html>`,
            `\t<head>`,
            `\t<base href=".">`,
            `\t<title>UX Aspects Example</title>`,
            ...strategy.getGlobalExternalScripts(assetsUrl).map(source => `\t\t<script src="${source}"></script>`),
            ...strategy.getGlobalScripts(assetsUrl).map(code => `\t\t<script>${code}</script>`),
            ...strategy.getGlobalExternalStyles(assetsUrl).map(source => `\t\t<link rel="stylesheet" href="${source}"/>`),
            ...strategy.getGlobalStyles().map(code => `\t\t<style>${code}</style>`),
            `\t</head>`,
            `\t<body>`,
            `\t\t${strategy.getBody(playground)}`,
            ...strategy.getBodyExternalScripts().map(source => `\t\t<script src="${source}"></script>`),
            ...strategy.getBodyScripts().map(code => `\t\t<script>${code}</script>`),
            `\t</body>`,
            `</html>`
        ].join('\n');
    }

}