export const getSelectInput = () => cy.get('ux-select input');
export const getPlaceholder = () => getSelectInput().invoke('attr', 'placeholder');
export const getTypeahead = () => cy.get('ux-typeahead');
export const getSelection = () => cy.get('#selectedLocation code');
export const getDropdownItems = () => getTypeahead().get('.ux-typeahead-option');
export const getDropdownItem = (index: number) => getTypeahead().get(`#dropdown-typeahead-option-${ index }`);
export const getPlaceholderInput = () => cy.get('#placeholder');
export const getPageSizeInput = () => cy.get('#pageSize-input');
export const getIcon = () => cy.get('.ux-select-icon');
export const getCloseBtn = () => cy.get('.ux-select-clear-icon');

export const setItemMode = (mode: SelectItemMode) => mode === SelectItemMode.Strings ?
    cy.get('ux-radio-button[option="strings"]').click() :
    cy.get('ux-radio-button[option="objects"]').click();

export const toggleMultipleSelect = () => cy.get('#checkbox1').click();
export const toggleDisabled = () => cy.get('#checkbox2').click();
export const toggleAllowNull = () => cy.get('#checkbox3').click();
export const togglePaging = () => cy.get('#checkbox4').click();
export const toggleCustomIcon = () => cy.get('#toggle-custom-icon').click();
export const toggleClearButton = () => cy.get('#toggle-clear-button').click();

export const removeTag = (index: number) => cy.get('.ux-tag-remove').eq(index).click();

export const enum SelectItemMode {
    Strings,
    Objects
}

export const setPlaceholder = (placeholder: string) => getPlaceholderInput().clear().type(placeholder);
export const setPageSize = (pageSize: number) => getPageSizeInput().clear().type(pageSize.toString());