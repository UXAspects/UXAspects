import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { documentationSectionNames } from '../../decorators/documentation-section-component';
import { ILink } from '../../interfaces/ILink';
import { IPlayground } from '../../interfaces/IPlayground';
import { IPlaygroundProvider, isIPlaygroundProvider } from '../../interfaces/IPlaygroundProvider';
import { NavigationService } from '../../services/navigation/navigation.service';
import { ResolverService } from '../../services/resolver/resolver.service';
import { Usage } from './../../interfaces/Usage';

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

    @ViewChild('container', { read: ViewContainerRef, static: true }) viewContainer: ViewContainerRef;

    playground: IPlayground;
    deprecatedLink: ILink;
    hybridModuleTs: string = require('!!raw-loader!./snippets/hybrid-module.ts');

    constructor(
        private _resolverService: ResolverService,
        private _navigationService: NavigationService
    ) { }

    ngOnInit(): void {
        const component = documentationSectionNames[this.componentName];

        if (component) {
            const factory = this._resolverService.resolveComponentFactory(component);
            const componentRef = this.viewContainer.createComponent(factory);

            if (isIPlaygroundProvider(componentRef.instance)) {
                this.playground = (<IPlaygroundProvider>componentRef.instance).playground;
            }
        } else {
            console.warn(`ComponentSectionComponent: ${this.componentName} cannot be resolved - decorate component with @DocumentationSectionComponent.`);
        }

        if (this.deprecatedFor) {
            this.deprecatedLink = this._navigationService.getComponentLink(this.deprecatedFor);
        }
    }
}
