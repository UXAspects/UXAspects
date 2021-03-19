export interface SiteTheme {
    title: string;
    id: SiteThemeId;
}

export enum SiteThemeId {
    Keppel = 'Keppel',
    MicroFocus = 'MicroFocus',
    MicroFocusNext = 'MicroFocus2020',
    WhiteLabel = 'WhiteLabel'
}
