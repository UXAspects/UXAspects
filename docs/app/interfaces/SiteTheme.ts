export interface SiteTheme {
    title: string;
    id: SiteThemeId;
}

export enum SiteThemeId {
    Keppel = 'Keppel',
    MicroFocus = 'MicroFocus',
    MicroFocusNext = 'MicroFocusNext',
    WhiteLabel = 'WhiteLabel'
}
