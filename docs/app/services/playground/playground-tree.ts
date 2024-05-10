import { CheerioAPI, load } from 'cheerio';
import * as ts from 'typescript';
import { formatHtml, formatTypeScript } from './utilities/format';

/** Represents the file tree for the playground. */
export class PlaygroundTree extends Map<string, string> {
    setContent(path: string, content: string): void {
        this.set(path, content);
    }

    getContent(path: string): string {
        return this.get(path);
    }

    /** Append content to the end of a file, and optionally format the entire content. */
    appendContent(path: string, content: string, format?: (_: string) => string): void {
        const newContent = (this.get(path) ?? '') + content;
        const formattedContent = format ? format(newContent) : newContent;
        this.set(path, formattedContent);
    }

    /** Parse a file as JSON, apply changes via a callback, and serialize the result back. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateJsonFile(path: string, callback: (json: any) => any): void {
        const json = JSON.parse(this.getContent(path));
        const modifiedJson = callback(json) ?? json;
        this.setContent(path, JSON.stringify(modifiedJson, null, 2));
    }

    /** Parse a file into a TS AST, apply specified transformers, and serialize the result back. */
    async updateTypeScriptFile(
        path: string,
        ...transformers: ts.TransformerFactory<ts.SourceFile>[]
    ): Promise<void> {
        const source = ts.createSourceFile(
            path,
            this.getContent(path),
            ts.ScriptTarget.Latest,
            true
        );

        const transformResult = ts.transform(source, transformers);
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
        const modifiedContent = printer.printFile(transformResult.transformed[0]);
        const formattedContent = await formatTypeScript(modifiedContent);

        this.setContent(path, formattedContent);
    }

    /** Parse a file as HTML, apply changes via a callback, and serialize the result back. */
    async updateHtmlFile(path: string, callback: ($: CheerioAPI) => void): Promise<void> {
        const $ = load(this.getContent(path));
        callback($);
        const modifiedHtml = await formatHtml($.root().html());
        this.setContent(path, modifiedHtml);
    }
}
