import { $, browser } from 'protractor';

export class MenuAlignmentPage {

    alignmentStartBtn = $('#alignment-start');
    alignmentCenterBtn = $('#alignment-center');
    alignmentEndBtn = $('#alignment-end');

    openMenuBtn = $('#open-menu');

    async getPage() {
        return await browser.get('#/menu/alignment');
    }
}
