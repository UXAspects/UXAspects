export class PageComponent {
    components: SearchBuilderComponentDefinition[] = [
        {
            name: 'number',
            component: MyNumberSearchComponent
        }
    ];

    query: SearchBuilderQuery = {
        numbers: [
            {
                type: 'number',
                value: 0
            },
            {
                type: 'number',
                value: 22
            }
        ]
    };
}