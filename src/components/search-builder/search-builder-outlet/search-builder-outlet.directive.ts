import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { delay, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SearchBuilderFocusService } from '../search-builder-focus.service';
import { SearchBuilderService } from '../search-builder.service';
import { BaseSearchComponent } from '../search-components/base-search.component';

@Directive({
    selector: '[uxSearchBuilderOutlet]'
})
export class SearchBuilderOutletDirective implements OnInit, OnDestroy {

    @Input('uxSearchBuilderOutlet') outlet: string;
    @Input('uxSearchBuilderOutletContext') context: any;
    @Input('uxSearchBuilderOutletGroupId') groupId: string;
    @Input('uxSearchBuilderOutletIndex') index: number;

    private _componentRef: ComponentRef<BaseSearchComponent>;
    private _onDestroy = new Subject<void>();

    constructor(
        private _viewContainerRef: ViewContainerRef,
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _searchBuilderService: SearchBuilderService,
        private _searchBuilderFocusService: SearchBuilderFocusService
    ) { }

    ngOnInit(): void {

        // get the class from the type
        const componentDefinition = this._searchBuilderService.getComponent(this.outlet);

        // create the component factory
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory<BaseSearchComponent>(componentDefinition.component);

        // create the component instance
        this._componentRef = this._viewContainerRef.createComponent(componentFactory);

        // combine the predefined config with any dynmaic config
        const config = Object.assign({}, componentDefinition.config, this.context.config || {});

        // set the context and config property on the component instance
        this._componentRef.instance.context = this.context;
        this._componentRef.instance.config = config;

        this._searchBuilderFocusService.focus$
            .pipe(distinctUntilChanged(), delay(0), takeUntil(this._onDestroy))
            .subscribe(focus => {
                this._componentRef.instance.focus = (focus.groupId === this.groupId && focus.index === this.index);
            });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
