import { Injectable, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { Routes } from '@angular/router';
import { IDocumentationPage } from '../../interfaces/IDocumentationPage';
import { DocumentationCategoryComponent } from '../../components/documentation-category/documentation-category.component';

@Injectable()
export class ResolverService {

    private static resolvers: ComponentFactoryResolver[] = [];

    constructor() { }

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

    // Function to load routes from JSON data
    public static resolveRouteComponents(data: IDocumentationPage): Routes {
        let routes: Routes = [];

        for (let category of data.categories) {

            if (routes.length === 0) {
                routes.push({ path: '', redirectTo: category.link, pathMatch: 'full' });
            }
            routes.push({ path: category.link, component: DocumentationCategoryComponent, data: { category: category } });
        }

        return routes;
    }
}