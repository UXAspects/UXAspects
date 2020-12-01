export interface ThemeStrategy {
    getHTMLDirection(): string;
    getStylesheets(assetsUrl: string): string[];
}
