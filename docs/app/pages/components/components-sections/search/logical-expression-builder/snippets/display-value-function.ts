displayValue = (value: any, fieldType?: string, fieldData?: any): string => {
    if (fieldType) {
        switch (fieldType) {
            case 'name':
                return value;
            case 'age':
                return `${ value } year(s)`;
            case 'date_of_birth':
                return formatDate(value, fieldData?.dateFormat ?? 'short', 'en-US');
            default:
                return value;
        }
    }
}
