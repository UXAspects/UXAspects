import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-overflow-tooltip-ng1',
    templateUrl: './overflow-tooltip-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsOverflowTooltipNg1Component')
export class ComponentsOverflowTooltipNg1Component implements ICodePenProvider {
    
    private htmlCode = require('./snippets/sample.html');
    private cssCode = require('./snippets/sample.css');

    public codepen: ICodePen = {
        html: this.htmlCode,
        css: [this.cssCode]
    };

}