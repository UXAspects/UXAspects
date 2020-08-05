sort = (a: ColumnPickerGroupItem, b: ColumnPickerGroupItem) => {
    const aCombined = a.group ? `${a.group}${a.name}` : a.name;
    const bCombined = b.group ? `${b.group}${b.name}` : b.name;
    return aCombined.localeCompare(bCombined);
};
