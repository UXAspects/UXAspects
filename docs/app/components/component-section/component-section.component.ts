import { Usage } from './../../interfaces/Usage';
import { Component, Input, ViewChild, ViewContainerRef, AfterViewInit, OnInit } from '@angular/core';
import { documentationSectionNames } from '../../decorators/documentation-section-component';
import { ICodePenProvider, isICodePenProvider } from '../../interfaces/ICodePenProvider';
import { ICodePen } from '../../interfaces/ICodePen';
import { IPlunkProvider, isIPlunkProvider } from '../../interfaces/IPlunkProvider';
import { IPlunk } from '../../interfaces/IPlunk';
import { ResolverService } from '../../services/resolver/resolver.service';
import { ILink } from '../../interfaces/ILink';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
    selector: 'uxd-component-section',
    templateUrl: './component-section.component.html',
    styleUrls: ['./component-section.component.less']
})
export class ComponentSectionComponent implements OnInit {

    @Input() id: string;
    @Input() title: string;
    @Input() componentName: string;
    @Input() version: string;
    @Input() hybrid: boolean = false;
    @Input() deprecated: boolean = false;
    @Input() deprecatedFor: string;
    @Input() externalUrl: string;
    @Input() usage: Usage[];

    @ViewChild('container', { read: ViewContainerRef }) viewContainer: ViewContainerRef; 
    
    codepen: ICodePen;
    plunk: IPlunk;
    deprecatedLink: ILink;

    hybridModuleTs: string = require('!!raw-loader!./snippets/hybrid-module.ts');
    
    constructor(private _resolverService: ResolverService,
        private _navigationService: NavigationService) { }

    ngOnInit() {
        const component = documentationSectionNames[this.componentName];

        if (component) {
            let factory = this._resolverService.resolveComponentFactory(component);
            
            const componentRef = this.viewContainer.createComponent(factory);

            if (isICodePenProvider(componentRef.instance)) {
                this.codepen = (<ICodePenProvider>componentRef.instance).codepen;
            } else if (isIPlunkProvider(componentRef.instance)) {
                this.plunk = (<IPlunkProvider>componentRef.instance).plunk;
            }
        } else {
            console.warn(`ComponentSectionComponent: ${this.componentName} cannot be resolved - decorate component with @DocumentationSectionComponent.`);
        }

        if (this.deprecatedFor) {
            this.deprecatedLink = this._navigationService.getComponentLink(this.deprecatedFor);
        }
    }
}
