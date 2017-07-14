import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ScrollIntoViewService {

    scrollIntoView(elem: HTMLElement, scrollParent: HTMLElement) {
        const offsetTop = (elem.getBoundingClientRect().top + scrollParent.scrollTop) - scrollParent.getBoundingClientRect().top;
        if (offsetTop < scrollParent.scrollTop) {
            scrollParent.scrollTop = offsetTop;
        } else {
            const offsetBottom = offsetTop + elem.offsetHeight;
            if (offsetBottom > (scrollParent.scrollTop + scrollParent.clientHeight)) {
                scrollParent.scrollTop = offsetBottom - scrollParent.clientHeight;
            }
        }
    }
}