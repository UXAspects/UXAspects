import { imageCompare } from '../common/image-compare';
import { PaginationPage } from './pagination.po.spec';

describe('Pagination Tests', () => {

    let page: PaginationPage = new PaginationPage();
    page.getPage();

    it('should have correct initial states', async () => {

        // button states
        expect(await page.confirmButtonIsDisabled(page.getButton(0))).toBeTruthy();
        expect(await page.confirmButtonIsActive(page.getButton(1))).toBeTruthy();
        expect(await page.confirmButtonIsActive(page.getButton(2))).toBeFalsy();
        expect(await page.confirmButtonIsActive(page.getButton(3))).toBeFalsy();
        expect(await page.confirmButtonIsActive(page.getButton(4))).toBeFalsy();
        expect(await page.confirmButtonIsActive(page.getButton(5))).toBeFalsy();
        expect(await page.confirmButtonIsDisabled(page.getButton(6))).toBeFalsy();

        // button numbers
        expect(await page.getButton(1).getText()).toBe('1');
        expect(await page.getButton(2).getText()).toBe('2');
        expect(await page.getButton(3).getText()).toBe('3');
        expect(await page.getButton(4).getText()).toBe('4');
        expect(await page.getButton(5).getText()).toBe('5');

        // page number
        expect(await page.text.getText()).toBe('Page 1 of 10');

        await page.resetBtn.click();

        expect(await imageCompare('pagination-initial')).toEqual(0);
    });

    it('should react to arrow clicks', async () => {

        await page.clickButton(6);
        await page.clickButton(6);
        await page.clickButton(6);
        expect(await page.confirmButtonIsActive(page.getButton(1))).toBeFalsy();
        expect(await page.confirmButtonIsActive(page.getButton(2))).toBeFalsy();
        expect(await page.confirmButtonIsActive(page.getButton(3))).toBeTruthy();
        expect(await page.confirmButtonIsActive(page.getButton(4))).toBeFalsy();
        expect(await page.confirmButtonIsActive(page.getButton(5))).toBeFalsy();
        expect(await page.text.getText()).toBe('Page 4 of 10');

        await page.clickButton(0);
        await page.clickButton(0);
        expect(await page.confirmButtonIsActive(page.getButton(1))).toBeFalsy();
        expect(await page.confirmButtonIsActive(page.getButton(2))).toBeTruthy();
        expect(await page.confirmButtonIsActive(page.getButton(3))).toBeFalsy();
        expect(await page.confirmButtonIsActive(page.getButton(4))).toBeFalsy();
        expect(await page.confirmButtonIsActive(page.getButton(5))).toBeFalsy();
        expect(await page.text.getText()).toBe('Page 2 of 10');

        await page.resetBtn.click();
    });

    it('should react to numbered button clicks', async () => {

        await page.clickButton(2);
        expect(await page.confirmButtonIsActive(page.getButton(1))).toBeFalsy();
        expect(await page.confirmButtonIsActive(page.getButton(2))).toBeTruthy();
        expect(await page.confirmButtonIsActive(page.getButton(3))).toBeFalsy();
        expect(await page.confirmButtonIsActive(page.getButton(4))).toBeFalsy();
        expect(await page.confirmButtonIsActive(page.getButton(5))).toBeFalsy();
        expect(await page.text.getText()).toBe('Page 2 of 10');

        await page.clickButton(1);
        expect(await page.confirmButtonIsActive(page.getButton(1))).toBeTruthy();
        expect(await page.confirmButtonIsActive(page.getButton(2))).toBeFalsy();
        expect(await page.confirmButtonIsActive(page.getButton(3))).toBeFalsy();
        expect(await page.confirmButtonIsActive(page.getButton(4))).toBeFalsy();
        expect(await page.confirmButtonIsActive(page.getButton(5))).toBeFalsy();
        expect(await page.text.getText()).toBe('Page 1 of 10');

        await page.clickButton(3);
        await page.clickButton(5);
        await page.clickButton(4);
        expect(await page.confirmButtonIsActive(page.getButton(1))).toBeFalsy();
        expect(await page.confirmButtonIsActive(page.getButton(2))).toBeFalsy();
        expect(await page.confirmButtonIsActive(page.getButton(3))).toBeTruthy();
        expect(await page.confirmButtonIsActive(page.getButton(4))).toBeFalsy();
        expect(await page.confirmButtonIsActive(page.getButton(5))).toBeFalsy();
        expect(await page.text.getText()).toBe('Page 6 of 10');

        await page.resetBtn.click();
    });

    it('should disable arrow buttons when appropriate', async () => {

        await page.clickButton(2);
        await page.clickButton(1);
        expect(await page.confirmButtonIsDisabled(page.getButton(0))).toBeTruthy();
        expect(await page.confirmButtonIsDisabled(page.getButton(6))).toBeFalsy();

        await page.clickButton(5);
        await page.clickButton(5);
        await page.clickButton(5);
        await page.clickButton(5);
        expect(await page.confirmButtonIsDisabled(page.getButton(0))).toBeFalsy();
        expect(await page.confirmButtonIsDisabled(page.getButton(6))).toBeTruthy();

        await page.resetBtn.click();
    });

    it('should move the selected number to the centre when possible', async () => {

        // page 2
        await page.clickButton(2);
        expect(await page.getButton(1).getText()).toBe('1');
        expect(await page.getButton(2).getText()).toBe('2');
        expect(await page.getButton(3).getText()).toBe('3');
        expect(await page.getButton(4).getText()).toBe('4');
        expect(await page.getButton(5).getText()).toBe('5');

        // page 3
        await page.clickButton(3);
        expect(await page.getButton(1).getText()).toBe('1');
        expect(await page.getButton(2).getText()).toBe('2');
        expect(await page.getButton(3).getText()).toBe('3');
        expect(await page.getButton(4).getText()).toBe('4');
        expect(await page.getButton(5).getText()).toBe('5');

        // page 4
        await page.clickButton(4);
        expect(await page.getButton(1).getText()).toBe('2');
        expect(await page.getButton(2).getText()).toBe('3');
        expect(await page.getButton(3).getText()).toBe('4');
        expect(await page.getButton(4).getText()).toBe('5');
        expect(await page.getButton(5).getText()).toBe('6');

        // page 6
        await page.clickButton(5);
        expect(await page.getButton(1).getText()).toBe('4');
        expect(await page.getButton(2).getText()).toBe('5');
        expect(await page.getButton(3).getText()).toBe('6');
        expect(await page.getButton(4).getText()).toBe('7');
        expect(await page.getButton(5).getText()).toBe('8');

        // page 8
        await page.clickButton(5);
        expect(await page.getButton(1).getText()).toBe('6');
        expect(await page.getButton(2).getText()).toBe('7');
        expect(await page.getButton(3).getText()).toBe('8');
        expect(await page.getButton(4).getText()).toBe('9');
        expect(await page.getButton(5).getText()).toBe('10');

        // page 10
        await page.clickButton(5);
        expect(await page.getButton(1).getText()).toBe('6');
        expect(await page.getButton(2).getText()).toBe('7');
        expect(await page.getButton(3).getText()).toBe('8');
        expect(await page.getButton(4).getText()).toBe('9');
        expect(await page.getButton(5).getText()).toBe('10');

        // page 9
        await page.clickButton(4);
        expect(await page.getButton(1).getText()).toBe('6');
        expect(await page.getButton(2).getText()).toBe('7');
        expect(await page.getButton(3).getText()).toBe('8');
        expect(await page.getButton(4).getText()).toBe('9');
        expect(await page.getButton(5).getText()).toBe('10');

        // page 6
        await page.clickButton(1);
        expect(await page.getButton(1).getText()).toBe('4');
        expect(await page.getButton(2).getText()).toBe('5');
        expect(await page.getButton(3).getText()).toBe('6');
        expect(await page.getButton(4).getText()).toBe('7');
        expect(await page.getButton(5).getText()).toBe('8');

        await page.resetBtn.click();
    });
});