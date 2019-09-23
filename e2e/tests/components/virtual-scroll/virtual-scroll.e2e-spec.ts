import { VirtualScrollPage } from './virtual-scroll.po.spec';

describe('Virtual Scroll Tests', () => {

    let page: VirtualScrollPage;

    beforeEach(async () => {
        page = new VirtualScrollPage();
        await page.getPage();
    });

    it('should have correct initial states', async () => {

        // LOAD MORE button not visible
        expect(await page.confirmLoadMoreIsVisible()).toBeFalsy();

        // loadOnScroll checked
        expect(await page.confirmLoadOnScrollIsChecked()).toBeTruthy();

        // 5 visible employees
        expect(await page.getLastVisibleEmployeeIDNumber()).toBe('8');

    });

    it('should display the correct employee details', async () => {

        // Employee's name
        for (var i = 0; i < 4; i++) {
            expect(await page.getEmployeeText(i)).toBe('Employee_' + i);
        }

        // Employee's department
        for (i = 0; i < 4; i++) {
            expect(await page.getDepartmentText(i)).toBe('(Department_' + i + ')');
        }

        // Employee's email
        for (i = 0; i < 4; i++) {
            expect(await page.getEmailText(i)).toBe('employee.' + i + '@business.com');
        }

        // Employee's ID
        for (i = 0; i < 4; i++) {
            expect(await page.getEmployeeIDNumber(i)).toBe(i.toString());
        }

    });

    it('should react to clicking on the loadOnScroll checkbox', async () => {

        // Unchecking
        await page.clickOnLoadOnScroll();
        expect(await page.confirmLoadOnScrollIsChecked()).toBeFalsy();

        // Checking
        await page.clickOnLoadOnScroll();
        expect(await page.confirmLoadOnScrollIsChecked()).toBeTruthy();

    });

    it('should display more employees when the LOAD MORE button is clicked', async () => {

        await page.clickOnLoadOnScroll();

        await page.scrollToEnd();
        expect(await page.getLastVisibleEmployeeIDNumber()).toBe('1999');

        // Click on LOAD MORE button
        await page.loadMoreButton.click();
        await page.scrollToEnd();
        expect(await page.getLastVisibleEmployeeIDNumber()).toBe('3999');

        // Scrolling down should not have any effect
        await page.scrollToEnd();
        expect(await page.getLastVisibleEmployeeIDNumber()).toBe('3999');

        // Click on LOAD MORE button again
        await page.loadMoreButton.click();
        await page.scrollToEnd();
        expect(await page.getLastVisibleEmployeeIDNumber()).toBe('5999');

    });

    it('should display the LOAD MORE button when appropriate', async () => {

        // Button visible when loadOnScroll is unchecked
        await page.clickOnLoadOnScroll();
        expect(await page.confirmLoadMoreIsVisible()).toBeTruthy();

        // Button not visible when loadOnScroll is checked
        await page.clickOnLoadOnScroll();
        expect(await page.confirmLoadMoreIsVisible()).toBeFalsy();

        // Button visible when not all employees are on the list
        await page.clickOnLoadOnScroll();
        for (var i = 0; i < 9; i++) {
            await page.scrollToEnd();
            expect(await page.confirmLoadMoreIsVisible()).toBeTruthy();
            await page.loadMoreButton.click();
        }
        await page.scrollToEnd();
        expect(await page.getLastVisibleEmployeeIDNumber()).toBe('19999');
        expect(await page.confirmLoadMoreIsVisible()).toBeTruthy();

        // Button not visible when all employees are on the list
        await page.loadMoreButton.click();
        await page.scrollToEnd();
        expect(await page.getLastVisibleEmployeeIDNumber()).toBe('21999');
        expect(await page.confirmLoadMoreIsVisible()).toBeFalsy();

    });

    // Failing - To be fixed as part of https://autjira.microfocus.com/browse/EL-3396
    // it('should display more employees when scrolling down', () => {

    //     page.scrollToEnd();
    //     expect<any>(page.getLastVisibleEmployeeIDNumber()).toBe('2009');

    //     page.scrollToEnd();
    //     expect<any>(page.getLastVisibleEmployeeIDNumber()).toBe('4009');

    //     page.scrollToEnd();
    //     expect<any>(page.getLastVisibleEmployeeIDNumber()).toBe('6009');

    // });
});