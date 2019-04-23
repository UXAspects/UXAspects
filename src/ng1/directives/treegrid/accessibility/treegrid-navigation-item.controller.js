import { DOWN_ARROW, END, ESCAPE, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';

export class TreeGridNavigationItemController {

    /**
     * @param {ng.IScope} $scope
     * @param {ng.IAttributes} $attrs
     * @param {JQuery} $element
     */
    constructor($scope, $attrs, $element) {

        /** @type {any} */
        this.data = $scope.$eval($attrs.treegridNavigationItem);

        /** @type { number } */
        this.index = $scope.$eval($attrs.treegridNavigationItemIndex);

        /** @type { boolean } */
        this.isDisabled = $scope.$eval($attrs.treegridNavigationItemDisabled);

        /** @type {JQuery} */
        this.$element = $element;

        /** @type {ng.IScope} */
        this.$scope = $scope;

        /** @type {ng.IAttributes} */
        this.$attrs = $attrs;

        /** @type {TreeGridNavigationController} */
        this.navigationCtrl = null;

        // setup all event bindings
        $scope.$evalAsync(() => this.addEventListeners());
    }

    /**
     * Set the controller so we can communicate between components
     * @param {TreeGridNavigationController} navigationCtrl
     */
    onInit(navigationCtrl) {
        this.navigationCtrl = navigationCtrl;
    }

    addEventListeners() {
        this.$element.on('keydown', this.onKeydown.bind(this));

        // cleanup on destroy
        this.$scope.$on('$destroy', this.onDestroy.bind(this));
    }

    onDestroy() {
        this.$element.off('keydown', this.onKeydown.bind(this));
    }

    /**
     * @param {boolean} shouldEmit
     * @param {KeyboardEvent} event
     */
    focus(event) {

        // check if the table row is currently select
        if (document.activeElement === this.$element.get(0)) {
            return;
        }

        // focus the DOM element
        this.$element.focus();

        // emit an event indicating this element has been focused
        this.$element.trigger({
            type: 'treegrid-navigation-focused',
            shiftKey: event ? event.shiftKey : false,
            ctrlKey: event ? event.ctrlKey : false
        });
    }

    blur() {
        this.$element.blur();
    }

    /**
     * Handle key presses
     * @param {KeyboardEvent} event
     */
    onKeydown(event) {

        switch (event.which) {

            case UP_ARROW:
                this.navigationCtrl.focus(event, this.index, -1);
                break;

            case DOWN_ARROW:
                this.navigationCtrl.focus(event, this.index, 1);
                break;

            case RIGHT_ARROW:
                this.expand();
                break;

            case LEFT_ARROW:
                this.contract();
                break;

            case HOME:
                this.navigationCtrl.focusFirst(event);
                break;

            case END:
                this.navigationCtrl.focusLast(event);
                break;

            case PAGE_UP:
                this.navigationCtrl.focus(event, this.index, -10);
                break;

            case PAGE_DOWN:
                this.navigationCtrl.focus(event, this.index, 10);
                break;

            case ESCAPE:
                this.blur();
                break;
        }

        event.preventDefault();
    }

    expand() {
        if (this.$attrs.treegridExpand) {
            // make the expansion and update the UI
            this.$scope.$apply(() => this.$scope.$eval(this.$attrs.treegridExpand));

            // we must focus the index rather than the actual element as ng-repeat will create a new DOM node
            this.navigationCtrl.focus(null, this.index);
        }
    }

    contract() {
        if (this.$attrs.treegridContract) {
            // make the contraction and update the UI
            this.$scope.$apply(() => this.$scope.$eval(this.$attrs.treegridContract));

            // we must focus the index rather than the actual element as ng-repeat will create a new DOM node
            this.navigationCtrl.focus(null, this.index);
        }
    }

}

TreeGridNavigationItemController.$inject = ['$scope', '$attrs', '$element'];