export interface SiteTheme {
    title: string;
    id: SiteThemeId;
}

export enum SiteThemeId {
    Keppel = 'Keppel',
    MicroFocus = 'MicroFocus',
    MicroFocus2020 = 'MicroFocus2020',
    WhiteLabel = 'WhiteLabel'
}
