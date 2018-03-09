components: SearchBuilderComponentDefinition[] = [
    {
        name: 'author',
        component: SearchTextComponent,
        config: {
            label: 'Author',
            placeholder: 'Enter an Author'
        } as SearchTextConfig
    },
    {
        name: 'custodian',
        component: SearchSelectComponent,
        config: {
            label: 'Custodian',
            placeholder: 'Select Custodians',
            options: [...]
            multiple: true
        } as SearchSelectConfig
    },
    {
        name: 'date-range',
        component: SearchDateRangeComponent,
        config: {
            label: 'Date range'
        } as SearchDateRangeConfig
    }
];