operators: OperatorDefinitionList = {
    text: [
        { name: 'contains', label: 'contains', component: TextInputComponent },
        { name: 'matches', label: 'matches', component: CustomRegexInputComponent }
    ],
    date: [
        { name: 'equals', label: 'equals', component: DateInputComponent },
        { name: 'not_equals', label: 'does not equal', component: DateInputComponent }
    ]
};
