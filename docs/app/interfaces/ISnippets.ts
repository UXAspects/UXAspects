export interface ISnippets {
    raw: SnippetCollection;
    compiled: SnippetCollection;
}

export interface SnippetCollection {
    [key: string]: string;
}
