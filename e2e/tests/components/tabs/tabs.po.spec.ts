import { $, $$, browser, ElementFinder } from 'protractor';

export class TabsTestPageComponent {

    minimalCheckbox = $('#minimal-checkbox');
    stackNoneRadio = $('#stack-none-radio');
    stackLeftRadio = $('#stack-left-radio');
    stackRightRadio = $('#stack-right-radio');
    addTab0 = $('#add-tab-0');
    tabsetHost = $('ux-tabset');
    tabset = $('.nav-tabs');
    tabs = $$('.nav-item');
    selectedTab = $('.nav-item.active');
    selectedLabel = $('#selected-tab');

    async getPage(): Promise<void> {
        await browser.get('#/tabs');
    }

    async getTabCount(): Promise<number> {
        return await this.tabs.count();
    }

    async getSelectedTab(): Promise<string> {
        return await this.selectedTab.getText();
    }

    async getSelectedTabContent(): Promise<string> {
        return (await this.getSelectedTabElement()).getText();
    }

    async getTabsetStyle(): Promise<string> {
        const classes = await this.tabset.getAttribute('class');

        return classes.includes('minimal-tab') ? 'minimal' : 'alternative';
    }

    async getTabsetStack(): Promise<string> {
        const classes = await this.tabsetHost.getAttribute('class');

        if (classes.includes('tabs-left')) {
            return 'left';
        }

        if (classes.includes('tabs-right')) {
            return 'right';
        }

        return 'none';
    }

    async clickTabAtIndex(index: number): Promise<void> {
        await this.tabs.get(index).click();
    }

    async pressKey(key: any): Promise<void> {
        return await browser.actions().sendKeys(key).perform();
    }

    async getSelectedLabelText(): Promise<string> {
        return await this.selectedLabel.getText();
    }

    async getSelectedTabElement(): Promise<ElementFinder> {
        return await $$('ux-tab > .tab-pane').filter(async pane => await pane.getCssValue('display') === 'block').first();
    }

}

