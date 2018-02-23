import { browser, element, by, ElementFinder } from 'protractor';

export class DashboardPage {
        
    getPage(): void {
        browser.get('#/dashboard');
    }
    
    container = element(by.id('dashboardWidgetContainer'));
    
    getNumberOfWidgets() {
        return this.container.$('div.dashboard-container').$$('ux-dashboard-widget').count();
    }
    
    getWidget(index: number) {
        return this.container.$('div.dashboard-container').$$('ux-dashboard-widget').get(index);
    }
    
    getWidgetAttribute(widget: ElementFinder, attribute: string) {
        return widget.getAttribute(attribute);
    }

    // Extract and return the left, top, width or height values from the element's 'style' attribute
    getWidgetLocationValue(widget: ElementFinder, soughtValue: string) {
        return this.getWidgetAttribute(widget, 'style').then(function(styleValue: string) {
            var pattern = '.*' + soughtValue + ':\\s*(\\d+)px;';
            var regexp = new RegExp(pattern, 'i');
            var match = regexp.exec(styleValue);
            return Number(match[1]);
        });
    }
}

