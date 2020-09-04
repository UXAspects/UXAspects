fields: FieldDefinition[] = [
    { name: 'name', label: 'Name', fieldType: 'text' },
    { name: 'date_of_birth', label: 'Date of birth', fieldType: 'date', data: { dateFormat: 'short' } },
    {
        name: 'gender',
        label: 'Gender',
        fieldType: 'enum',
        data: {
            options: [
                { name: 'male', label: 'Male' },
                { name: 'female', label: 'Female' },
                { name: 'diverse', label: 'Non-binary' }
            ],
            validateFunction: (value: string[]): boolean => value.length > 0
        }
    }
];
