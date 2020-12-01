export interface SiteTheme {
    title: string;
    id: SiteThemeId;
}

export enum SiteThemeId {
    Keppel = 'Keppel',
    KeppelRtl = 'KeppelRTL',
    MicroFocus = 'MicroFocus',
    MicroFocus2020 = 'MicroFocus2020',
    MicroFocusRtl2020 = 'MicroFocusRTL2020',
    WhiteLabel = 'WhiteLabel'
}
