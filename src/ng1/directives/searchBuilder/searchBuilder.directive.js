export default function searchBuilder() {
    return {
        restrict: 'E',
        controller: 'SearchBuilderCtrl',
        controllerAs: 'sb',
        scope: {
            searchQuery: '=',
            components: '=',
            valid: '='
        }
    };
}