angular.module('app').controller('PdfServiceCtrl', PdfServiceCtrl);

PdfServiceCtrl.$inject = ['$pdf'];

function PdfServiceCtrl($pdf) {
    var vm = this;

    vm.columns = [{
        title: 'Name',
        value: 'name',
        width: '*'
    }, {
        title: 'Author',
        value: function(data) {
            return data.author;
        },
        width: '*'
    }, {
        title: 'Date Modified',
        value: 'date',
        width: '*'
    }, {
        title: 'Work Completed (%)',
        value: 'completed',
        width: '*'
    }, {
        title: 'Status',
        value: 'status',
        width: '*'
    }];

    vm.rows = [];

    for (var i = 0; i < 200; i++) {
        vm.rows.push({
            name: 'Document ' + i,
            author: chance.name(),
            date: chance.date({
                string: true,
                year: 2016
            }),
            completed: chance.integer({
                min: 0,
                max: 100
            }),
            status: chance.bool() ? 'Active' : 'Inactive'
        });
    }

    vm.createTable = function () {

        // create the document
        var document = $pdf.createTable(vm.columns, vm.rows, {});

        // download the document
        document.download('document.pdf');
    };
}