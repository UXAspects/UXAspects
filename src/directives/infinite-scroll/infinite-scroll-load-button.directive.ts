import {
  Directive,
  inject,
  Input,
  Output,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Directive({ selector: '[uxInfiniteScrollLoadButton]' })
export class InfiniteScrollLoadButtonDirective {
  private readonly _template = inject<TemplateRef<void>>(TemplateRef);

  private readonly _viewContainer = inject(ViewContainerRef);

  private readonly _renderer = inject(Renderer2);

  @Input('uxInfiniteScrollLoadButton')
  get visible() {
    return this._visible;
  }
  set visible(value: boolean) {
    if (value !== this._visible) {
      if (value) {
        const viewRef = this._viewContainer.createEmbeddedView(this._template);
        this._renderer.listen(viewRef.rootNodes[0], 'click', this.onClick.bind(this));
      } else {
        this._viewContainer.clear();
      }
    }

    this._visible = value;
  }

  @Output() loading: Observable<Event>;

  private _visible: boolean = false;
  private readonly _load = new Subject();

  constructor() {
    this.loading = this._load.asObservable() as Observable<Event>;
  }

  private onClick(event: MouseEvent) {
    this._load.next(event);
  }
}
