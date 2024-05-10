import { format } from 'prettier';
import * as parserHtml from 'prettier/plugins/html';
import * as parserCss from 'prettier/plugins/postcss';
import * as parserTypeScript from 'prettier/plugins/typescript';

export function formatHtml(source: string): Promise<string> {
    return format(source, {
        parser: 'html',
        plugins: [parserHtml],
    });
}

export function formatTypeScript(source: string): Promise<string> {
    return format(source, {
        parser: 'typescript',
        plugins: [parserTypeScript],
    });
}

export function formatCss(source: string): Promise<string> {
    return format(source, {
        parser: 'css',
        plugins: [parserCss],
    });
}
