export class ListHoverActionCtrl {

    constructor($scope, $element) {
        this.$scope = $scope;
        this.$element = $element;

        this.isFocused = false;
        this.hoverActions = $scope.$parent.lh.hoverActions;
        this.iconBase = this.icon && this.icon.indexOf('hp-') === -1 ? 'hpe-icon' : 'hp-icon';

        // when the user first mouses over the action only then should we add a tooltip
        $scope.$evalAsync(() => $element.one('mouseenter', this.setupTooltip.bind(this)));

        // register the hover action in the parent service
        this.hoverActions.register(this);

        // unregister if this item is removed
        $scope.$on('$destroy', () => this.hoverActions.unregister(this));
    }

    setupTooltip() {
        this.$element.tooltip({ title: this.name, trigger: 'hover' });
        this.$element.tooltip('show');
    }

    focus() {
        this.$element.focus();
    }

    // on focus, set to true for this action
    onFocus() {
        this.hoverActions.onFocus(this);
    }

    // on blur, set to false for this action
    onBlur() {
        this.hoverActions.onBlur(this);
    }

    // on click call the scope click function
    onClick() {
        if (typeof this.$scope.click === 'function') {
            this.click();
        }
    }
}

ListHoverActionCtrl.$inject = ["$scope", "$element"];