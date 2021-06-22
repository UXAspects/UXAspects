import { $, browser } from 'protractor';
import { DashboardPage } from '../dashboard.po.spec';

export class DashboardDynamicLayoutPage extends DashboardPage {

    widget1ColIncrement = $('#widget-1-btns .column-btns .increment');
    widget1ColDecrement = $('#widget-1-btns .column-btns .decrement');
    widget1RowIncrement = $('#widget-1-btns .row-btns .increment');
    widget1RowDecrement = $('#widget-1-btns .row-btns .decrement');
    widget1BothIncrement = $('#widget-1-btns .both-btns .increment');
    widget1BothDecrement = $('#widget-1-btns .both-btns .decrement');

    widget4ColIncrement = $('#widget-4-btns .column-btns .increment');
    widget4ColDecrement = $('#widget-4-btns .column-btns .decrement');
    widget4RowIncrement = $('#widget-4-btns .row-btns .increment');
    widget4RowDecrement = $('#widget-4-btns .row-btns .decrement');
    widget4BothIncrement = $('#widget-4-btns .both-btns .increment');
    widget4BothDecrement = $('#widget-4-btns .both-btns .decrement');

    async getPage(): Promise<void> {
        await browser.get('#/dashboard/dynamic-layout');
    }

}
