import {
  Directive,
  EmbeddedViewRef,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({ selector: '[uxLayoutSwitcherItem]' })
export class LayoutSwitcherItemDirective {
  private readonly _templateRef = inject<TemplateRef<void>>(TemplateRef);

  private readonly _viewContainerRef = inject(ViewContainerRef);

  @Input('uxLayoutSwitcherItem') private readonly _config: LayoutSwitcherItem;

  private _embeddedView: EmbeddedViewRef<void>;

  getLayout(): TemplateRef<void> {
    return this._templateRef;
  }

  getConfig(): LayoutSwitcherItem {
    return this._config;
  }

  activate(): void {
    this._embeddedView = this._viewContainerRef.createEmbeddedView(this._templateRef);
  }

  deactivate(): void {
    const index = this._viewContainerRef.indexOf(this._embeddedView);
    this._viewContainerRef.remove(index);
    this._embeddedView = null;
  }
}

export interface LayoutSwitcherItem {
  group?: string;
  minWidth?: number;
  maxWidth?: number;
}
