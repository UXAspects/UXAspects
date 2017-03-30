export default function PdfService() {
    var vm = this;

    pdfMake.fonts = {
        SourceSansPro: {
            normal: 'SourceSansPro-Regular.ttf',
            bold: 'SourceSansPro-Bold.ttf'
        }
    };

    var defaultOptions = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: undefined,
        metadata: {
            title: 'Document',
            author: '',
            subject: '',
            keywords: '',
        }
    };

    vm.createTable = function(headers, rows, options) {

        // create the document in memory
        return pdfMake.createPdf(createDocumentDefinition(headers, rows, options));
    };

    function createDocumentDefinition(headers, rows, options) {

        var tableHeaders = headers.map(function(header) {
            return {
                text: header.title,
                style: 'tableHeader'
            };
        });

        var columnWidths = headers.map(function(header) {
            return header.width ? header.width : '*';
        });

        var tableRows = rows.map(function(row) {
            return headers.map(function(header) {

                // support functions for extracting the value
                if (typeof header.value === 'function') {
                    var value = header.value.call(null, row);

                    return value ? value.toString() : '';
                }

                return row[header.value].toString();
            });
        });

        // must use jquery extend to allow deep extend
        var tableOptions = {};

        $.extend(true, tableOptions, defaultOptions, options);

        var tableContent = [tableHeaders].concat(tableRows);

        var docDefinition = {
            pageOrientation: tableOptions.pageOrientation,
            pageSize: tableOptions.pageSize,
            info: tableOptions.metadata,
            pageMargins: tableOptions.pageMargins,
            content: [{
                style: 'table',
                table: {
                    headerRows: 1,
                    widths: columnWidths,
                    body: tableContent
                },
                layout: 'lightHorizontalLines'
            }],
            styles: {
                table: {
                    margin: [0, 5, 0, 15]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            },
            defaultStyle: {
                font: 'SourceSansPro'
            }
        };

        return docDefinition;
    }

    return vm;
}