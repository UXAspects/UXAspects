import { ScrollAdapter } from './scroll.adapter';

export class WindowScrollAdapter extends ScrollAdapter {

    constructor() {
        super();

        // store references to the elements
        this.window = angular.element(window);
        this.body = angular.element(document.body);

        // bind to the scroll event
        this.window.on('scroll', this.scroll.bind(this));

        // inform the consumer than the listener is ready
        this.notify('initialised');
    }

    getScrollbarVisible() {
        return this.body.height() <= this.window.height();
    }

    /**
     * When scrolled calulcate the percentage we have scrolled
     */
    scroll() {
        const position = this.element.scrollTop() + this.element.height();
        const height = angular.innerHeight();
        const percentage = (position / height) * 100;

        // notify all the subscribers
        this.notify('scroll', percentage);
    }

    /**
     * Clean up after ourselves
     */
    destroy() {
        this.window.off('scroll', this.scroll);
        super.destroy();
    }
}