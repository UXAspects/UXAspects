import { ScrollAdapter } from './scroll.adapter';

export class ScrollPaneAdapter extends ScrollAdapter {

    constructor(element) {
        super(element);

        this.initialised = false;

        // listen for scroll events
        this.element.on('jsp-scroll-y', this.scroll.bind(this));

        // wait for scrollbar to be ready
        this.element.on('jsp-initialised', () => {
            this.initialised = true;
            this.notify('initialised');
        });
    }

    getScrollbarVisible() {

        if (!this.initialised) {
            return false;
        }

        const scrollpane = this.element.data('jsp');

        // force reinitialise to ensure we get the correct value
        scrollpane.reinitialise();

        // return the scrollable state
        return scrollpane.getIsScrollableV();
    }

    scroll() {

        if (!this.initialised) {
            return;
        }

        const percentage = this.element.data('jsp').getPercentScrolledY() * 100;
        this.notify('scroll', percentage);
    }

    destroy() {
        this.element.off('jsp-scroll-y', this.scroll);
        super.destroy();
    }

}