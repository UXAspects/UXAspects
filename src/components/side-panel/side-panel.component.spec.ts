import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { SidePanelModule } from './side-panel.module';
import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    selector: 'app-page-side-panel',
    template: `<div>
        <div class="page-content">
            <div class="wrapper-content">
                <div class="ebox">
                    <h2 class="m-t-nil">Side Panel Example</h2>
                </div>
            </div>
        </div>

        <ux-side-panel [(open)]="panelOpen"
                       [top]="top"
                       [width]="width"
                       [animate]="animate"
                       (openChange)="onToggleChange()">

            <div class="ux-side-panel-header">
                <h2>Side Panel</h2>
            </div>

            <div class="ux-side-panel-content">
                <p> Lorem ipsum dolor sit amet, utinam ornatus ea pro. Vim ad diam velit apeirian, ei has.</p>
            </div>

            <div class="ux-side-panel-footer btn-container">
                <button type="button"
                        class="ux-panel-toggle"
                        aria-label="Toggle the side panel"
                        (click)="panelOpen = !panelOpen">
                    Toggle Side Panel
                </button>
            </div>

        </ux-side-panel>

    </div>`
})
export class SidePanelTestComponent {

    panelOpen = true;
    width = '300px';
    top = '56px';
    animate = true;

    onToggleChange(): void {}
}

describe('Side Panel Component', () => {
    let component: SidePanelTestComponent;
    let fixture: ComponentFixture<SidePanelTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async( () => {
        TestBed.configureTestingModule({
            imports: [SidePanelModule, NoopAnimationsModule],
            declarations: [SidePanelTestComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidePanelTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it ('should open the side panel on load when open is set to true initially', async () => {
        // set up a spy for the onToggleChange function
        spyOn(component, 'onToggleChange');

        // find the side panel container
        const sidePanelContainer: HTMLElement = nativeElement.querySelector('.ux-side-panel-content');
        expect(sidePanelContainer).toBeTruthy();

        expect(component.onToggleChange).not.toHaveBeenCalled();

    });

    it ('should remain closed initially when open is set to false', async () => {
        component.panelOpen = false;
        fixture.detectChanges();
        await fixture.whenStable();
        // set up a spy for the onToggleChange function
        spyOn(component, 'onToggleChange');

        // find the side panel container
        const sidePanelContainer: HTMLElement = nativeElement.querySelector('.ux-side-panel-content');
        expect(sidePanelContainer).toBeFalsy();

        expect(component.onToggleChange).not.toHaveBeenCalled();

    });

    it ('should emit event on closing side panel', async () => {
        // find the toggle button
        const toggleButton: HTMLElement = nativeElement.querySelector('.ux-panel-toggle');
        expect(toggleButton).toBeTruthy();

        // set up a spy for the onToggleChange function
        spyOn(component, 'onToggleChange');
        toggleButton.click();
        fixture.detectChanges();

        expect(component.onToggleChange).toHaveBeenCalled();
    });

});