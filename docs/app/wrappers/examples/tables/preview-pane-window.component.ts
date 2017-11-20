import '../../../pages/components/components-sections/tables/preview-pane-window-ng1/wrapper/preview-pane-window-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-preview-pane-window-wrapper'
})
export class PreviewPaneWindowComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdPreviewPaneWindowWrapper', elementRef, injector);
    }
}