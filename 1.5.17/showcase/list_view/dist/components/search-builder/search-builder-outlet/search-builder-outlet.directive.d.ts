import { ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { SearchBuilderService } from '../search-builder.service';
export declare class SearchBuilderOutletDirective implements OnInit {
    private _viewContainerRef;
    private _componentFactoryResolver;
    private _searchBuilderService;
    uxSearchBuilderOutlet: string;
    uxSearchBuilderOutletContext: any;
    private _componentRef;
    constructor(_viewContainerRef: ViewContainerRef, _componentFactoryResolver: ComponentFactoryResolver, _searchBuilderService: SearchBuilderService);
    ngOnInit(): void;
}
