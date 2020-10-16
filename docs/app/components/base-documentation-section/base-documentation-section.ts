import { ISnippets, SnippetCollection } from '../../interfaces/ISnippets';
import { SiteThemeId } from '../../interfaces/SiteTheme';

export abstract class BaseDocumentationSection {

    snippets: ISnippets;
    theme: SiteThemeId = SiteThemeId.Keppel;

    SiteThemeId = SiteThemeId;

    constructor(private _context: __WebpackModuleApi.RequireContext) {
        this.snippets = this.getSnippets();
    }

    /** Update the active theme and replace snippets with theme-specific versions if available. */
    updateWithTheme(theme: SiteThemeId): void {
        this.theme = theme;
        this.snippets = this.getSnippets();
    }

    private getSnippets(): ISnippets {

        const compiled: SnippetCollection = {};
        const raw: SnippetCollection = {};

        const keys = this.getContextKeys();

        keys.forEach(key => {

            const snippetName = this.getSnippetNameFromContext(key);
            const codeSnippet: CodeSnippet = this._context(key);

            compiled[snippetName] = codeSnippet.snippet;
            raw[snippetName] = codeSnippet.example;
        });

        return {
            compiled: compiled,
            raw: raw
        };
    }

    private getContextKeys(): string[] {
        const allKeys = this._context.keys();

        // Get a list of the keys with the theme-specific keys after the generic keys
        return [
            ...allKeys.filter(key => key.indexOf(this.theme.toString()) === -1),
            ...allKeys.filter(key => key.indexOf(this.theme.toString()) >= 0)
        ];
    }

    private getSnippetNameFromContext(contextKey: string): string {
        return contextKey
            .replace(new RegExp(`\.${this.theme}`, 'i'), '')
            .replace('./', '')
            .replace(/\W+(\w)/g, match => match[1].toUpperCase());
    }
}

export function isBaseDocumentationSection(obj: any): obj is BaseDocumentationSection {
    return 'theme' in obj;
}

export interface CodeSnippet {
    snippet?: string;
    example?: string;
}
