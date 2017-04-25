export class MainController {

    sorters = {
        title: 'Sort by',
        options: [{
            name: 'NAME',
            sort: 'document',
            default: false,
            iconClass: 'hpe-icon hpe-actions',
            disabled: true
        }, {
            name: 'DATE MODIFIED (earliest)',
            sort: 'date',
            default: false,
            iconClass: 'hpe-icon hpe-manual',
            disabled: false           
        }, {
            name: 'DATE MODIFIED (latest)',
            sort: 'date',
            orderDesc: true,
            default: true,
            iconClass: 'hpe-icon hpe-3d',
            disabled: false            
        }]
    };
}