export default function thumbnail() {
    return {
        restrict: 'E',
        transclude: true,
        controller: 'ThumbnailCtrl as tc',
        scope: {
            url: '=?',
            show: '=?',
            width: '=?',
            height: '=?'
        },
        bindToController: true,
        template: require('./thumbnail.html')
    };
}