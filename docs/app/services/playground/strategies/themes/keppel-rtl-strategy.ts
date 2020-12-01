import { ThemeStrategy } from './theme-strategy';
import { SystemJSHelper } from '../../utilities/system-helper';

export class KeppelRTLThemeStrategy implements ThemeStrategy {
    getHTMLDirection(): string {
        return 'RTL';
    }
    getStylesheets(assetsUrl: string): string[] {
        return [
            SystemJSHelper.getPackageUrl({ name: 'bootstrap', path: 'bootstrap@3.3.7/dist/css/bootstrap.min.css' }),
            `${assetsUrl}/css/ux-aspects-rtl.css`
        ];
    }
}
