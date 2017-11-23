import { browser, Key, ElementFinder } from 'protractor';
import { TreeGridTestPageComponent } from './tree-grid.po.spec';
import { Constants, Functions } from '../common/common.spec';

describe('Tree Grid Tests', () => {

  const ACTION_SHARE = 0;
  const ACTION_VIEW = 1;
  const ACTION_DELETE = 2;
  
  
  let page: TreeGridTestPageComponent;
  let browserName: string;
  let constants: Constants;
  let functions: Functions;

  beforeEach(() => {
    page = new TreeGridTestPageComponent();
    page.getPage();
    
    constants = new Constants();
    functions = new Functions();
    
    browser.getCapabilities().then(function(caps) {
        browserName = caps.get('browserName');
    });
  });
  
  it('should have correct initial states', () => {

    // Three rows should be displayed
    expect<any>(page.getNumberOfRows()).toBe(3);

    // Check the column headers
    expect<any>(page.getColumnHeaderText(0)).toBe('TITLE');
    expect<any>(page.getColumnHeaderText(1)).toBe('DATE');
    expect<any>(page.getColumnHeaderText(2)).toBe('ACTIONS');
    
    // Row 1 - No indentation, expander icon visible, open folder icon visible, hover actions invisible
    expect(page.getTitleColumnIndentation(0).getAttribute('class')).toContain('treegrid-level-0');
    expect(page.getTitleColumnExpanderIcon(0).getAttribute('class')).toContain('hpe-chevron-right');
    expect(page.getTitleColumnObjectIcon(0).getAttribute('class')).toContain('hpe-folder');
    expect<any>(page.getTitleColumnValue(0)).toBe('Documents');
    expect<any>(page.getDateColumnValue(0)).toBe('2/16/2013');
    expect(page.getActionsColumnAction(0, ACTION_SHARE).isDisplayed()).toBeFalsy();
    expect(page.getActionsColumnAction(0, ACTION_VIEW).isDisplayed()).toBeFalsy();
    expect(page.getActionsColumnAction(0, ACTION_DELETE).isDisplayed()).toBeFalsy();

    // Row 2 - No indentation, expander icon visible, open folder icon visible, hover actions invisible
    expect(page.getTitleColumnIndentation(1).getAttribute('class')).toContain('treegrid-level-0');
    expect(page.getTitleColumnExpanderIcon(1).getAttribute('class')).toContain('hpe-chevron-right');
    expect(page.getTitleColumnObjectIcon(1).getAttribute('class')).toContain('hpe-folder');
    expect<any>(page.getTitleColumnValue(1)).toBe('Emails');
    expect<any>(page.getDateColumnValue(1)).toBe('3/17/2013');
    expect(page.getActionsColumnAction(1, ACTION_SHARE).isDisplayed()).toBeFalsy();
    expect(page.getActionsColumnAction(1, ACTION_VIEW).isDisplayed()).toBeFalsy();
    expect(page.getActionsColumnAction(1, ACTION_DELETE).isDisplayed()).toBeFalsy();

    // Row 3 - No indentation, expander icon invisible, open folder icon visible, hover actions invisible
    expect(page.getTitleColumnIndentation(2).getAttribute('class')).toContain('treegrid-level-0');
    expect(page.confirmRowHasExpander(2)).toBeFalsy();
    expect(page.getTitleColumnObjectIcon(2).getAttribute('class')).toContain('hpe-folder');
    expect<any>(page.getTitleColumnValue(2)).toBe('Empty');
    expect<any>(page.getDateColumnValue(2)).toBe('6/2/2016');
    expect(page.getActionsColumnAction(2, ACTION_SHARE).isDisplayed()).toBeFalsy();
    expect(page.getActionsColumnAction(2, ACTION_VIEW).isDisplayed()).toBeFalsy();
    expect(page.getActionsColumnAction(2, ACTION_DELETE).isDisplayed()).toBeFalsy();
    
    // List of selected items should be empty
    expect(page.confirmSelectedItemsListIsEmpty()).toBeTruthy();

    // Customize Example panel should be collapsed
    expect(page.panel.getAttribute('class')).toContain(' collapse');

    // Customize Example panel controls should have correct initial values
    expect(page.getDisplayPanelCheckbox().getAttribute('class')).not.toContain('checked');
    expect(page.getSelectRowCheckbox().getAttribute('class')).toContain('checked');
    expect(page.getSelectCheckCheckbox().getAttribute('class')).not.toContain('checked');
    expect(page.getSelectChildrenCheckbox().getAttribute('class')).toContain('disabled');
    expect(page.getSelectChildrenCheckbox().getAttribute('class')).not.toContain('checked');

  });

  it('should change the row\'s appearance when it is hovered', () => {
    
    functions.moveToElement(page.getRow(0));

    expect<any>(functions.getElementColourHex(page.getRow(0), 'background-color')).toBe('#f5f5f5');

    expect(page.getActionsColumnAction(0, ACTION_SHARE).isDisplayed()).toBeTruthy();
    expect(page.getActionsColumnAction(0, ACTION_VIEW).isDisplayed()).toBeTruthy();
    expect(page.getActionsColumnAction(0, ACTION_DELETE).isDisplayed()).toBeTruthy();

    expect<any>(page.getActionsColumnActionIcon(0, ACTION_SHARE).getAttribute('class')).toContain('hpe-share');
    expect<any>(page.getActionsColumnActionIcon(0, ACTION_VIEW).getAttribute('class')).toContain('hpe-view');
    expect<any>(page.getActionsColumnActionIcon(0, ACTION_DELETE).getAttribute('class')).toContain('hpe-trash');
    
  });

  it('should expand a row when it\'s expander is clicked', () => {
    
    page.getTitleColumnExpanderIcon(0).click();

    // Expander icon should have changed
    expect(page.getTitleColumnExpanderIcon(0).getAttribute('class')).toContain('hpe-chevron-down');

    // Check rows displayed
    expect<any>(page.getNumberOfRows()).toBe(5);
    expect<any>(page.getTitleColumnValue(0)).toBe('Documents');
    expect<any>(page.getTitleColumnValue(1)).toBe('Pictures');
    expect<any>(page.getTitleColumnValue(2)).toBe('Word files');
    expect<any>(page.getTitleColumnValue(3)).toBe('Emails');
    expect<any>(page.getTitleColumnValue(4)).toBe('Empty');

    // List of selected items should be empty
    expect(page.confirmSelectedItemsListIsEmpty()).toBeTruthy();

  });

  it('should collapse a row when it\'s expander is clicked twice', () => {
    
    page.getTitleColumnExpanderIcon(0).click();
    page.getTitleColumnExpanderIcon(0).click();

    // Expander icon should be the original
    expect(page.getTitleColumnExpanderIcon(0).getAttribute('class')).toContain('hpe-chevron-right');

    // Check rows displayed
    expect<any>(page.getNumberOfRows()).toBe(3);
    expect<any>(page.getTitleColumnValue(0)).toBe('Documents');
    expect<any>(page.getTitleColumnValue(1)).toBe('Emails');
    expect<any>(page.getTitleColumnValue(2)).toBe('Empty');

    // List of selected items should be empty
    expect(page.confirmSelectedItemsListIsEmpty()).toBeTruthy();
    
  });

  it('should display multiple levels of indentation', () => {
    
    page.getTitleColumnExpanderIcon(0).click();
    page.getTitleColumnExpanderIcon(1).click();

    // Check rows displayed
    expect<any>(page.getNumberOfRows()).toBe(8);

    expect(page.getTitleColumnIndentation(0).getAttribute('class')).toContain('treegrid-level-0');
    expect<any>(page.getTitleColumnValue(0)).toBe('Documents');

    expect(page.getTitleColumnIndentation(1).getAttribute('class')).toContain('treegrid-level-1');
    expect<any>(page.getTitleColumnValue(1)).toBe('Pictures');

    expect(page.getTitleColumnIndentation(2).getAttribute('class')).toContain('treegrid-level-2');
    expect<any>(page.getTitleColumnValue(2)).toBe('Alcazar');

    expect(page.getTitleColumnIndentation(3).getAttribute('class')).toContain('treegrid-level-2');
    expect<any>(page.getTitleColumnValue(3)).toBe('Citadel');

    expect(page.getTitleColumnIndentation(4).getAttribute('class')).toContain('treegrid-level-2');
    expect<any>(page.getTitleColumnValue(4)).toBe('Donjon');

    expect(page.getTitleColumnIndentation(5).getAttribute('class')).toContain('treegrid-level-1');
    expect<any>(page.getTitleColumnValue(5)).toBe('Word files');

    expect(page.getTitleColumnIndentation(6).getAttribute('class')).toContain('treegrid-level-0');
    expect<any>(page.getTitleColumnValue(6)).toBe('Emails');

    expect(page.getTitleColumnIndentation(7).getAttribute('class')).toContain('treegrid-level-0');
    expect<any>(page.getTitleColumnValue(7)).toBe('Empty');

  });

  it('should display different object icons', () => {
    
    page.getTitleColumnExpanderIcon(0).click();
    page.getTitleColumnExpanderIcon(1).click();

    // Check rows displayed
    expect(page.getTitleColumnObjectIcon(0).getAttribute('class')).toContain('hpe-folder');
    expect(page.getTitleColumnObjectIcon(1).getAttribute('class')).toContain('hpe-folder-open');
    expect(page.getTitleColumnObjectIcon(2).getAttribute('class')).toContain('hpe-document');

  });

  it('should not display an expander icon at the lowest level', () => {
    
    page.getTitleColumnExpanderIcon(0).click();
    page.getTitleColumnExpanderIcon(1).click();

    // Check rows displayed
    expect(page.confirmRowHasExpander(2)).toBeFalsy();
    expect(page.confirmRowHasExpander(3)).toBeFalsy();
    expect(page.confirmRowHasExpander(4)).toBeFalsy();

  });

  it('should change a row\'s appearance when it is selected or hovered', () => {
    
    page.getTitleColumnExpanderIcon(0).click();
    page.getTitleColumnExpanderIcon(1).click();
    page.getRow(3).click();

    // Check the selected row's appearance
    expect(page.getRow(3).getAttribute('class')).toContain('shift-select-selected-bg');
    expect<any>(functions.getElementColourHex(page.getRow(3), 'background-color')).toBe('#daeaf5');

    // List of selected items should include the row's title
    page.getSelectedItemsText().get(0).getText().then((title: string) => {
      expect<any>(title).toContain('Citadel');
    });

  });

  it('should be possible to select multiple rows by shift-clicking', () => {
    
    page.getTitleColumnExpanderIcon(0).click();
    page.getTitleColumnExpanderIcon(1).click();
    page.getRow(2).click();

    browser.actions().keyDown(Key.SHIFT).click(page.getRow(4)).keyUp(Key.SHIFT).perform();
    functions.moveToElement(page.getRow(4));
    

    // Check the selected rows' appearances
    expect(page.getRow(2).getAttribute('class')).toContain('shift-select-selected-bg');
    expect<any>(functions.getElementColourHex(page.getRow(3), 'background-color')).toBe('#e7f1f9');
    expect(page.getRow(3).getAttribute('class')).toContain('shift-select-selected-bg');
    expect<any>(functions.getElementColourHex(page.getRow(3), 'background-color')).toBe('#e7f1f9');
    expect(page.getRow(4).getAttribute('class')).toContain('shift-select-selected-bg');
    expect<any>(functions.getElementColourHex(page.getRow(3), 'background-color')).toBe('#e7f1f9');

    // List of selected items should include the rows' titles
    page.getSelectedItemsText().get(0).getText().then((title0: string) => {
      page.getSelectedItemsText().get(1).getText().then((title1: string) => {
        page.getSelectedItemsText().get(2).getText().then((title2: string) => {
          var titlesList = title0 + ', ' + title1 + ', ' + title2;
          expect<any>(titlesList).toContain('Alcazar');
          expect<any>(titlesList).toContain('Citadel');
          expect<any>(titlesList).toContain('Donjon');
        });
      });
    });

  });

  it('should be possible to select multiple rows by control-clicking', () => {
    
    page.getTitleColumnExpanderIcon(0).click();
    page.getTitleColumnExpanderIcon(1).click();
    page.getRow(0).click();

    browser.actions().keyDown(Key.CONTROL).click(page.getRow(2)).keyUp(Key.CONTROL).perform();
    browser.actions().keyDown(Key.CONTROL).click(page.getRow(4)).keyUp(Key.CONTROL).perform();
    functions.moveToElement(page.getRow(4));
    

    // Check the selected rows' appearances
    expect(page.getRow(0).getAttribute('class')).toContain('shift-select-selected-bg');
    expect<any>(functions.getElementColourHex(page.getRow(0), 'background-color')).toBe('#e7f1f9');
    expect(page.getRow(2).getAttribute('class')).toContain('shift-select-selected-bg');
    expect<any>(functions.getElementColourHex(page.getRow(2), 'background-color')).toBe('#e7f1f9');
    expect(page.getRow(4).getAttribute('class')).toContain('shift-select-selected-bg');
    expect<any>(functions.getElementColourHex(page.getRow(4), 'background-color')).toBe('#daeaf5');

    // List of selected items should include the rows' titles
    page.getSelectedItemsText().get(0).getText().then((title0: string) => {
      page.getSelectedItemsText().get(1).getText().then((title1: string) => {
        page.getSelectedItemsText().get(2).getText().then((title2: string) => {
          var titlesList = title0 + ', ' + title1 + ', ' + title2;
          expect<any>(titlesList).toContain('Documents');
          expect<any>(titlesList).toContain('Alcazar');
          expect<any>(titlesList).toContain('Donjon');
        });
      });
    });

  });

  it('should be possible to expand and collapse the customization panel', () => {
    
    // Expand the panel
    page.customizeExample.click().then(() => {
      // Customize Example panel should be expanded
      expect(page.panel.getAttribute('class')).not.toContain(' collapse');

      page.customizeExample.click().then(() => {
        // Customize Example panel should be collapsed
        expect(page.panel.getAttribute('class')).toContain(' collapse');
      });
    });
  });

  it('should be possible to expand the tree using keyboard commands', () => {
    
    page.getRow(0).click().then(() => {
      browser.actions().sendKeys(Key.ARROW_RIGHT).sendKeys(Key.ARROW_DOWN).sendKeys(Key.ARROW_RIGHT).
                        sendKeys(Key.ARROW_DOWN).sendKeys(Key.ARROW_DOWN).perform().then(() => {
        // Eight rows should be displayed
        expect<any>(page.getNumberOfRows()).toBe(8);
      });
    });

  });

  it('should be possible to use the customization panel using keyboard commands', () => {
    
    page.getRow(0).click().then(() => {
      // Expand the panel
      browser.actions().sendKeys(Key.TAB).sendKeys(Key.SPACE).perform().then(() => {
        // Three rows should be displayed
        expect<any>(page.getNumberOfRows()).toBe(3);

        // Customize Example panel should be expanded
        expect(page.panel.getAttribute('class')).not.toContain(' collapse');

        // Tab to the first two checkboxes, toggle them and check the values
        browser.actions().sendKeys(Key.TAB).sendKeys(Key.SPACE).sendKeys(Key.TAB).sendKeys(Key.SPACE).perform().then(() => {
          expect(page.getDisplayPanelCheckbox().getAttribute('class')).toContain('checked');
          expect(page.getSelectRowCheckbox().getAttribute('class')).not.toContain('checked');
          expect(page.getSelectCheckCheckbox().getAttribute('class')).not.toContain('checked');
          expect(page.getSelectChildrenCheckbox().getAttribute('class')).not.toContain('disabled');
          expect(page.getSelectChildrenCheckbox().getAttribute('class')).not.toContain('checked');
        });
      });
    });

  });

  it('should be possible to display a folders\'s data in the display panel', () => {
    
    page.getRow(1).click().then(() => {
      page.customizeExample.click().then(() => {
        page.displayPanel.click().then(() => {
          // Check the information in the display panel
          expect<any>(page.panelContents.get(0).getText()).toBe('Inbox');
          expect<any>(page.panelContents.get(1).getText()).toBe('Outbox');
        });
      });
    });

  });

  it('should be possible to display a document\'s data in the display panel', () => {
    
    page.getRow(0).click().then(() => {
      browser.actions().sendKeys(Key.ARROW_RIGHT).sendKeys(Key.ARROW_DOWN).sendKeys(Key.ARROW_RIGHT).
                        sendKeys(Key.ARROW_DOWN).sendKeys(Key.ARROW_DOWN).sendKeys(Key.SPACE).perform().then(() => {
        page.customizeExample.click().then(() => {
          page.displayPanel.click().then(() => {
            // Check the information in the display panel
            expect<any>(page.panelHeader.getText()).toBe('Citadel');
          });
        });
      });
    });

  });

  it('should be possible to select children of a folder', () => {
    
    page.getTitleColumnExpanderIcon(0).click();
    page.getTitleColumnExpanderIcon(1).click();

    // Check that the Select Children checkbox is enabled and unchecked when the Select Row checkbox is set to off
    page.customizeExample.click();
    page.selectRow.click();
    expect(page.getSelectChildrenCheckbox().getAttribute('class')).not.toContain('disabled');
    expect(page.getSelectChildrenCheckbox().getAttribute('class')).not.toContain('checked');

    // Set Select Check to On
    page.selectCheck.click();
    
    // Select Alcazar
    page.getTitleColumnCheckbox(2).click();

    // List of selected items should include the row's title
    page.getSelectedItemsText().get(0).getText().then((title: string) => {
      expect<any>(title).toContain('Alcazar');
    });

    // Select Pictures
    page.getTitleColumnCheckbox(1).click();

    // List of selected items should include two rows' titles
    page.getSelectedItemsText().get(0).getText().then((title0: string) => {
      page.getSelectedItemsText().get(1).getText().then((title1: string) => {
        var titlesList = title0 + ', ' + title1;
        expect<any>(titlesList).toContain('Pictures');
        expect<any>(titlesList).toContain('Alcazar');
      });
    });

    // Unselect Pictures
    page.getTitleColumnCheckbox(1).click();

    // Set Select Children to On
    page.selectChildren.click();
    
    // Select Pictures
    page.getTitleColumnCheckbox(1).click();
    
    // List of selected items should include four rows' titles
    page.getSelectedItemsText().get(0).getText().then((title0: string) => {
      page.getSelectedItemsText().get(1).getText().then((title1: string) => {
        page.getSelectedItemsText().get(2).getText().then((title2: string) => {
          page.getSelectedItemsText().get(3).getText().then((title3: string) => {
            var titlesList = title0 + ', ' + title1 + ', ' + title2 + ', ' + title3;
            expect<any>(titlesList).toContain('Pictures');
            expect<any>(titlesList).toContain('Alcazar');
            expect<any>(titlesList).toContain('Citadel');
            expect<any>(titlesList).toContain('Donjon');
          });
        });
      });
    });

    // Unselect Alcazar
    page.getTitleColumnCheckbox(2).click();
    
    // List of selected items should include three rows' titles
    page.getSelectedItemsText().get(0).getText().then((title0: string) => {
      page.getSelectedItemsText().get(1).getText().then((title1: string) => {
        page.getSelectedItemsText().get(2).getText().then((title2: string) => {
          var titlesList = title0 + ', ' + title1 + ', ' + title2;
          expect<any>(titlesList).toContain('Pictures');
          expect<any>(titlesList).toContain('Citadel');
          expect<any>(titlesList).toContain('Donjon');
        });
      });
    });

    // Unselect Pictures
    page.getTitleColumnCheckbox(1).click();
    
    // List of selected items should be empty
    expect(page.confirmSelectedItemsListIsEmpty()).toBeTruthy();
  });

});