logicalOperators: LogicalOperatorDefinition[] = [
    { name: 'and', label: 'and', minNumberOfChildren: 2, errorMessage: '\'and\' needs at least two children.' },
    { name: 'or', label: 'or', minNumberOfChildren: 2, errorMessage: '\'or\' needs at least two children.' },
    { name: 'not', label: 'not', maxNumberOfChildren: 1, minNumberOfChildren: 1, errorMessage: '\'not\' needs exactly one child.' }
];
