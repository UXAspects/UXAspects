export default function backButton() {
    return {
        restrict: 'E',
        template: require('./backButton.html'),
        replace: true,
        scope: {
            ariaLabel: '@'
        }
    };
}