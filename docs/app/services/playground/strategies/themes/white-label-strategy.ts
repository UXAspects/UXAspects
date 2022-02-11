import { ThemeStrategy } from './theme-strategy';
import { SystemJSHelper } from '../../utilities/system-helper';

export class WhiteLabelThemeStrategy implements ThemeStrategy {
    getStylesheets(assetsUrl: string): string[] {
        return [
            SystemJSHelper.getPackageUrl({ name: 'bootstrap', path: 'bootstrap@3.3.7/dist/css/bootstrap.min.css' }),
            `${ assetsUrl }/ux-aspects/styles/ux-aspects.css`,
            `${ assetsUrl }/themes/white-label/css/main.css`
        ];
    }
}
