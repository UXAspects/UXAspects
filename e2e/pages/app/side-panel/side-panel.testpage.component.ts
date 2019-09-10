import { Component } from '@angular/core';

@Component({
    selector: 'side-panel-app',
    templateUrl: 'side-panel.testpage.component.html',
    styles: [`
        .demo-side-panel-container {
            position: relative;
            width: 600px;
            height: 300px;
        }
        .demo-side-panel-container .demo-content {
            padding: 8px;
            overflow-y: auto;
        }
    `]
})

export class SidePanelTestPageComponent {
    open = false;
    inline = false;
    attachTo = 'window';
    width = '300px';
    top = '0';
    modal = false;
    closeOnExternalClick = false;
}
