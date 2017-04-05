vm.options = {
    linkHoverHL: true,
    linkTooltip: {
      show: true,
      label: 'items'
    },
    col: {
        headerLabelSpacing: 0,
        paddingTop: 0,
        paddingBottom: 0,
        headerLabelLength: 18
    },
    block: {
        minWidth: 120,
        minHeight: 70,
        calloutData: {
            topLeft: { key: 'datasize', nodeLabel: false, defaultShow: false, valueUnit: 'B', label: 'data', binary: true },
            topRight: { key: 'value', nodeLabel: false, defaultShow: true, valueUnit: null, label: 'items' },
            bottomRight: { },
            bottomLeft: { key: 'name', nodeLabel: true, defaultShow: true }
        }
    },
    overflow: {
        tooltip: {
            label: 'items',
            showTooltip:true
        }
    },
    showColNumber: true
};