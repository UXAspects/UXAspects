import {
  Directive,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { DragService, UxDragEvent } from './drag.service';

@Directive({
  selector: '[uxDrop]',
  host: {
    '[class.ux-drop-hover]': 'isMouseOver && isDragging && !dropDisabled',
  },
  standalone: false,
})
export class DropDirective<T = unknown> implements OnDestroy {
  private readonly _dragService = inject<DragService<T>>(DragService);

  /** Define a specific group of dragged items to listen to */
  @Input() group: string | string[];

  /** Define whether or not dropping is enabled */
  @Input() dropDisabled: boolean = false;

  /** Emit the model of the item dropped */
  @Output() onDrop = new EventEmitter<T>();

  /** Determine whether or not the mouse is within the drop region */
  isMouseOver: boolean = false;

  /** Determine whether or not we are currently dragging an item */
  isDragging: boolean = false;

  /** Store the group of the dragged item */
  private _group: string;

  /** Ensure we destroy all subscriptions */
  private readonly _onDestroy = new Subject<void>();

  constructor() {
    // subscribe to drag events
    this._dragService.onDragStart
      .pipe(
        tap(event => (this._group = event.group)),
        filter(event => this.isDropAllowed(event.group)),
        takeUntil(this._onDestroy)
      )
      .subscribe(this.onDragStart.bind(this));

    this._dragService.onDragEnd
      .pipe(
        filter(event => this.isDropAllowed(event.group)),
        takeUntil(this._onDestroy)
      )
      .subscribe(this.onDragEnd.bind(this));
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /** Update the mouse over state */
  @HostListener('mouseenter')
  onMouseOver(): void {
    if (this.isDropAllowed(this._group)) {
      this.isMouseOver = true;

      // emit that we are over a drop area
      this._dragService.onDropEnter.next();
    }
  }

  /** Update the mouse over state */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    // always ensure this value is reset
    this.isMouseOver = false;

    // only emit the dropd leave event when appropriate
    if (this.isDropAllowed(this._group)) {
      this._dragService.onDropLeave.next();
    }
  }

  /** Update the dragging state */
  onDragStart(): void {
    this.isDragging = true;
  }

  /** Update the dragging state */
  onDragEnd(event: UxDragEvent<T>): void {
    // update the dragging state
    this.isDragging = false;

    // clear the cached group
    this._group = null;

    // if the mouse is over and it is in an allowed group emit the dop event
    if (this.isMouseOver && this.isDropAllowed(event.group)) {
      this.onDrop.emit(event.data);
      this._dragService.onDrop.next(event.data);
    }
  }

  /** Determine whether or not the event is part of the specified groups */
  private isDropAllowed(group: string): boolean {
    // if dropping is disabled then it is never allowed
    if (this.dropDisabled) {
      return false;
    }

    // if no group specified allow all groups
    if (!this.group) {
      return true;
    }

    // if it is an array then ensure it is allowed
    if (Array.isArray(this.group)) {
      return !!this.group.find(_group => _group === group);
    }

    return this.group === group;
  }
}
