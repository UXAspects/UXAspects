import { Injectable, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { Routes } from '@angular/router';
import { IDocumentationPage } from '../../interfaces/IDocumentationPage';
import { DocumentationCategoryComponent } from '../../components/documentation-category/documentation-category.component';

@Injectable()
export class ResolverService {

    private static resolvers: ComponentFactoryResolver[] = [];

    public registerResolver(resolver: ComponentFactoryResolver) {
        ResolverService.resolvers.push(resolver);
    }

    public resolveComponentFactory(component: any): ComponentFactory<any> {

        // try resolving component in all available modules
        for (let resolver of ResolverService.resolvers) {
            try {
                let componentFactory = resolver.resolveComponentFactory(component);
                return componentFactory;
            } catch (err) { }
        }

        throw new Error('Component doesn not exist in any module: ' + component);
    }

    public static resolveCategoryData(page: DocumentationPage, categoryTitle: string) {

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
            throw new Error(`The section "${ categoryTitle }" does not exist!`);
        }

        return match;
    }
}

export enum DocumentationPage {
    Charts,
    Components,
    Css
}