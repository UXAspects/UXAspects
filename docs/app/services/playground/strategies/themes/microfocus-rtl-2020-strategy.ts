import { ThemeStrategy } from './theme-strategy';
import { SystemJSHelper } from '../../utilities/system-helper';

export class MicroFocusRtl2020ThemeStrategy implements ThemeStrategy {
    getHTMLDirection(): string {
        return 'RTL';
    }
    getStylesheets(assetsUrl: string): string[] {
        return [
            SystemJSHelper.getPackageUrl({ name: 'bootstrap', path: 'bootstrap@3.3.7/dist/css/bootstrap.min.css' }),
            `${assetsUrl}/styles/ux-aspects-rtl.css`,
            'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap',
            `${assetsUrl}/styles/quantum-ux-aspects-micro-focus-2020.css`
        ];
    }
}
