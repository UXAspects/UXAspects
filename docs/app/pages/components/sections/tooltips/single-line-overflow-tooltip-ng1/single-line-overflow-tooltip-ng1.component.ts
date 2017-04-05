import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-single-line-overflow-tooltip-ng1',
    templateUrl: './single-line-overflow-tooltip-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsSingleLineOverflowTooltipNg1Component')
export class ComponentsSingleLineOverflowTooltipNg1Component implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');
    private cssCode = require('./snippets/sample.css');

    public codepen: ICodePen = {
        html: this.htmlCode,
        css: [this.cssCode]
    };
    
}