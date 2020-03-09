import { getDropdownItem, getDropdownItems, getSelectInput, getSelection, getSelectPlaceholder, getTypeahead, removeTag, SelectItemMode, setItemMode, toggleDisabled, toggleMultipleSelect } from '../support/select.po';

describe('Select Component', () => {
    beforeEach(() => cy.visit('/select'));

    it('should have the correct initial values (single select)', () => {
        // should not have any initial text
        getSelectInput().should('have.value', '');

        // should not display an open dropdown
        getTypeahead().should('not.have.class', 'open');

        // should not have any initial selected item(s)
        getSelection().should('have.text', 'null');

        // should show the correct placeholder
        getSelectPlaceholder().should('equal', 'Select a country');

        // perform a screenshot comparison
        cy.matchImageSnapshot('select-initial');
    });

    it('should toggle dropdown (single select)', () => {

        // open the select dropdown
        getSelectInput().click();

        // should not display an open dropdown
        getTypeahead().should('have.class', 'open');

        // open the select dropdown
        getSelectInput().click();

        // should not display an open dropdown
        getTypeahead().should('not.have.class', 'open');
    });

    it('should display the correct list items (single select)', () => {

        // open the select dropdown
        getSelectInput().click();

        // should show the correct text
        getDropdownItem(0).should('have.text', 'United States');
        getDropdownItem(1).should('have.text', 'United Kingdom');
        getDropdownItem(2).should('have.text', 'Afghanistan');

        // should not select an item just because we opened the dropdown
        getSelection().should('have.text', 'null');

        // perform a screenshot comparison
        cy.matchImageSnapshot('select-dropdown-open');
    });

    it('should allow selection using the keyboard (single select)', () => {

        // perform the keyboard actions
        getSelectInput()
            .focus() // focus the input element to receive keyboard input
            .type('{downarrow}') // open the menu using the arrow key
            .type('{downarrow}') // navigate to the second item
            .type('{enter}'); // perform a selection

        // check the selection has been made
        getSelectInput().should('have.value', 'United Kingdom');
        getSelection().should('contain.text', 'United Kingdom');
    });

    it('should allow selection using the mouse (single select)', () => {
        // open the menu
        getSelectInput().click();

        // select a menu item
        getDropdownItem(3).click();

        // check that the selection has been made
        getSelectInput().should('have.value', 'Aland Islands');
        getSelection().should('contain.text', 'Aland Islands');
    });

    it('should handle overflow correctly (single select)', () => {
        // open the menu
        getSelectInput().click();

        // select a menu item
        getDropdownItem(250).click();

        // perform a screenshot comparison
        cy.matchImageSnapshot('select-overflow');
    });

    it('should filter and highlight the list when typing (single select)', () => {

        // type some text into the select component (lower case)
        getSelectInput().type('united');

        // should filter the number of visible options
        getDropdownItems().should('have.length', 5);

        // perform a screenshot comparison
        cy.matchImageSnapshot('select-filter-hightlight');

        // type some text into the select component (upper case)
        getSelectInput().clear().type('Q');

        // should filter the number of visible options
        getDropdownItems().should('have.length', 7);

        // type some text into the select component (space)
        getSelectInput().clear().type(' ');

        // should filter the number of visible options
        getDropdownItems().should('have.length', 82);

        // type some text into the select component (hypen)
        getSelectInput().clear().type('-');

        // should filter the number of visible options
        getDropdownItems().should('have.length', 2);

        // type some text into the select component (comma)
        getSelectInput().clear().type(',');

        // should filter the number of visible options
        getDropdownItems().should('have.length', 17);

        // type some text into the select component (brackets)
        getSelectInput().clear().type(')');

        // should filter the number of visible options
        getDropdownItems().should('have.length', 5);
    });

    it('should support objects (single select)', () => {

        // switch the list to display objects instead of strings
        setItemMode(SelectItemMode.Objects);

        // we should be able to perform a selection
        getSelectInput().click();

        // select a menu item
        getDropdownItem(3).click();

        // check that the selection has been made
        getSelectInput().should('have.value', 'Aland Islands');
        getSelection().should('contain.text', '"name": "Aland Islands"');
    });

    /**
     * Multiple Select
     * */

    it('should have the correct initial values (multiple select)', () => {

        toggleMultipleSelect();

        // should not have any initial text
        getSelectInput().should('have.value', '');

        // should not display an open dropdown
        getTypeahead().should('not.have.class', 'open');

        // should not have any initial selected item(s)
        getSelection().should('have.text', 'null');

        // should show the correct placeholder
        getSelectPlaceholder().should('equal', 'Select a country');

        // perform a screenshot comparison
        cy.matchImageSnapshot('multi-select-initial');
    });

    it('should toggle dropdown (multiple select)', () => {
        toggleMultipleSelect();

        // open the select dropdown
        getSelectInput().click();

        // should not display an open dropdown
        getTypeahead().should('have.class', 'open');

        // open the select dropdown
        getSelectInput().click();

        // should not display an open dropdown
        getTypeahead().should('not.have.class', 'open');
    });

    it('should display the correct list items (multiple select)', () => {
        toggleMultipleSelect();

        // open the select dropdown
        getSelectInput().click();

        // should show the correct text
        getDropdownItem(0).should('have.text', 'United States');
        getDropdownItem(1).should('have.text', 'United Kingdom');
        getDropdownItem(2).should('have.text', 'Afghanistan');

        // should not select an item just because we opened the dropdown
        getSelection().should('have.text', 'null');

        // perform a screenshot comparison
        cy.matchImageSnapshot('multi-select-dropdown-open');
    });

    it('should allow selection using the keyboard (multiple select)', () => {
        toggleMultipleSelect();

        // perform the keyboard actions
        getSelectInput()
            .focus() // focus the input element to receive keyboard input
            .type('{downarrow}') // open the menu using the arrow key
            .type('{downarrow}') // navigate to the second item
            .type('{enter}'); // perform a selection

        // the input should clear on select
        getSelectInput().should('have.value', '');

        // check the selection has been made
        getSelection().should('contain.text', 'United Kingdom');
    });

    it('should allow selection using the mouse (multiple select)', () => {
        toggleMultipleSelect();
        // open the menu
        getSelectInput().click();

        // select a menu item
        getDropdownItem(3).click();

        // the input should clear after selection
        getSelectInput().should('have.value', '');

        // check that the selection has been made
        getSelection().should('contain.text', 'Aland Islands');

        // open the menu
        getSelectInput().click();

        // ensure the item is disabled in the list
        getDropdownItem(3).should('have.class', 'disabled');
    });

    it('should handle overflow correctly (multiple select)', () => {
        toggleMultipleSelect();
        // open the menu
        getSelectInput().click();

        // select a menu item
        getDropdownItem(250).click();

        // perform a screenshot comparison
        cy.matchImageSnapshot('multi-select-overflow');
    });

    it('should filter and highlight the list when typing (multiple select)', () => {
        toggleMultipleSelect();

        // type some text into the select component (lower case)
        getSelectInput().type('united');

        // should filter the number of visible options
        getDropdownItems().should('have.length', 5);

        // perform a screenshot comparison
        cy.matchImageSnapshot('multi-select-filter-hightlight');

        // type some text into the select component (upper case)
        getSelectInput().clear().type('Q');

        // should filter the number of visible options
        getDropdownItems().should('have.length', 7);

        // type some text into the select component (space)
        getSelectInput().clear().type(' ');

        // should filter the number of visible options
        getDropdownItems().should('have.length', 82);

        // type some text into the select component (hypen)
        getSelectInput().clear().type('-');

        // should filter the number of visible options
        getDropdownItems().should('have.length', 2);

        // type some text into the select component (comma)
        getSelectInput().clear().type(',');

        // should filter the number of visible options
        getDropdownItems().should('have.length', 17);

        // type some text into the select component (brackets)
        getSelectInput().clear().type(')');

        // should filter the number of visible options
        getDropdownItems().should('have.length', 5);
    });

    it('should support objects (multiple select)', () => {
        toggleMultipleSelect();

        // we should be able to perform a selection
        getSelectInput().click();

        // select a menu item
        getDropdownItem(3).click();

        // the select input should be cleared after selection
        getSelectInput().should('have.value', '');

        // check that the selection has been made
        getSelection().should('contain.text', 'Aland Islands');
    });

    it('should be possible to remove tags', () => {
        toggleMultipleSelect();

        // we should be able to perform a selection
        getSelectInput().click();

        // select a menu item
        getDropdownItem(0).click();
        getDropdownItem(1).click();
        getDropdownItem(2).click();

        // close the menu
        getSelectInput().click();


        // check that the selection has been made
        getSelection().should('contain.text', 'United States')
            .should('contain.text', 'United Kingdom')
            .should('contain.text', 'Afghanistan');

        // start removing tags and checking the selection updates
        removeTag(1);
        getSelection().should('contain.text', 'United States')
            .should('contain.text', 'Afghanistan');

        removeTag(1);
        getSelection().should('contain.text', 'United States');

        removeTag(0);
        getSelection().should('contain.text', '[]');
    });

    it('should allow the select control to be disabled (single select)', () => {
        toggleDisabled();

        // open the select dropdown (force is required because the control should be disabled)
        getSelectInput().click({ force: true });

        // should not display an open dropdown
        getTypeahead().should('not.have.class', 'open');

        // re-enable the component - selection should now be re-enabled
        toggleDisabled();

        // open the menu
        getSelectInput().click();

        // select a menu item
        getDropdownItem(3).click();

        // check that the selection has been made
        getSelectInput().should('have.value', 'Aland Islands');
        getSelection().should('contain.text', 'Aland Islands');
    });

    it('should allow the select control to be disabled (multiple select)', () => {
        toggleMultipleSelect();
        toggleDisabled();

        // open the select dropdown (force is required because the control should be disabled)
        getSelectInput().click({ force: true });

        // should not display an open dropdown
        getTypeahead().should('not.have.class', 'open');

        // re-enable the component - selection should now be re-enabled
        toggleDisabled();

        // open the menu
        getSelectInput().click();

        // select a menu item
        getDropdownItem(3).click();

        // the input should clear after selection
        getSelectInput().should('have.value', '');

        // check that the selection has been made
        getSelection().should('contain.text', 'Aland Islands');
    });

});
