angular.module('app').directive('uxdThumbnailWrapper', () => {
    return {
        restrict: 'E',
        template: require('./thumbnail-wrapper.directive.html'),
        controller: ['$templateCache', function ($templateCache) {
            var vm = this;

            vm.show = false;
            vm.flipShow = true;

            vm.thumbnails = [{
                url: 'assets/img/thumbnails/excel.png',
                icon: 'excel-icon',
                title: 'Results.xls',
                type: 'Excel',
                size: '101.3 KB'
            }, {
                url: '',
                icon: 'word-icon',
                title: 'Overview.doc',
                type: 'Word',
                size: '31.7 KB'
            }, {
                url: 'assets/img/thumbnails/pdf.png',
                icon: 'pdf-icon',
                title: 'Archiving Edge.pdf',
                type: 'PDF',
                size: '1.5 MB'
            }];

            vm.flippableThumbnails = [{
                url: 'assets/img/thumbnails/html.png',
                icon: 'html-icon',
                title: 'Example home page for document finder site.html',
                type: 'HTML',
                size: '3.1 KB'
            }, {
                url: '',
                icon: 'email-icon',
                title: 'Recent discussion.msg',
                type: 'Email',
                size: '1.7 KB'
            }, {
                url: 'assets/img/thumbnails/powerpoint.png',
                icon: 'powerpoint-icon',
                title: 'Using the Slide Library for PowerPoint Presentations.ppt',
                type: 'PowerPoint',
                size: '2.4 MB'
            }];
        }],
        controllerAs: 'vm'
    };
});
