import { ISnippets } from '../../interfaces/ISnippets';

export abstract class BaseDocumentationSection {

    protected snippets: ISnippets;

    constructor(context?: __WebpackModuleApi.RequireContext) {

        this.snippets = {
            compiled: {},
            raw: {}
        };

        context.keys().forEach(key => {

            let snippetName = key.replace('./', '').replace(/\W+(\w)/g, (m) => { return m[1].toUpperCase(); });
            let codeSnippet: CodeSnippet = context(key);

            if (codeSnippet.snippet) {
                this.snippets.compiled[snippetName] = codeSnippet.snippet;
            }

            if (codeSnippet.example) {
                this.snippets.raw[snippetName] = codeSnippet.example;
            }

        });
    }
}

export interface CodeSnippet {
    snippet?: string;
    example?: string;
}