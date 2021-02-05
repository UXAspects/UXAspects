import {Component, Input, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DashboardModule} from '../../dashboard';
import {DashboardPredefinedWidgetsModule} from '../dashboard-predefined-widgets.module';
import {DashboardTextWidgetComponent} from './dashboard-text-widget.component';

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget elit libero. Praesent placerat iaculis urna, ac iaculis ipsum consectetur quis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc nec faucibus magna, vel condimentum elit. Mauris auctor purus ut risus mattis, non pharetra sem ornare. Etiam interdum elementum elit, ut vulputate eros vestibulum nec. Fusce sed odio finibus justo mattis aliquam. Curabitur pulvinar, elit sit amet mollis feugiat, augue justo consectetur augue, sed elementum metus orci ac risus. Mauris elementum, tellus malesuada porttitor convallis, ligula ligula pulvinar diam, vitae ornare sapien velit at nulla.';

@Component({
    selector: 'ux-text-widget-test-component',
    template: `
        <ux-dashboard>
            <ux-dashboard-text-widget id="widget-text" name="Text Widget" heading="Text Widget"
                                      fixedMode="false" colSpan="3" rowSpan="4"
                                      [text]="loremIpsum" editable="true">
            </ux-dashboard-text-widget>
        </ux-dashboard>
    `
})
export class DashboardTextWidgetTestComponent {
    loremIpsum: string = loremIpsum;
    @ViewChild(DashboardTextWidgetComponent) widget: DashboardTextWidgetComponent;
}

describe('Text Widget', () => {
    let component: DashboardTextWidgetTestComponent;
    let fixture: ComponentFixture<DashboardTextWidgetTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DashboardModule, DashboardPredefinedWidgetsModule],
            declarations: [DashboardTextWidgetTestComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardTextWidgetTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();
        expect(component.widget).toBeTruthy();
    });

    it('should set inputs correctly', () => {
        expect(component.widget.fixedMode).toEqual(false);
        expect(component.widget.colSpan).toEqual(3);
        expect(component.widget.rowSpan).toEqual(4);
        expect(component.widget.id).toEqual('widget-text');
        expect(component.widget.name).toEqual('Text Widget');
        expect(component.widget.heading).toEqual('Text Widget');

        expect(component.widget.text).toEqual(loremIpsum);
        expect(component.widget.editable).toEqual(true);
        expect(component.widget.editLabel).toEqual('Edit');
        expect(component.widget.showFullTextLabel).toEqual('Show full text');
        expect(component.widget.saveLabel).toEqual('Save');
        expect(component.widget.cancelLabel).toEqual('Cancel');
    });
});
