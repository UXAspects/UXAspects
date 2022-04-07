import { CheerioAPI, load } from 'cheerio';
import { format } from 'prettier';
import * as parserHtml from 'prettier/parser-html';
import * as parserTypeScript from 'prettier/parser-typescript';
import * as ts from 'typescript';

/** Represents the file tree for the playground. */
export class PlaygroundTree extends Map<string, string> {
    setContent(path: string, content: string): void {
        this.set(path, content);
    }

    getContent(path: string): string {
        return this.get(path);
    }

    appendContent(path: string, content: string): void {
        const existingContent = this.get(path) ?? '';
        this.set(path, existingContent + content);
    }

    /** Parse a file as JSON, apply changes via a callback, and serialize the result back. */
    updateJsonFile(path: string, callback: (json: any) => any): void {
        const json = JSON.parse(this.getContent(path));
        const modifiedJson = callback(json) ?? json;
        this.setContent(path, JSON.stringify(modifiedJson, null, 2));
    }

    /** Parse a file into a TS AST, apply specified transformers, and serialize the result back. */
    updateTypeScriptFile(
        path: string,
        ...transformers: ts.TransformerFactory<ts.SourceFile>[]
    ): void {
        const source = ts.createSourceFile(
            path,
            this.getContent(path),
            ts.ScriptTarget.Latest,
            true
        );

        const transformResult = ts.transform(source, transformers);
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
        const modifiedContent = printer.printFile(transformResult.transformed[0]);
        const formattedContent = format(modifiedContent, {
            parser: 'typescript',
            plugins: [parserTypeScript],
        });

        this.setContent(path, formattedContent);
    }

    /** Parse a file as HTML, apply changes via a callback, and serialize the result back. */
    updateHtmlFile(path: string, callback: ($: CheerioAPI) => void): void {
        const $ = load(this.getContent(path));
        callback($);
        const modifiedHtml = format($.root().html(), {
            parser: 'html',
            plugins: [parserHtml],
        });
        this.setContent(path, modifiedHtml);
    }
}
