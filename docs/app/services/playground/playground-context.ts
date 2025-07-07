import { IPlayground } from '../../interfaces/IPlayground';
import { SiteThemeId } from '../../interfaces/SiteTheme';
import { AppConfiguration } from '../app-configuration/app-configuration.service';

export interface PlaygroundContext {
  title: string;
  playground: IPlayground;
  theme: SiteThemeId;
  appConfig: AppConfiguration;
  htmlEntryPoint: string;
  cssEntryPoint: string;
}
