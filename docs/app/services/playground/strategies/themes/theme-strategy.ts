export interface ThemeStrategy {
    getStylesheets(assetsUrl: string): string[];
}
