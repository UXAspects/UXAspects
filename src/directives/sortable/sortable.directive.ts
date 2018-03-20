import { Directive, Input, ElementRef, OnInit, ContentChildren, QueryList, OnDestroy, Output, EventEmitter, Renderer2, NgZone } from '@angular/core';
import * as dragula from 'dragula';
import { Drake } from 'dragula';
import { SortableHandleDirective } from './sortable-handle.directive';
import { SortableModelDirective } from './sortable-model.directive';

@Directive({
  selector: '[uxSortable]'
})
export class SortableDirective implements OnInit, OnDestroy {

  @Input() sortableModel: Array<any>;
  @Output() sortableModelChange = new EventEmitter<Array<any>>();
  @Output() sortStart = new EventEmitter<Element>();
  @Output() sortCancel = new EventEmitter<Element>();
  @Output() sortEnd = new EventEmitter<Element>();

  @ContentChildren(SortableHandleDirective, { read: ElementRef, descendants: true }) handles: QueryList<ElementRef>;
  @ContentChildren(SortableModelDirective) models: QueryList<SortableModelDirective>;

  private _instance: Drake;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2, private _ngZone: NgZone) { }

  /**
   * Initialise dragula and bind to all the required events
   */
  ngOnInit(): void {
    // for performance gains lets run this outside ng zone
    this._ngZone.runOutsideAngular(() => {
      this._instance = dragula([this._elementRef.nativeElement], { moves: this.canMove.bind(this) });
      this._instance.on('drag', (element: Element) => this._ngZone.run(() => this.sortStart.emit(element)));
      this._instance.on('cancel', (element: Element) => this._ngZone.run(() => this.sortCancel.emit(element)));
      this._instance.on('dragend', (element: Element) => this._ngZone.run(() => this.sortEnd.emit(element)));
      this._instance.on('dragend', this.onDragEnd.bind(this));
      this._instance.on('drop', this.onDrop.bind(this));
      this._instance.on('cloned', this.onClone.bind(this));
    });
  }

  /**
   * We need to destroy the dragula instance on component destroy
   */
  ngOnDestroy(): void {
    this._instance.destroy();
  }

  /**
   * This is fired when items get reordered - we need to emit the new order of the models
   */
  onDrop(element: Element, target: Element, source: Element, sibling: Element): void {

    // if there is no provided module we can skip this
    if (!this.sortableModel) {
      return;
    }

    // get the model of the element being moved
    const model = this.getModelFromElement(element);

    // remove this model from the list of models
    this.sortableModel = this.sortableModel.filter(_model => _model !== model);

    // get the position of sibling element
    const index = sibling ? this.sortableModel.indexOf(this.getModelFromElement(sibling)) : this.sortableModel.length;

    // re-insert the model at its new location
    this.sortableModel.splice(index, 0, model);

    // emit the model changes (inside zone)
    this._ngZone.run(() => this.sortableModelChange.emit(this.sortableModel));
  }

  /**
   * Return the model assciated with a particular element in the list.
   * This should ensure that the items have the draggable model directive applied
   */
  getModelFromElement(element: Element): any {
    const model = this.models.find(_model => _model.elementRef.nativeElement === element);
    
    if (!model) {
      throw new Error('All sortable items must have a uxSortableModel supplied');
    }

    return model.uxSortableModel;
  }

  /**
   * When we finish dragging remove the utillity class from the element being moved
   */
  onDragEnd(element: Element): void {
    this._renderer.removeClass(element, 'ux-sortable-moving');
  }

  /**
   * We want to ensure that the cloned element is identical
   * to the original, regardless of it's location in the DOM tree
   */
  onClone(clone: Element, element: Element, type: string): void {
    this.setStyles(element, clone);

    this._renderer.addClass(element, 'ux-sortable-moving');
  }

  /**
   * If elements contain handles then only drag when the handle is dragged
   * otherwise drag whenever an immediate child is specified
   */
  canMove(element: Element, container: Element, handle: Element): boolean {
    return this.handles.length === 0 ? true : !!this.handles.find(_handle => _handle.nativeElement === handle);
  }

  /**
   * This function will get all computed styles on the source element
   * and apply them inline to the target element and this will repeat for all 
   * all of its children. This ensures the element will be identical regardless
   * of the location in the DOM tree
   * @param source the element to get all the computed styles from
   * @param target the element to apply all the inline styles to - this should be a clone of the source element
   */
  private setStyles(source: Element, target: Element): void {

    // get all the computed styles on the source element
    const computed = getComputedStyle(source);

    // store evaluated styles to reduce reflow
    const styles = new Map<string, string>();

    // iterate each style
    for (let idx = 0; idx < computed.length; idx++) {

      // get the key and associated value
      const key = computed.item(idx);

      // store the value in an object that we can later loook them up without reflow
      styles.set(key, computed[key]);
    }

    // style children first - allows all style measuring to be done before style setting to minimise reflow
    for (let idx = 0; idx < source.childElementCount; idx++) {
      this.setStyles(source.children.item(idx), target.children.item(idx));
    }

    // apply styles here - after all measurements
    styles.forEach((value, key) => this._renderer.setStyle(target, key, value));

    // enforce the size to remain fixed - IE can resize if part of element is off screen
    this._renderer.setStyle(target, 'min-width', styles.get('width'));
    this._renderer.setStyle(target, 'min-height', styles.get('height'));
  }

}
