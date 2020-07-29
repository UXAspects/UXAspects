sort = (a: string | ColumnPickerGroupItem, b: string | ColumnPickerGroupItem) =>
    (a['name'] ?? a).localeCompare(b['name'] ?? b);
