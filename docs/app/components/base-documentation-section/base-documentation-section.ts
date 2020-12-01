import { ISnippets, SnippetCollection } from '../../interfaces/ISnippets';
import { SiteThemeId } from '../../interfaces/SiteTheme';

export abstract class BaseDocumentationSection {

    snippets: ISnippets;
    theme: SiteThemeId = SiteThemeId.Keppel;

    SiteThemeId = SiteThemeId;

    private _themedSnippetRegex: RegExp;

    constructor(private _context: __WebpackModuleApi.RequireContext) {
        this.snippets = this.getSnippets();
    }

    /** Update the active theme and replace snippets with theme-specific versions if available. */
    onThemeChange(theme: SiteThemeId): void {
        this.theme = theme;
        this.snippets = this.getSnippets();
    }

    private getSnippets(): ISnippets {

        this._themedSnippetRegex = new RegExp(`\.${this.theme}`, 'i');

        const compiled: SnippetCollection = {};
        const raw: SnippetCollection = {};

        const keys = this.getContextKeys();

        keys.forEach(key => {
            const snippetName = this.getSnippetNameFromContext(key);
            const codeSnippet: CodeSnippet = this._context(key);

            compiled[snippetName] = codeSnippet.snippet;
            raw[snippetName] = codeSnippet.example;
        });

        return { compiled, raw };
    }

    private getContextKeys(): string[] {
        const allKeys = this._context.keys();

        // Get a list of the keys with the theme-specific keys after the generic keys
        return [
            ...allKeys.filter(key => !this._themedSnippetRegex.test(key)),
            ...allKeys.filter(key => this._themedSnippetRegex.test(key))
        ];
    }

    private getSnippetNameFromContext(contextKey: string): string {
        return contextKey
            .replace(this._themedSnippetRegex, '')
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
