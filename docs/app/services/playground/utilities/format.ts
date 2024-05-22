import * as pluginEstree from 'prettier/plugins/estree';
import * as pluginHtml from 'prettier/plugins/html';
import * as pluginCss from 'prettier/plugins/postcss';
import * as pluginTypeScript from 'prettier/plugins/typescript';
import { format } from 'prettier/standalone';

export function formatHtml(source: string): Promise<string> {
    return format(source, {
        parser: 'html',
        plugins: [pluginHtml],
    });
}

export function formatTypeScript(source: string): Promise<string> {
    return format(source, {
        parser: 'typescript',
        plugins: [pluginEstree, pluginTypeScript],
    });
}

export function formatCss(source: string): Promise<string> {
    return format(source, {
        parser: 'css',
        plugins: [pluginCss],
    });
}
