// generate the document
var document = $pdf.createTable(vm.columns, vm.rows, vm.options);

// download the document
document.download('output-filename-here.pdf');