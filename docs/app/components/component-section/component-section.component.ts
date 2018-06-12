import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { documentationSectionNames } from '../../decorators/documentation-section-component';
import { ICodePen } from '../../interfaces/ICodePen';
import { ICodePenProvider, isICodePenProvider } from '../../interfaces/ICodePenProvider';
import { ILink } from '../../interfaces/ILink';
import { IPlunk } from '../../interfaces/IPlunk';
import { IPlunkProvider, isIPlunkProvider } from '../../interfaces/IPlunkProvider';
import { NavigationService } from '../../services/navigation/navigation.service';
import { ResolverService } from '../../services/resolver/resolver.service';
import { Usage } from './../../interfaces/Usage';

@Component({
    selector: 'uxd-component-section',
    templateUrl: './component-section.component.html',
    styleUrls: ['./component-section.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
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
            const factory = this._resolverService.resolveComponentFactory(component);
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
