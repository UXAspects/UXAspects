export interface SiteTheme {
  title: string;
  id: SiteThemeId;
}

export enum SiteThemeId {
  Keppel = 'Keppel',
  MicroFocus = 'MicroFocus',
  MicroFocus2017 = 'MicroFocus2017',
  MicroFocus2017Roboto = 'Roboto',
  WhiteLabel = 'WhiteLabel',
}
