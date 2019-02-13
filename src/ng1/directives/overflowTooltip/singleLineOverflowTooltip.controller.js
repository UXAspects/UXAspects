export class SingleLineOverflowController {

    constructor($element, $scope, $document) {
        this.$element = $element;
        this.$body = $document.find('body');
        this.title = null;

        // apply the initial styles to keep it on one line and show ellipsis
        this.setStyles();

        // once the directive have finished initialising then create the tooltip
        requestAnimationFrame(this.create.bind(this));

        // ensure we teardown correctly
        $element.on('$destroy', this.onDestroy.bind(this));
        $scope.$on('$destroy', this.onDestroy.bind(this));

        // when hovered check whether or not we should show the tooltip
        $element.on('mouseenter', this.update.bind(this));
    }

    /** Tear down the component and stop watching events */
    onDestroy() {

        // this function may get called twice - once when scope is destroyed, once when the element is destroyed
        if (this.destroyed === true) {
            return;
        }

        // store the destroyed state
        this.destroyed = true;

        // remove the tooltip
        this.$element.tooltip('destroy');
    }

    /** Create the tooltip */
    create() {
        this.$element.tooltip({ title: this.$element.text(), container: 'body ' });
        this.$element.tooltip('disable');

        // store the current text so we can detect when the tooltip needs updated
        this.title = this.$element.text();
    }

    /** Apply the styling required to show an ellipsis */
    setStyles() {

        // determine the display type of the element as we can't support inline
        if (this.$element.css('display') === 'inline') {
            this.$element.css('display', 'inline-block');
        }

        // apply the style to keep it on one line and show ellipsis
        this.$element.css({ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' });
    }

    update() {

        // ensure the text is up to date
        if (this.title !== this.$element.text()) {

            // store the latest text so we can detect when we need to update the tooltip
            this.title = this.$element.text();

            // Workaround for https://github.com/twbs/bootstrap/issues/21830
            this.onTooltipHidden(() => {
                // destroy the old tooltip
                this.$element.tooltip('destroy');

                // create the new updated tooltip
                this.$element.tooltip({ title: this.$element.text(), container: 'body ' });
            });
        }

        // enable or disable the tooltip based on whether or not this is overflow
        this.$element.tooltip(this.isOverflowing() ? 'enable' : 'disable');
    }

    isOverflowing() {

        // create a clone of the text element but remove any size limitations so we can measure the content
        const clone = this.$element.clone()
            .css({ display: 'inline', width: 'auto', visibility: 'hidden' })
            .appendTo(this.$body);

        const width = clone.width();
        const actualWidth = this.$element.width();

        // remove the clone element
        clone.remove();

        // determine if there is any overflow
        return width > actualWidth;
    }

    /**
     * This is a workaround for the issue in the Bootstrap 3
     * tooltip destroy code: https://github.com/twbs/bootstrap/issues/21830
     * They are no longer developing Bootstrap v3 and will not fix this issue.
     *
     * The issue occurs when the tooltip destroy function is called before the
     * tooltip hide animation completes.
     *
     * This allows us to ensure the tooltip animation completes immediatetly
     * (and more importantly synchronously) so we can then avoid the error
     */
    onTooltipHidden(callback) {

        // store the current transition settings
        const settings = $.support.transition;

        // ensure that there is not tooltip transition
        $.support.transition = null;

        // call the callback to perform what we need to in this transitionless state
        callback.call();

        // restore the tooltip transitions
        $.support.transition = settings;
    }
}

SingleLineOverflowController.$inject = ['$element', '$scope', '$document'];
