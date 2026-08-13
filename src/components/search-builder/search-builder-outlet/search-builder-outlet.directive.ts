///
/// Copyright 2015-2026 Micro Focus or one of its affiliates.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///      http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { delay, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { SearchBuilderFocusService } from '../search-builder-focus.service';
import { SearchBuilderService } from '../search-builder.service';
import { BaseSearchComponent } from '../search-components/base-search.component';

@Directive({ selector: '[uxSearchBuilderOutlet]' })
export class SearchBuilderOutletDirective implements OnInit, OnDestroy {
  private readonly _viewContainerRef = inject(ViewContainerRef);

  private readonly _componentFactoryResolver = inject(ComponentFactoryResolver);

  private readonly _searchBuilderService = inject(SearchBuilderService);

  private readonly _searchBuilderFocusService = inject(SearchBuilderFocusService);

  @Input('uxSearchBuilderOutlet') outlet: string;

  @Input('uxSearchBuilderOutletContext') context: any;
  @Input('uxSearchBuilderOutletGroupId') groupId: string;
  @Input('uxSearchBuilderOutletIndex') index: number;

  private _componentRef: ComponentRef<BaseSearchComponent>;
  private readonly _onDestroy = new Subject<void>();

  ngOnInit(): void {
    // get the class from the type
    const componentDefinition = this._searchBuilderService.getComponent(this.outlet);

    // create the component factory
    const componentFactory =
      this._componentFactoryResolver.resolveComponentFactory<BaseSearchComponent>(
        componentDefinition.component
      );

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
        this._componentRef.instance.focus =
          focus.groupId === this.groupId && focus.index === this.index;
      });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
