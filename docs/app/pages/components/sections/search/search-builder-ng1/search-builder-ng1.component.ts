import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-search-builder-ng1',
    templateUrl: './search-builder-ng1.component.html',
    styleUrls: ['./search-builder-ng1.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsSearchBuilderNg1Component')
export class ComponentsSearchBuilderNg1Component {
    
    // simulate the structure of the base component - without loading the raw unprismified files
    private snippets = {
        compiled: {
            addFieldPanelHtml: require('!!prismjs-loader?lang=html!./snippets/addFieldPanel.html'),
            addFieldPanelJs: require('!!prismjs-loader?lang=javascript!./snippets/addFieldPanel.js'),
            authorComponentHtml: require('!!prismjs-loader?lang=html!./snippets/authorComponent.html'),
            componentArrayExampleJs: require('!!prismjs-loader?lang=javascript!./snippets/componentArray.example.js'),
            controllerJs: require('!!prismjs-loader?lang=javascript!./snippets/controller.js'),
            custodianComponentHtml: require('!!prismjs-loader?lang=html!./snippets/custodianComponent.html'),
            custodianComponentJs: require('!!prismjs-loader?lang=javascript!./snippets/custodianComponent.js'),
            custodianPanelHtml: require('!!prismjs-loader?lang=html!./snippets/custodianPanel.html'),
            custodianPanelJs: require('!!prismjs-loader?lang=javascript!./snippets/custodianPanel.js'),
            dateRangeComponentHtml: require('!!prismjs-loader?lang=html!./snippets/dateRangeComponent.html'),
            dateRangeComponentJs: require('!!prismjs-loader?lang=javascript!./snippets/dateRangeComponent.js'),
            fileNameComponentHtml: require('!!prismjs-loader?lang=html!./snippets/fileNameComponent.html'),
            fileTypesComponentHtml: require('!!prismjs-loader?lang=html!./snippets/fileTypesComponent.html'),
            fileTypesComponentJs: require('!!prismjs-loader?lang=javascript!./snippets/fileTypesComponent.js'),
            fileTypesPanelHtml: require('!!prismjs-loader?lang=html!./snippets/fileTypesPanel.html'),
            fileTypesPanelJs: require('!!prismjs-loader?lang=javascript!./snippets/fileTypesPanel.js'),
            keywordComponentHtml: require('!!prismjs-loader?lang=html!./snippets/keywordComponent.html'),
            layoutHtml: require('!!prismjs-loader?lang=html!./snippets/layout.html'),
            modalControllerJs: require('!!prismjs-loader?lang=javascript!./snippets/modalController.js'),
            modalLayoutExampleHtml: require('!!prismjs-loader?lang=html!./snippets/modalLayout.example.html'),
            modalLayoutHtml: require('!!prismjs-loader?lang=html!./snippets/modalLayout.html'),
            repositoryComponentHtml: require('!!prismjs-loader?lang=html!./snippets/repositoryComponent.html'),
            repositoryComponentJs: require('!!prismjs-loader?lang=javascript!./snippets/repositoryComponent.js'),
            repositoryPanelHtml: require('!!prismjs-loader?lang=html!./snippets/repositoryPanel.html'),
            repositoryPanelJs: require('!!prismjs-loader?lang=javascript!./snippets/repositoryPanel.js'),
            searchBuilderIdServiceJs: require('!!prismjs-loader?lang=javascript!./snippets/searchBuilderIdService.js'),      
            searchBuilderPanelServiceJs: require('!!prismjs-loader?lang=javascript!./snippets/searchBuilderPanelService.js'),
            searchGroupExampleHtml: require('!!prismjs-loader?lang=html!./snippets/searchGroup.example.html'),
            searchQueryExampleJs: require('!!prismjs-loader?lang=javascript!./snippets/searchQuery.example.js'),
            stylesCss: require('!!prismjs-loader?lang=css!./snippets/styles.css'),
            textComponentHtml: require('!!prismjs-loader?lang=html!./snippets/textComponent.html'),
        }
    };

}
