import { format } from 'prettier';
import * as parserHtml from 'prettier/parser-html';
import * as parserCss from 'prettier/parser-postcss';
import * as parserTypeScript from 'prettier/parser-typescript';

export function formatHtml(source: string): string {
    return format(source, {
        parser: 'html',
        plugins: [parserHtml],
    });
}

export function formatTypeScript(source: string): string {
    return format(source, {
        parser: 'typescript',
        plugins: [parserTypeScript],
    });
}

export function formatCss(source: string): string {
    return format(source, {
        parser: 'css',
        plugins: [parserCss],
    });
}
