import { ScrollAdapter } from './scroll.adapter';

export class ElementScrollAdapter extends ScrollAdapter {

    constructor(element) {
        super(element);

        // bind to the scroll event
        this.element.on('scroll', this.scroll.bind(this));

        // inform the consumer that the scrollbar is initialised
        this.notify('initialised');
    }

    getScrollbarVisible() {
        return this.element.get(0).clientHeight !== 0 && 
               this.element.get(0).scrollHeight <= this.element.get(0).clientHeight;
    }

    scroll() {
        const position = this.element.scrollTop() + this.element.innerHeight();
        const height = this.element.get(0).scrollHeight;
        const percentage = (position / height) * 100;

        this.notify('scroll', percentage);
    }

    destroy() {
        this.element.off('scroll', this.scroll);
        super.destroy();
    }

}