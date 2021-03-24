import { ThemeStrategy } from './theme-strategy';
import { SystemJSHelper } from '../../utilities/system-helper';

export class MicroFocusNextThemeStrategy implements ThemeStrategy {
    getStylesheets(assetsUrl: string): string[] {
        return [
            SystemJSHelper.getPackageUrl({ name: 'bootstrap', path: 'bootstrap@3.3.7/dist/css/bootstrap.min.css' }),
            'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap',
            `${assetsUrl}/styles/ux-aspects.css`,
            `${assetsUrl}/styles/quantum-ux-aspects-next.css`
        ];
    }
}
