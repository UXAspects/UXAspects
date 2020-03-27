import { getDropdownItem, getDropdownItems, getSelectInput, getSelection, getPlaceholder, getTypeahead, removeTag, SelectItemMode, setItemMode, toggleAllowNull, toggleDisabled, toggleMultipleSelect, setPlaceholder, togglePaging, setPageSize, getIcon, toggleCustomIcon, toggleClearButton, getCloseBtn, toggleRecentOptions, getRecentItemsList, getRecentItemsItems, getRecentItemsItem } from '../support/select.po';

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
        getPlaceholder().should('equal', 'Select a country');

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

        // remove focus from the input to prevent screenshot inconsistencies
        getSelectInput().blur();

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

        // remove focus from the input to prevent screenshot inconsistencies
        getSelectInput().blur();

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
        getPlaceholder().should('equal', 'Select a country');

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

    it('should allow null values when "allowNull" is true', () => {
        // allow null values
        toggleAllowNull();

        // open the menu
        getSelectInput().click();

        // select a menu item
        getDropdownItem(3).click();

        // check that the selection has been made
        getSelection().should('contain.text', 'Aland Islands');

        // open the select dropdown
        getSelectInput().click().clear().blur();

        // the input should clear after selection
        getSelectInput().should('have.value', '');

        // check that the selection has been made
        getSelection().should('contain.text', 'null');

        // repeat for multiple select
        toggleMultipleSelect();

        // open the menu
        getSelectInput().click();

        // select a menu item
        getDropdownItem(3).click();

        // check that the selection has been made
        getSelection().should('contain.text', 'Aland Islands');

        // open the select dropdown
        removeTag(0);

        // the input should clear after selection
        getSelectInput().should('have.value', '');

        // check that the selection has been made
        getSelection().should('contain.text', '[]');
    });

    it('should allow the placeholder to be changed', () => {
        // get the default placeholder value
        getPlaceholder().should('equal', 'Select a country');

        // set the placeholder
        setPlaceholder('New Placeholder');
        getPlaceholder().should('equal', 'New Placeholder');

        // do the same for the multi select
        toggleMultipleSelect();

        getPlaceholder().should('equal', 'New Placeholder');

        // change the placeholder
        setPlaceholder('Multi Select Placeholder');
        getPlaceholder().should('equal', 'Multi Select Placeholder');
    });

    it('should allow pagination (single select)', () => {
        // enable paging
        togglePaging();

        // open the menu
        getSelectInput().click();

        // we should only be showing a subset of the values
        getDropdownItems().should('have.length', 20);

        // perform scrolling
        getTypeahead().scrollTo(0, 1000);

        // we should now show the next page
        getDropdownItems().should('have.length', 40);

        // open the menu
        getSelectInput().click();

        // change the paging size
        setPageSize(50);

        // open the menu
        getSelectInput().click();

        // we should only be showing a subset of the values
        getDropdownItems().should('have.length', 100);

        // perform scrolling
        getTypeahead().scrollTo(0, 4000);

        // we should now show the next page
        getDropdownItems().should('have.length', 150);

        // should use the page size when filtering
        getSelectInput().clear().type('b');

        // we should now show the next page
        getDropdownItems().should('have.length', 50);
    });

    it('should allow pagination (multi select)', () => {

        toggleMultipleSelect();

        // enable paging
        togglePaging();

        // open the menu
        getSelectInput().click();

        // we should only be showing a subset of the values
        getDropdownItems().should('have.length', 20);

        // perform scrolling
        getTypeahead().scrollTo(0, 1000);

        // we should now show the next page
        getDropdownItems().should('have.length', 40);

        // scroll back to the top
        getTypeahead().scrollTo(0, 0);

        // close the menu
        getSelectInput().click();

        // change the paging size
        setPageSize(50);

        // open the menu
        getSelectInput().click();

        // we should only be showing a subset of the values
        getDropdownItems().should('have.length', 100);

        // perform scrolling
        getTypeahead().scrollTo(0, 4000);

        // we should now show the next page
        getDropdownItems().should('have.length', 150);

        // perform scrolling
        getTypeahead().scrollTo(0, 0);

        // should use the page size when filtering
        getSelectInput().clear().type('b');

        // we should now show the next page
        getDropdownItems().should('have.length', 50);
    });

    it('should allow a custom icon', () => {
        // should show the correct initial icon
        getIcon().should('have.class', 'ux-icon-down');

        // show the custom icon
        toggleCustomIcon();

        // should show the correct initial icon
        getIcon().children().get('ux-icon').should('exist');

        // show the custom icon
        toggleCustomIcon();
        toggleMultipleSelect();

        // should show the correct initial icon
        getIcon().should('not.exist');

        // show the custom icon
        toggleCustomIcon();

        // should show the correct initial icon
        getIcon().children().get('ux-icon').should('exist');
    });

    it('should allow a clear button', () => {

        // enable the clear button
        toggleClearButton();

        // open the menu
        getSelectInput().click();

        // select a menu item
        getDropdownItem(3).click();

        // check that the selection has been made
        getSelection().should('contain.text', 'Aland Islands');

        // expect the close button to be visible
        getCloseBtn().should('exist');

        // clicking the clear button
        getCloseBtn().click();

        // the input should clear after selection
        getSelectInput().should('have.value', '');

        // check that the selection has been made
        getSelection().should('contain.text', 'null');

        // switch to multiple select
        toggleMultipleSelect();

        // open the menu
        getSelectInput().click();

        // select a menu item
        getDropdownItem(3).click();

        // check that the selection has been made
        getSelection().should('contain.text', 'Aland Islands');

        // expect the close button to be visible
        getCloseBtn().should('exist');

        // clicking the clear button
        getCloseBtn().click();

        // the input should clear after selection
        getSelectInput().should('have.value', '');

        // check that the selection has been made
        getSelection().should('contain.text', '[]');
    });

    it('should handle overflow', () => {
        // open the menu
        getSelectInput().click();

        // select a menu item
        getDropdownItems().last().scrollIntoView().click({ force: true });

        // remove focus from the input to prevent screenshot inconsistencies
        getSelectInput().blur();

        // check the screenshot
        cy.matchImageSnapshot('single-select-overflow');

        // enable the clear button
        toggleClearButton();

        // check the screenshot
        cy.matchImageSnapshot('single-select-overflow-clear-btn');

        // toggle multi select
        toggleMultipleSelect();

        // open the menu
        getSelectInput().click();

        // select a menu item
        getDropdownItems().last().scrollIntoView().click({ force: true });

        // check the screenshot
        cy.matchImageSnapshot('multi-select-overflow');

        // enter text into the text area
        getSelectInput().type('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM');
        // check the screenshot
        cy.matchImageSnapshot('multi-select-overflow-clear-btn');
    });

    it('should show recent options (single select)', () => {
        // enable recent options
        toggleRecentOptions();

        // open the menu
        getSelectInput().click();

        // there should be no recent items
        getRecentItemsList().should('not.exist');

        // select a menu item
        getDropdownItem(3).click();

        // re-open the menu
        getSelectInput().click();

        // check if we now have the recent item
        getRecentItemsList().should('exist');
        getRecentItemsItems().should('have.length', 1);
        getRecentItemsItem(0).should('have.text', 'Aland Islands');

        // clear highlighted text for consistent screenshot
        getSelectInput().then(elements => {
            const element = elements[0];
            const document = element.ownerDocument;
            document.getSelection().empty();
        });

        // take a screenshot
        cy.matchImageSnapshot('single-select-recent-options');

        // select another menu item
        getDropdownItem(2).click();

        // re-open the menu
        getSelectInput().click();

        // check if we now have the recent item
        getRecentItemsList().should('exist');
        getRecentItemsItems().should('have.length', 2);
        getRecentItemsItem(0).should('have.text', 'United Kingdom');
        getRecentItemsItem(1).should('have.text', 'Aland Islands');
    });

    it('should show recent options (multi select)', () => {

        // toggle multi select
        toggleMultipleSelect();

        // enable recent options
        toggleRecentOptions();

        // open the menu
        getSelectInput().click();

        // there should be no recent items
        getRecentItemsList().should('not.exist');

        // select a menu item
        getDropdownItem(3).click();

        // check if we now have the recent item
        getRecentItemsList().should('exist');
        getRecentItemsItems().should('have.length', 1);
        getRecentItemsItem(0).should('have.text', 'Aland Islands');

        // take a screenshot
        cy.matchImageSnapshot('multi-select-recent-options');

        // select another menu item
        getDropdownItem(2).click();

        // check if we now have the recent item
        getRecentItemsList().should('exist');
        getRecentItemsItems().should('have.length', 2);
        getRecentItemsItem(0).should('have.text', 'United Kingdom');
        getRecentItemsItem(1).should('have.text', 'Aland Islands');
    });

});
