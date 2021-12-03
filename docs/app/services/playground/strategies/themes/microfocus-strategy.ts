import { ThemeStrategy } from './theme-strategy';
import { SystemJSHelper } from '../../utilities/system-helper';

export class MicroFocusThemeStrategy implements ThemeStrategy {
    getStylesheets(assetsUrl: string): string[] {
        return [
            SystemJSHelper.getPackageUrl({ name: 'bootstrap', path: 'bootstrap@3.3.7/dist/css/bootstrap.min.css' }),
            `${ assetsUrl }/ux-aspects/styles/ux-aspects.css`,
            `${ assetsUrl }/themes/ux-aspects/css/main.css`
        ];
    }
}
