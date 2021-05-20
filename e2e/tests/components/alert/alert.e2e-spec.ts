import { imageCompareFullPageScreen } from '../common/image-compare';
import { AlertTestPage } from './alert.po.spec';

describe('Alert', () => {
    let page: AlertTestPage;

    beforeEach(async () => {
        page = new AlertTestPage();
        await page.getPage();
    });

    it('should render correctly', async () => {
        expect(await imageCompareFullPageScreen('alert')).toEqual(0);
    });

    it('should dismiss', async () => {
        await page.clickDismiss('info');
        expect(await page.getAlert('info').isPresent()).toBe(false);
    });
});
