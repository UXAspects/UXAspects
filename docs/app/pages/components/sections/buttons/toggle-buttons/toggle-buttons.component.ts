import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunkProvider } from './../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-components-buttons-toggle-buttons',
    templateUrl: './toggle-buttons.component.html'
})
@DocumentationSectionComponent('ComponentsToggleButtonsComponent')
export class ComponentsToggleButtonsComponent extends BaseDocumentationSection implements IPlunkProvider {

    // Toggle model
    public primaryToggleValue: number = 0;
    public accentToggleValue: string = 'off';

    // Check model
    public primaryCheckValue = {
        bold: false,
        italic: true,
        underline: false
    };
    public accentCheckValue = {
        bold: false,
        italic: true,
        underline: false
    };

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