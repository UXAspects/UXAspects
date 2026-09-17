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

import { ColumnSortingDirective, ColumnSortingState } from './column-sorting.directive';

describe('Column Sorting Directive', () => {
  let directive: ColumnSortingDirective;
  let eventSpy: jasmine.Spy;

  beforeEach(() => {
    directive = new ColumnSortingDirective();
    eventSpy = spyOn(directive.events, 'next');
  });

  it('should sort column (single sort)', () => {
    directive.singleSort = true;

    directive.toggleColumn({ key: 'name-column', state: ColumnSortingState.Descending });
    expect(eventSpy).toHaveBeenCalledWith([
      { key: 'name-column', state: ColumnSortingState.Descending },
    ]);
    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(directive.order).toEqual([{ key: 'name-column', state: ColumnSortingState.Descending }]);

    directive.toggleColumn({ key: 'name-column', state: ColumnSortingState.Ascending });
    expect(eventSpy).toHaveBeenCalledWith([
      { key: 'name-column', state: ColumnSortingState.Ascending },
    ]);
    expect(eventSpy).toHaveBeenCalledTimes(2);
    expect(directive.order).toEqual([{ key: 'name-column', state: ColumnSortingState.Ascending }]);

    directive.toggleColumn({ key: 'name-column', state: ColumnSortingState.NoSort });
    expect(eventSpy).toHaveBeenCalledWith([]);
    expect(eventSpy).toHaveBeenCalledTimes(3);
    expect(directive.order).toEqual([]);
  });

  it('should sort column (multi sort)', () => {
    directive.singleSort = false;

    directive.toggleColumn({ key: 'name-column', state: ColumnSortingState.Descending });
    expect(eventSpy).toHaveBeenCalledWith([
      { key: 'name-column', state: ColumnSortingState.Descending },
    ]);
    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(directive.order).toEqual([{ key: 'name-column', state: ColumnSortingState.Descending }]);

    directive.toggleColumn({ key: 'name-column', state: ColumnSortingState.Ascending });
    expect(eventSpy).toHaveBeenCalledWith([
      { key: 'name-column', state: ColumnSortingState.Ascending },
    ]);
    expect(eventSpy).toHaveBeenCalledTimes(2);
    expect(directive.order).toEqual([{ key: 'name-column', state: ColumnSortingState.Ascending }]);

    directive.toggleColumn({ key: 'name-column', state: ColumnSortingState.NoSort });
    expect(eventSpy).toHaveBeenCalledWith([]);
    expect(eventSpy).toHaveBeenCalledTimes(3);
    expect(directive.order).toEqual([]);
  });

  it('should sort multiple columns (single sort)', () => {
    directive.singleSort = true;
    directive.toggleColumn({ key: 'name-column', state: ColumnSortingState.Descending });
    expect(eventSpy).toHaveBeenCalledWith([
      { key: 'name-column', state: ColumnSortingState.Descending },
    ]);
    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(directive.order).toEqual([{ key: 'name-column', state: ColumnSortingState.Descending }]);

    directive.toggleColumn({ key: 'author-column', state: ColumnSortingState.Ascending });
    expect(eventSpy).toHaveBeenCalledWith([
      { key: 'author-column', state: ColumnSortingState.Ascending },
    ]);
    expect(eventSpy).toHaveBeenCalledTimes(2);
    expect(directive.order).toEqual([
      { key: 'author-column', state: ColumnSortingState.Ascending },
    ]);

    directive.toggleColumn({ key: 'date-column', state: ColumnSortingState.NoSort });
    expect(eventSpy).toHaveBeenCalledWith([]);
    expect(eventSpy).toHaveBeenCalledTimes(3);
    expect(directive.order).toEqual([]);
  });

  it('should sort multiple columns (multi sort)', () => {
    directive.singleSort = false;

    directive.toggleColumn({ key: 'name-column', state: ColumnSortingState.Descending });
    expect(eventSpy).toHaveBeenCalledWith([
      { key: 'name-column', state: ColumnSortingState.Descending },
    ]);
    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(directive.order).toEqual([{ key: 'name-column', state: ColumnSortingState.Descending }]);

    directive.toggleColumn({ key: 'author-column', state: ColumnSortingState.Ascending });
    expect(eventSpy).toHaveBeenCalledWith([
      { key: 'name-column', state: ColumnSortingState.Descending },
      { key: 'author-column', state: ColumnSortingState.Ascending },
    ]);
    expect(eventSpy).toHaveBeenCalledTimes(2);
    expect(directive.order).toEqual([
      { key: 'name-column', state: ColumnSortingState.Descending },
      { key: 'author-column', state: ColumnSortingState.Ascending },
    ]);

    directive.toggleColumn({ key: 'date-column', state: ColumnSortingState.NoSort });
    expect(eventSpy).toHaveBeenCalledWith([
      { key: 'name-column', state: ColumnSortingState.Descending },
      { key: 'author-column', state: ColumnSortingState.Ascending },
    ]);
    expect(eventSpy).toHaveBeenCalledTimes(3);
    expect(directive.order).toEqual([
      { key: 'name-column', state: ColumnSortingState.Descending },
      { key: 'author-column', state: ColumnSortingState.Ascending },
    ]);

    directive.toggleColumn({ key: 'name-column', state: ColumnSortingState.NoSort });
    expect(eventSpy).toHaveBeenCalledWith([
      { key: 'author-column', state: ColumnSortingState.Ascending },
    ]);
    expect(eventSpy).toHaveBeenCalledTimes(4);
    expect(directive.order).toEqual([
      { key: 'author-column', state: ColumnSortingState.Ascending },
    ]);
  });

  it('should allow an initial sort state (single sort)', () => {
    directive.singleSort = true;

    directive.setColumnState('name-column', ColumnSortingState.NoSort);
    expect(eventSpy).not.toHaveBeenCalled();
    expect(directive.order).toEqual([]);

    directive.setColumnState('name-column', ColumnSortingState.Ascending);
    expect(eventSpy).not.toHaveBeenCalled();
    expect(directive.order).toEqual([{ key: 'name-column', state: ColumnSortingState.Ascending }]);

    directive.setColumnState('name-column', ColumnSortingState.Descending);
    expect(eventSpy).not.toHaveBeenCalled();
    expect(directive.order).toEqual([{ key: 'name-column', state: ColumnSortingState.Descending }]);

    directive.setColumnState('author-column', ColumnSortingState.Descending);
    expect(eventSpy).not.toHaveBeenCalled();
    expect(directive.order).toEqual([
      { key: 'author-column', state: ColumnSortingState.Descending },
    ]);
  });

  it('should allow an initial sort state (multi sort)', () => {
    directive.singleSort = false;

    directive.setColumnState('name-column', ColumnSortingState.NoSort);
    expect(eventSpy).not.toHaveBeenCalled();
    expect(directive.order).toEqual([]);

    directive.setColumnState('name-column', ColumnSortingState.Ascending);
    expect(eventSpy).not.toHaveBeenCalled();
    expect(directive.order).toEqual([{ key: 'name-column', state: ColumnSortingState.Ascending }]);

    directive.setColumnState('name-column', ColumnSortingState.Descending);
    expect(eventSpy).not.toHaveBeenCalled();
    expect(directive.order).toEqual([{ key: 'name-column', state: ColumnSortingState.Descending }]);

    directive.setColumnState('author-column', ColumnSortingState.Descending);
    expect(eventSpy).not.toHaveBeenCalled();
    expect(directive.order).toEqual([
      { key: 'name-column', state: ColumnSortingState.Descending },
      { key: 'author-column', state: ColumnSortingState.Descending },
    ]);
  });
});
