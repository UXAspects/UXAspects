import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { documentationSectionNames } from '../../decorators/documentation-section-component';
import { ILink } from '../../interfaces/ILink';
import { IPlayground } from '../../interfaces/IPlayground';
import { isIPlaygroundProvider } from '../../interfaces/IPlaygroundProvider';
import { SiteThemeId } from '../../interfaces/SiteTheme';
import { NavigationService } from '../../services/navigation/navigation.service';
import { ResolverService } from '../../services/resolver/resolver.service';
import { SiteThemeService } from '../../services/site-theme/site-theme.service';
import { isBaseDocumentationSection } from '../base-documentation-section/base-documentation-section';
import { Usage } from './../../interfaces/Usage';

@Component({
    selector: 'uxd-component-section',
    templateUrl: './component-section.component.html',
    styleUrls: ['./component-section.component.less']
})
export class ComponentSectionComponent<T> implements OnInit, OnDestroy {

    @Input() id: string;
    @Input() title: string;
    @Input() componentName: string;
    @Input() version: string;
    @Input() hybrid: boolean = false;
    @Input() deprecated: boolean = false;
    @Input() deprecatedFor: string;
    @Input() externalUrl: string;
    @Input() usage: Usage[];
    @Input() schematic: string;

    @ViewChild('container', { read: ViewContainerRef, static: true }) viewContainer: ViewContainerRef;

    playground: IPlayground;
    deprecatedLink: ILink;
    hybridModuleTs: string = require('!!raw-loader!./snippets/hybrid-module.ts');

    private _documentationSection: T;
    private _onDestroy = new Subject<void>();

    constructor(
        private _resolverService: ResolverService,
        private _navigationService: NavigationService,
        private _siteThemeService: SiteThemeService
    ) { }

    ngOnInit(): void {
        const component = documentationSectionNames[this.componentName];

        if (!component) {
            console.warn(`ComponentSectionComponent: ${this.componentName} cannot be resolved - decorate component with @DocumentationSectionComponent.`);
            return;
        }

        const factory = this._resolverService.resolveComponentFactory(component);
        const componentRef = this.viewContainer.createComponent<T>(factory);
        this._documentationSection = componentRef.instance;

        this.setTheme(this._siteThemeService.theme$.getValue());

        this._siteThemeService.theme$
            .pipe(takeUntil(this._onDestroy))
            .subscribe(this.setTheme.bind(this));

        if (this.deprecatedFor) {
            this.deprecatedLink = this._navigationService.getComponentLink(this.deprecatedFor);
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    private setTheme(theme: SiteThemeId): void {
        // Some sections without snippets don't extend BaseDocumentationSection, ignore those
        if (isBaseDocumentationSection(this._documentationSection)) {
            this._documentationSection.onThemeChange(theme);
            this.updatePlayground();
        }
    }

    private updatePlayground(): void {
        if (isIPlaygroundProvider(this._documentationSection)) {
            if (typeof this._documentationSection.playground === 'function') {
                this.playground = this._documentationSection.playground();
            } else {
                this.playground = this._documentationSection.playground;
            }
        }
    }
}
