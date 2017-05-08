import { Component } from '@angular/core';
import { IPlunkProvider } from './../../../../../interfaces/IPlunkProvider';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-buttons-radio-buttons',
    templateUrl: './radio-buttons.component.html'
})
@DocumentationSectionComponent('ComponentsRadioButtonsComponent')
export class ComponentsRadioButtonsComponent extends BaseDocumentationSection implements IPlunkProvider {

    // Radio model
    public primaryRadioValue = 'left';
    public accentRadioValue = 'left';

    public plunk: IPlunk = {
        files: {}
    };

    constructor() {
        super(
            null, // require.context('!!prismjs-loader?lang=html!./snippets/', false, /\.html$/),
            null, // require.context('!!prismjs-loader?lang=css!./snippets/', false, /\.css$/),
            null, // require.context('!!prismjs-loader?lang=javascript!./snippets/', false, /\.js$/),
            null, // require.context('!!prismjs-loader?lang=typescript!./snippets/', false, /\.ts$/),
            require.context('./snippets/', false, /\.(html|css|js|ts)$/)
        );
    }
}