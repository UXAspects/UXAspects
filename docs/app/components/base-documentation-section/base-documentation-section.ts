import { ISnippets } from '../../interfaces/ISnippets';

export abstract class BaseDocumentationSection {

    protected snippets: ISnippets;

    constructor(compiledHtmlContext: __WebpackModuleApi.RequireContext,
        compiledCssContext: __WebpackModuleApi.RequireContext,
        compiledJavascriptContext: __WebpackModuleApi.RequireContext,
        compiledTypescriptContext: __WebpackModuleApi.RequireContext,
        rawContext?: __WebpackModuleApi.RequireContext) {

        this.snippets = {
            compiled: {},
            raw: {}
        };

        // Use the context supplied by the implementing component to load all snippets in both raw and compiled versions
        // this.loadSnippetsFromRequireContext(this.snippets.compiled, compiledHtmlContext);
        // this.loadSnippetsFromRequireContext(this.snippets.compiled, compiledCssContext);
        // this.loadSnippetsFromRequireContext(this.snippets.compiled, compiledJavascriptContext);
        // this.loadSnippetsFromRequireContext(this.snippets.compiled, compiledTypescriptContext);
        // this.loadSnippetsFromRequireContext(this.snippets.raw, rawContext);
        this.loadSnippetsFromRequireContext(this.snippets.raw, rawContext);
        this.snippets.compiled = this.snippets.raw;
    }

    private loadSnippetsFromRequireContext(snippets: any, requireContext: any) {

        if (requireContext) {

            // requireContext contains all the resources in the given context, e.g. HTML files loaded with prism
            requireContext.keys().forEach((key: string) => {

                // Convert filename into camelcase identifier
                const snippetName = key.replace('./', '').replace(/\W+(\w)/g, (m) => { return m[1].toUpperCase(); });

                // Require the content and add to snippets object
                snippets[snippetName] = requireContext(key);
            });

        }
    }
}
