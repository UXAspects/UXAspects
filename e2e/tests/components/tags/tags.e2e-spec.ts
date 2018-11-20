import { Key } from 'protractor';
import { TagsPage } from './tags.po.spec';

describe('TagsPage Tests', () => {

  let page: TagsPage;

  beforeEach(() => {
    page = new TagsPage();
    page.getPage();
  });

  it('should start with three tags, the customize example section closed and no error messages visible', () => {

    expect<any>(page.getNumberOfTags()).toEqual(3);
    expect<any>(page.getTagName(0)).toEqual('Alpha');
    expect<any>(page.getTagName(1)).toEqual('Beta');
    expect<any>(page.getTagName(2)).toEqual('Kappa');

    expect(page.confirmRangeErrorIsVisible()).toBeFalsy();
    expect(page.confirmInputPatternErrorIsVisible()).toBeFalsy();

  });

  it('should allow addition of tags', () => {

    page.typeInATag('Gamma');
    expect<any>(page.getNumberOfTags()).toEqual(4);
    expect<any>(page.getTagName(3)).toEqual('Gamma');

  });

  it('should allow deletion of all tags one by one', () => {

    expect<any>(page.getNumberOfTags()).toEqual(3);

    page.closeATag(2);
    expect<any>(page.getNumberOfTags()).toEqual(2);
    page.closeATag(0);
    expect<any>(page.getNumberOfTags()).toEqual(1);
    page.closeATag(0);
    expect<any>(page.getNumberOfTags()).toEqual(0);

  });

  it('should allow addition of tags by pasting', () => {

    page.copyAndPasteTags('Delta');
    expect<any>(page.getNumberOfTags()).toEqual(4);
    expect<any>(page.getTagName(3)).toEqual('Delta');

    page.copyAndPasteTags('Epsilon,Zeta');
    expect<any>(page.getNumberOfTags()).toEqual(6);
    expect<any>(page.getTagName(4)).toEqual('Epsilon');
    expect<any>(page.getTagName(5)).toEqual('Zeta');

    page.copyAndPasteTags('Eta.Theta');
    expect<any>(page.getNumberOfTags()).toEqual(7);
    expect<any>(page.getTagName(6)).toEqual('Eta.Theta');

  });

  it('should allow the number of tags to fall below the minimum limit', () => {

    page.closeATag(0);
    page.closeATag(0);
    page.closeATag(0);
    expect<any>(page.getNumberOfTags()).toEqual(0);
    expect(page.confirmRangeErrorIsVisible()).toBeTruthy();
    expect<any>(page.getRangeErrorMessage()).toEqual('Required: number of tags between 1 and 10.');

  });

  it('should allow the number of tags to rise above the maximum limit', () => {

    page.copyAndPasteTags('Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi');
    expect<any>(page.getNumberOfTags()).toEqual(16);
    expect(page.confirmRangeErrorIsVisible()).toBeTruthy();
    expect<any>(page.getRangeErrorMessage()).toEqual('Required: number of tags between 1 and 10.');

  });

  it('should allow disabling of the tag input', () => {
    page.disabled.click();
    expect(page.confirmTagsInputIsDisabled()).toBeTruthy();

  });

  it('should validate input tag names against the supplied tag pattern', () => {
    page.enforceTagLimits.click();
    page.changeTagPattern('\\w{5}');
    expect(page.confirmInputPatternErrorIsVisible()).toBeFalsy();

    page.typeInATag('Eta');
    expect(page.confirmInputPatternErrorIsVisible()).toBeTruthy();
    expect<any>(page.getInputPatternErrorMessage()).toEqual('Expected format: \\w{5}');

    page.clearTagsInput();
    page.typeInATag('Delta');
    expect(page.confirmInputPatternErrorIsVisible()).toBeFalsy();

  });

  it('should prevent tag addition or deletion when a limit would be breached', () => {

    page.enforceTagLimits.click();

    page.closeATag(0);
    page.closeATag(0);
    expect<any>(page.getNumberOfTags()).toEqual(1);
    expect(page.confirmTagCloseIconIsVisible(0)).toBeFalsy();

    page.copyAndPasteTags('Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa');
    expect<any>(page.getNumberOfTags()).toEqual(10);
    expect(page.confirmTagsInputIsAvailable()).toBeFalsy();

  });

  it('should allow adjustment of the minimum limit', () => {

    page.changeMinTags('2');

    page.closeATag(0);
    expect<any>(page.getNumberOfTags()).toEqual(2);
    expect(page.confirmRangeErrorIsVisible()).toBeFalsy();

    page.closeATag(0);
    expect<any>(page.getNumberOfTags()).toEqual(1);
    expect(page.confirmRangeErrorIsVisible()).toBeTruthy();
    expect<any>(page.getRangeErrorMessage()).toEqual('Required: number of tags between 2 and 10.');

  });

  it('should allow adjustment of the maximum limit', () => {

    page.changeMaxTags('4');

    page.copyAndPasteTags('Delta');
    expect<any>(page.getNumberOfTags()).toEqual(4);
    expect(page.confirmRangeErrorIsVisible()).toBeFalsy();

    page.copyAndPasteTags('Epsilon');
    expect<any>(page.getNumberOfTags()).toEqual(5);
    expect(page.confirmRangeErrorIsVisible()).toBeTruthy();
    expect<any>(page.getRangeErrorMessage()).toEqual('Required: number of tags between 1 and 4.');

  });

  it('should allow changing of the placeholder text', () => {

    page.placeholder.clear();
    page.placeholder.sendKeys('Add tags here!');
    expect<any>(page.getTagInputsPlaceholderText()).toEqual('Add tags here!');

  });

  it('should allow changing of the tag delimiter characters', () => {

    page.tagDelimiters.clear();
    page.tagDelimiters.sendKeys('|-');

    // A tag should be added after one of the delimiter characters is input.
    page.sendCharactersToTagsInput('Delta');
    expect<any>(page.getNumberOfTags()).toEqual(3);
    page.sendCharactersToTagsInput('|');
    expect<any>(page.getNumberOfTags()).toEqual(4);
    expect<any>(page.getTagName(3)).toEqual('Delta');

    // A tag should be added after one of the delimiter characters is input. Characters after the delimiter should be converted to a tag when Enter is input.
    page.sendCharactersToTagsInput('Epsilon-Zeta');
    expect<any>(page.getNumberOfTags()).toEqual(5);
    expect<any>(page.getTagName(4)).toEqual('Epsilon');
    page.sendCharactersToTagsInput(Key.ENTER);
    expect<any>(page.getNumberOfTags()).toEqual(6);

    // Multiple names separated by delimiter characters should be converted to tags.
    page.copyAndPasteTags('Eta|Theta-Iota');
    expect<any>(page.getNumberOfTags()).toEqual(9);
    expect<any>(page.getTagName(8)).toEqual('Iota');

  });

  it('should display tags in the typeahead list', () => {

    page.enableTypeahead.click();

    page.sendCharactersToTagsInput('l');
    page.waitForTypeaheadListToBeDisplayed().then(() => {
      expect<any>(page.getNumberOfTagsInTypeaheadList()).toEqual(5);

      // The first list item, 'Alpha', should be disabled.
      expect(page.confirmTypeaheadItemIsDisabled(0)).toBeTruthy();
      expect(page.confirmTypeaheadItemIsDisabled(1)).toBeFalsy();
      expect(page.confirmTypeaheadItemIsDisabled(4)).toBeFalsy();

      // The second list item, 'Delta', should be highlighted.
      expect(page.confirmTypeaheadItemIsHighlighted(0)).toBeFalsy();
      expect(page.confirmTypeaheadItemIsHighlighted(1)).toBeTruthy();
      expect(page.confirmTypeaheadItemIsHighlighted(4)).toBeFalsy();
    });

  });

  it('should allow the addition of a tag in the typeahead list', () => {

    page.enableTypeahead.click();
    page.sendCharactersToTagsInput('l');
    page.waitForTypeaheadListToBeDisplayed().then(() => {
      expect<any>(page.getNumberOfTagsInTypeaheadList()).toEqual(5);
      page.addTypeaheadItem(4);
      expect<any>(page.getNumberOfTags()).toEqual(4);
      expect<any>(page.getTagName(3)).toEqual('Upsilon');
    });

  });

  it('should prevent addition of tags not in the typeahead list', () => {

    // With freeInput on a name which is not in the typeahead list can be converted to a tag.
    page.enableTypeahead.click();
    page.sendCharactersToTagsInput('l');
    page.waitForTypeaheadListToBeDisplayed().then(() => {
      expect<any>(page.getNumberOfTagsInTypeaheadList()).toEqual(5);
      page.sendCharactersToTagsInput('l');
      page.sendCharactersToTagsInput(Key.ENTER);
      expect<any>(page.getNumberOfTags()).toEqual(4);
      expect<any>(page.getTagName(3)).toEqual('ll');

      // Turn freeInput off. A name which is not in the typeahead list should not be converted to a tag.
      page.freeInput.click();

      page.sendCharactersToTagsInput('l');
      page.waitForTypeaheadListToBeDisplayed().then(() => {
        expect<any>(page.getNumberOfTagsInTypeaheadList()).toEqual(5);
        page.sendCharactersToTagsInput('l2');
        page.sendCharactersToTagsInput(Key.ENTER);
        expect<any>(page.getNumberOfTags()).toEqual(4);
        expect<any>(page.getTagName(3)).toEqual('ll');
      });
    });

  });

  it('should prevent the highlighting of the first enabled tag in the typeahead list', () => {

    page.enableTypeahead.click();
    page.selectFirst.click();

    // 'Delta' should not be highlighted in the list.
    page.sendCharactersToTagsInput('l');
    page.waitForTypeaheadListToBeDisplayed().then(() => {
      expect<any>(page.getNumberOfTagsInTypeaheadList()).toEqual(5);
      expect(page.confirmTypeaheadItemIsHighlighted(1)).toBeFalsy();
    });

  });

  it('should display the typeahead list when the tags input area is clicked', () => {

    page.enableTypeahead.click();
    page.showTypeaheadOnClick.click();

    page.clickOnTagsInput();
    page.waitForTypeaheadListToBeDisplayed().then(() => {
      expect<any>(page.getNumberOfTagsInTypeaheadList()).toEqual(24);
    });

  });
});