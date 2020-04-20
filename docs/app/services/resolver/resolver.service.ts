import { ComponentFactory, ComponentFactoryResolver, Injectable, Type } from '@angular/core';
import { IDocumentationPage } from '../../interfaces/IDocumentationPage';

@Injectable({
    providedIn: 'root'
})
export class ResolverService {

    private static resolvers: DocumentationResolver[] = [];

    registerResolver(resolver: ComponentFactoryResolver, components: Type<any>[]) {
        ResolverService.resolvers.push({ resolver, components });
    }

    resolveComponentFactory(component: Type<any>): ComponentFactory<any> {

        // try resolving component in all available modules
        for (const { resolver, components } of ResolverService.resolvers) {
            if (components.indexOf(component) !== -1) {
                return resolver.resolveComponentFactory(component);
            }
        }

        throw new Error('Component doesn not exist in any module: ' + component);
    }

    static resolveCategoryData(page: DocumentationPage, categoryTitle: string) {

        let data: IDocumentationPage;

        switch (page) {

            case DocumentationPage.Charts:
                data = require('../../data/charts-page.json');
                break;

            case DocumentationPage.Components:
                data = require('../../data/components-page.json');
                break;

            case DocumentationPage.Css:
                data = require('../../data/css-page.json');
                break;
        }

        // find the matching section
        let match = data.categories.find(category => category.title === categoryTitle);

        if (!match) {
            throw new Error(`The section "${categoryTitle}" does not exist!`);
        }

        return match;
    }
}

export enum DocumentationPage {
    Charts,
    Components,
    Css
}

export interface DocumentationResolver {
    resolver: ComponentFactoryResolver;
    components: Type<any>[];
}
