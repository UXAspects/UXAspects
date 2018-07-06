export class SingleLineOverflowController {

    constructor($timeout, $resize, $element, $scope, $document) {
        this.$resize = $resize;
        this.$element = $element;
        this.$scope = $scope;
        this.$body = $document.find('body');

        // once the directive have finished initialising then initialise
        $timeout(this.onInit.bind(this));

        // ensure we teardown correctly
        $element.on('$destroy', this.onDestroy.bind(this));
        $scope.$on('$destroy', this.onDestroy.bind(this));

        // when hovered check whether or not we should show the tooltip
        $element.on('mouseenter', this.update.bind(this));
    }

    /** Once the element is ready set up the tooltip */
    onInit() {

        // create the tooltip on the element
        this.create();

        // apply the initial styles to keep it on one line and show ellipsis
        this.setStyles();

        // perform the initial check to see if there is any overflow
        this.update();

        // set up out event handlers
        this.$resize.bind(this.$element.get(0), this.update.bind(this));

        // create a mutation observer to watch all contents
        this.observer = new MutationObserver(this.update.bind(this));

        // begin watching the element
        this.observer.observe(this.$element.get(0), { characterData: true, subtree: true });
    }

    /** Tear down the component and stop watching events */
    onDestroy() {

        // this function may get called twice - once when scope is destroyed, once when the element is destroyed
        if (this.destroyed === true) {
            return;
        }

        // store the destroyed state
        this.destroyed = true;

        // stop watching the contents of the element
        this.observer.disconnect();

        // remove the tooltip
        this.$element.tooltip('destroy');

        // unbind from the resize events
        this.$resize.unbind(this.$element.get(0), this.update.bind(this));
    }

    /** Create the tooltip */
    create() {
        this.$element.tooltip({ title: this.$element.text(), container: 'body ' });
    }

    /** Apply the styling required to show an ellipsis */
    setStyles() {

        // determine the display type of the element as we can't support inline
        if (this.$element.css('display') === 'inline') {
            this.$element.css('display', 'inline-block');
        }

        // apply the style to keep it on one line and show ellipsis
        this.$element.css({
            overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'
        });
    }

    update() {
        // ensure the text is up to date
        this.$element.tooltip({ title: this.$element.text() });

        // enable or disable the tooltip based on whether or not this is overflow
        this.$element.tooltip(this.isOverflowing() ? 'enable' : 'disable');
    }

    isOverflowing() {

        // create a clone of the text element but remove any size limitations so we can measure the content
        const clone = this.$element.clone()
            .css({ display: 'inline', width: 'auto', visibility: 'hidden' })
            .appendTo(this.$body);

        const width = clone.width();

        // remove the clone element
        clone.remove();

        // determine if there is any overflow
        return width > this.$element.width();
    }
}

SingleLineOverflowController.$inject = ['$timeout', '$resize', '$element', '$scope', '$document'];
