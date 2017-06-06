import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ScrollIntoViewService {

    scrollIntoView(elem: HTMLElement, scrollParent: HTMLElement) {
        if (elem.offsetTop < scrollParent.scrollTop) {
            scrollParent.scrollTop = elem.offsetTop;
        } else {
            const offsetBottom = elem.offsetTop + elem.offsetHeight;
            if (offsetBottom > (scrollParent.scrollTop + scrollParent.clientHeight)) {
                scrollParent.scrollTop = offsetBottom - scrollParent.clientHeight;
            }
        }
    }
}