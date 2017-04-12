import { Component, Input, ViewChild, ViewContainerRef, AfterViewInit, OnInit } from '@angular/core';

import { documentationSectionNames } from '../../decorators/documentation-section-component';
import { ICodePenProvider, isICodePenProvider } from '../../interfaces/ICodePenProvider';
import { ICodePen } from '../../interfaces/ICodePen';
import { IPlunkProvider, isIPlunkProvider } from '../../interfaces/IPlunkProvider';
import { IPlunk } from '../../interfaces/IPlunk';
import { ResolverService } from '../../services/resolver/resolver.service';

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
    @Input() deprecated: boolean = false;
    @Input() externalUrl: string;

    @ViewChild('container', { read: ViewContainerRef }) viewContainer: ViewContainerRef; 
    
    private codepen: ICodePen;
    private plunk: IPlunk;
    
    constructor(private resolverService: ResolverService) { }

    ngOnInit() {
        const component = documentationSectionNames[this.componentName];

        if (component) {
            let factory = this.resolverService.resolveComponentFactory(component);
            
            const componentRef = this.viewContainer.createComponent(factory);

            if (isICodePenProvider(componentRef.instance)) {
                this.codepen = (<ICodePenProvider>componentRef.instance).codepen;
            } else if (isIPlunkProvider(componentRef.instance)) {
                this.plunk = (<IPlunkProvider>componentRef.instance).plunk;
            }
        } else {
            console.warn(`ComponentSectionComponent: ${this.componentName} cannot be resolved - decorate component with @DocumentationSectionComponent.`);
        }
    }
}
