import { ThemeStrategy } from './theme-strategy';
import { SystemJSHelper } from '../../utilities/system-helper';

export class MicroFocusThemeStrategy implements ThemeStrategy {
    getStylesheets(assetsUrl: string): string[] {
        return [
            SystemJSHelper.getPackageUrl({ name: 'bootstrap', path: 'bootstrap@3.3.7/dist/css/bootstrap.min.css' }),
            `${assetsUrl}/styles/ux-aspects.css`,
            `${assetsUrl}/styles/quantum-ux-aspects.css`
        ];
    }
}
