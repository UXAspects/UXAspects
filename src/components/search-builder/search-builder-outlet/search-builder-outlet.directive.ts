import { Directive, OnInit, Type, Input, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { SearchBuilderService } from '../search-builder.service';

@Directive({
    selector: '[uxSearchBuilderOutlet]'
})
export class SearchBuilderOutletDirective implements OnInit {

    @Input() uxSearchBuilderOutlet: string;
    @Input() uxSearchBuilderOutletContext: any;

    private _componentRef: ComponentRef<any>;

    constructor(
        private _viewContainerRef: ViewContainerRef,
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _searchBuilderService: SearchBuilderService
    ) { }

    ngOnInit(): void {

        // get the class from the type
        const componentDefinition = this._searchBuilderService.getComponent(this.uxSearchBuilderOutlet);

        // create the component factory
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentDefinition.component);

        // create the component instance
        this._componentRef = this._viewContainerRef.createComponent(componentFactory);

        // combine the predefined config with any dynmaic config
        const config = Object.assign({}, componentDefinition.config, this.uxSearchBuilderOutletContext.config || {});

        // set the context and config property on the component instance
        this._componentRef.instance.context = this.uxSearchBuilderOutletContext;
        this._componentRef.instance.config = config;
    }
}
