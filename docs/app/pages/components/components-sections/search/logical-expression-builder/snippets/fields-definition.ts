fields: FieldDefinition[] = [
    { name: 'name', label: 'Name', fieldType: 'text' },
    { name: 'date_of_birth', label: 'Date of birth', fieldType: 'date', configuration: { dateFormat: 'short' } },
    {
        name: 'gender',
        label: 'Gender',
        fieldType: 'enum',
        configuration: {
            options: [
                { name: 'male', label: 'Male' },
                { name: 'female', label: 'Female' },
                { name: 'non-binary', label: 'Non-binary' }
            ],
            validateFunction: (value: string[]): boolean => value.length > 0
        }
    }
];
