import PdfService from './pdf.service.js';

import '../../plugins/pdfmake/pdfmake.min.js';
import '../../plugins/pdfmake/vfs_fonts.js';

angular.module('ux-aspects.pdfService', [])
    .service('$pdf', PdfService);