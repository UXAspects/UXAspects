import { NgModule } from '@angular/core';
import { InfiniteScrollLoadButtonDirective } from './infinite-scroll-load-button.directive';
import { InfiniteScrollLoadingDirective } from './infinite-scroll-loading.directive';
import { InfiniteScrollDirective } from './infinite-scroll.directive';

@NgModule({
  imports: [],
  exports: [
    InfiniteScrollDirective,
    InfiniteScrollLoadButtonDirective,
    InfiniteScrollLoadingDirective,
  ],
  declarations: [
    InfiniteScrollDirective,
    InfiniteScrollLoadButtonDirective,
    InfiniteScrollLoadingDirective,
  ],
  providers: [],
})
export class InfiniteScrollModule {}
