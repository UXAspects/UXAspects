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
        .demo-side-panel-container.modal-open .demo-content {
            overflow-y: hidden;
        }
        .demo-side-panel-container .demo-content {
            padding: 8px;
            overflow: auto;
        }
        .demo-side-panel-container .demo-content .modal-open {
            overflow-y: scroll;
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
    preventBackgroundScroll = false;
}
