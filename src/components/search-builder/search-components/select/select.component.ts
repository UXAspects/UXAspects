import { Component, OnInit } from '@angular/core';
import { BaseSearchComponent } from '../base-search.component';

@Component({
  selector: 'ux-search-select',
  templateUrl: './select.component.html'
})
export class SearchSelectComponent extends BaseSearchComponent implements OnInit {

  type: string = 'select';
  label: string;

  /**
   * Provide defaults for undefined properties
   */
  get options() {
    return this.config.options || [];
  }

  get multiple(): boolean {
    return this.config.multiple || false;
  }

  get placeholder(): string {
    return this.config.placeholder || 'Select item';
  }

  get dropDirection(): string {
    return this.config.dropDirection || 'down';
  }

  get allowNull(): boolean {
    return this.config.allowNull || false;
  }

  get disabled(): boolean {
    return this.config.disabled || false;
  }

  get maxHeight(): string {
    return this.config.maxHeight || '250px';
  }

  get pageSize(): number {
    return this.config.pageSize || 20;
  }

  ngOnInit(): void {
    
  }
}