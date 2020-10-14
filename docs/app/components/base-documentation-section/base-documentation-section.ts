import { Directive } from '@angular/core';
import { ISnippets } from '../../interfaces/ISnippets';
import { SiteThemeId } from '../../interfaces/SiteTheme';

@Directive()
export abstract class BaseDocumentationSection {

    snippets: ISnippets;
    theme: SiteThemeId = SiteThemeId.Keppel;

    SiteThemeId = SiteThemeId;

    constructor(private _context: __WebpackModuleApi.RequireContext) {
        this.snippets = this.getSnippets(_context);
    }

    updateWithTheme(theme: SiteThemeId): void {
        this.theme = theme;
        this.snippets = this.getSnippets(this._context);
    }

    private getSnippets(context: __WebpackModuleApi.RequireContext): ISnippets {

        const compiled = {};
        const raw = {};

        const keys = this.getContextKeys(context);

        keys.forEach(key => {

            const snippetName = this.getSnippetNameFromContext(key);
            const codeSnippet: CodeSnippet = context(key);

            compiled[snippetName] = codeSnippet.snippet;
            raw[snippetName] = codeSnippet.example;
        });

        return {
            compiled: compiled,
            raw: raw
        };
    }

    private getContextKeys(context: __WebpackModuleApi.RequireContext): string[] {
        const allKeys = context.keys();

        // Get a list of the keys with the theme-specific keys after the generic keys
        return [
            ...allKeys.filter(key => key.indexOf(this.theme.toString()) === -1),
            ...allKeys.filter(key => key.indexOf(this.theme.toString()) >= 0)
        ];
    }

    private getSnippetNameFromContext(contextKey: string): string {
        return contextKey
            .replace(new RegExp(`.${this.theme}`, 'i'), '')
            .replace('./', '')
            .replace(/\W+(\w)/g, match => match[1].toUpperCase());
    }
}

export interface CodeSnippet {
    snippet?: string;
    example?: string;
}
