(a: ColumnPickerGroupItem, b: ColumnPickerGroupItem) =>
    (a['name'] ?? a).localeCompare(b['name'] ?? b);
