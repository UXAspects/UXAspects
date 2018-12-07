export class TreeGridNavigationController {

    constructor() {
        /** @type {ReadonlyArray<TreeGridNavigationItemController>} */
        this.items = [];
    }

    /**
     * Insert an item into the list of items
     * @param {TreeGridNavigationItemController} item
     */
    insert(item) {
        this.items = [...this.items, item];
    }

    /**
     * Remove and item from the list of items
     * @param {TreeGridNavigationItemController} item
     */
    remove(item) {
        this.items = this.items.filter(_item => _item !== item);
    }

    focusFirst(event) {
        // get the first item in the list
        const first = this.items.reduceRight((previous, current) => current.isDisabled || previous.index < current.index ? previous : current);

        // focus the item
        this.focus(event, first.index);
    }

    focusLast(event) {

        // get the last item in the list
        const last = this.items.reduce((previous, current) => current.isDisabled || previous.index > current.index ? previous : current);

        // focus the item
        this.focus(event, last.index);
    }

    /**
     * Focus a tree grid item
     * @param {KeyboardEvent} event - the source event
     * @param {number} index - the current focused index
     * @param {number} offset - the number of items to try and skip
     */
    focus(event, index, offset = 0) {

        if (offset === 0) {
            const target = this.getItemAtIndex(index);

            if (target) {
                target.focus(event);
            }
            return;
        }

        // get all enabled items in the correct order
        const items = this.items.filter(item => !item.isDisabled).sort((a, b) => a.index - b.index);

        // get the position in the array of the starting item
        const currentIndex = items.findIndex(item => item.index === index);

        // select the most apropriate item
        const targetIndex = offset < 0 ? Math.max(0, currentIndex + offset) : Math.min(items.length - 1, currentIndex + offset);

        // focus the target item
        this.focus(event, items[targetIndex].index);
    }

    /**
     * Get item at index
     * @param {number} index
     */
    getItemAtIndex(index) {
        return this.items.find(item => item.index === index);
    }

}