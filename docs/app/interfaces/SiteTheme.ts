export interface SiteTheme {
    title: string;
    id: SiteThemeId;
}

export enum SiteThemeId {
    Keppel = 'Keppel',
    KeppelRTL = 'KeppelRTL',
    MicroFocus = 'MicroFocus',
    MicroFocus2020 = 'MicroFocus2020',
    MicroFocusRTL2020 = 'MicroFocusRTL2020',
    WhiteLabel = 'WhiteLabel'
}
