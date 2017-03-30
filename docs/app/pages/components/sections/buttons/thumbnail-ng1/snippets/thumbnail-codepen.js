angular.module('app').controller('ThumbnailDemoCtrl', ThumbnailDemoCtrl);

function ThumbnailDemoCtrl() {
    var vm = this;

    vm.show = false;
    vm.flipShow = true;

    vm.thumbnails = [{
        url: 'https://pages.github.hpe.com/ashley-glenn-hunter/ux-aspects/assets/img/thumbnails/excel.png',
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
        url: 'https://pages.github.hpe.com/ashley-glenn-hunter/ux-aspects/assets/img/thumbnails/pdf.png',
        icon: 'pdf-icon',
        title: 'Archiving Edge.pdf',
        type: 'PDF',
        size: '1.5 MB'
    }];

    vm.flippableThumbnails = [{
        url: 'https://pages.github.hpe.com/ashley-glenn-hunter/ux-aspects/assets/img/thumbnails/html.png',
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
        url: 'https://pages.github.hpe.com/ashley-glenn-hunter/ux-aspects/assets/img/thumbnails/powerpoint.png',
        icon: 'powerpoint-icon',
        title: 'Using the HPE Slide Library for PowerPoint Presentations.ppt',
        type: 'PowerPoint',
        size: '2.4 MB'
    }];
}
