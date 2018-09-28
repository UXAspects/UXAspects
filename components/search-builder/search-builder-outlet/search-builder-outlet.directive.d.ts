import { ComponentFactoryResolver, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { SearchBuilderFocusService } from '../search-builder-focus.service';
import { SearchBuilderService } from '../search-builder.service';
export declare class SearchBuilderOutletDirective implements OnInit, OnDestroy {
    private _viewContainerRef;
    private _componentFactoryResolver;
    private _searchBuilderService;
    private _searchBuilderFocusService;
    outlet: string;
    context: any;
    groupId: string;
    index: number;
    private _componentRef;
    private _onDestroy;
    constructor(_viewContainerRef: ViewContainerRef, _componentFactoryResolver: ComponentFactoryResolver, _searchBuilderService: SearchBuilderService, _searchBuilderFocusService: SearchBuilderFocusService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
