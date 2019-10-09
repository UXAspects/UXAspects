import { Key } from 'protractor';
import { imageCompare } from '../common/image-compare';
import { TagsPage } from './tags.po.spec';

describe('TagsPage Tests', () => {

    let page: TagsPage;

    beforeEach(async () => {
        page = new TagsPage();
        await page.getPage();
    });

    it('should start with three tags, the customize example section closed and no error messages visible', async () => {

        expect(await page.getNumberOfTags()).toEqual(3);
        expect(await page.getTagName(0)).toEqual('Alpha');
        expect(await page.getTagName(1)).toEqual('Beta');
        expect(await page.getTagName(2)).toEqual('Kappa');

        expect(await page.confirmRangeErrorIsVisible()).toBeFalsy();
        expect(await page.confirmInputPatternErrorIsVisible()).toBeFalsy();

        expect(await imageCompare('tags-initial')).toEqual(0);

    });

    it('should allow addition of tags', async () => {

        await page.typeInATag('Gamma');
        expect(await page.getNumberOfTags()).toEqual(4);
        expect(await page.getTagName(3)).toEqual('Gamma');

    });

    it('should allow deletion of all tags one by one', async () => {

        expect(await page.getNumberOfTags()).toEqual(3);

        await page.closeATag(2);
        expect(await page.getNumberOfTags()).toEqual(2);
        await page.closeATag(0);
        expect(await page.getNumberOfTags()).toEqual(1);
        await page.closeATag(0);
        expect(await page.getNumberOfTags()).toEqual(0);

    });

    it('should allow addition of tags by pasting', async () => {

        await page.copyAndPasteTags('Delta');
        expect(await page.getNumberOfTags()).toEqual(4);
        expect(await page.getTagName(3)).toEqual('Delta');

        await page.copyAndPasteTags('Epsilon,Zeta');
        expect(await page.getNumberOfTags()).toEqual(6);
        expect(await page.getTagName(4)).toEqual('Epsilon');
        expect(await page.getTagName(5)).toEqual('Zeta');

        await page.copyAndPasteTags('Eta.Theta');
        expect(await page.getNumberOfTags()).toEqual(7);
        expect(await page.getTagName(6)).toEqual('Eta.Theta');

    });

    it('should allow the number of tags to fall below the minimum limit', async () => {

        await page.closeATag(0);
        await page.closeATag(0);
        await page.closeATag(0);
        expect(await page.getNumberOfTags()).toEqual(0);
        expect(await page.confirmRangeErrorIsVisible()).toBeTruthy();
        expect(await page.getRangeErrorMessage()).toEqual('Required: number of tags between 1 and 10.');

    });

    it('should allow the number of tags to rise above the maximum limit', async () => {

        await page.copyAndPasteTags('Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi');
        expect(await page.getNumberOfTags()).toEqual(16);
        expect(await page.confirmRangeErrorIsVisible()).toBeTruthy();
        expect(await page.getRangeErrorMessage()).toEqual('Required: number of tags between 1 and 10.');

    });

    it('should allow disabling of the tag input', async () => {
        await page.disabled.click();
        expect(await page.confirmTagsInputIsDisabled()).toBeTruthy();
        expect(await imageCompare('tags-disabled')).toEqual(0);
    });

    it('should validate input tag names against the supplied tag pattern', async () => {
        await page.enforceTagLimits.click();
        await page.changeTagPattern('\\w{5}');
        expect(await page.confirmInputPatternErrorIsVisible()).toBeFalsy();

        await page.typeInATag('Eta');
        expect(await page.confirmInputPatternErrorIsVisible()).toBeTruthy();
        expect(await page.getInputPatternErrorMessage()).toEqual('Expected format: \\w{5}');

        expect(await imageCompare('tags-invalid')).toEqual(0);

        await page.clearTagsInput();
        await page.typeInATag('Delta');
        expect(await page.confirmInputPatternErrorIsVisible()).toBeFalsy();

    });

    it('should prevent tag addition or deletion when a limit would be breached', async () => {

        await page.enforceTagLimits.click();

        await page.closeATag(0);
        await page.closeATag(0);
        expect(await page.getNumberOfTags()).toEqual(1);
        expect(await page.confirmTagCloseIconIsVisible(0)).toBeFalsy();

        await page.copyAndPasteTags('Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa');
        expect(await page.getNumberOfTags()).toEqual(10);
        expect(await page.confirmTagsInputIsAvailable()).toBeFalsy();

    });

    it('should allow adjustment of the minimum limit', async () => {

        await page.changeMinTags('2');

        await page.closeATag(0);
        expect(await page.getNumberOfTags()).toEqual(2);
        expect(await page.confirmRangeErrorIsVisible()).toBeFalsy();

        await page.closeATag(0);
        expect(await page.getNumberOfTags()).toEqual(1);
        expect(await page.confirmRangeErrorIsVisible()).toBeTruthy();
        expect(await page.getRangeErrorMessage()).toEqual('Required: number of tags between 2 and 10.');

    });

    it('should allow adjustment of the maximum limit', async () => {

        await page.changeMaxTags('4');

        await page.copyAndPasteTags('Delta');
        expect(await page.getNumberOfTags()).toEqual(4);
        expect(await page.confirmRangeErrorIsVisible()).toBeFalsy();

        await page.copyAndPasteTags('Epsilon');
        expect(await page.getNumberOfTags()).toEqual(5);
        expect(await page.confirmRangeErrorIsVisible()).toBeTruthy();
        expect(await page.getRangeErrorMessage()).toEqual('Required: number of tags between 1 and 4.');

    });

    it('should allow changing of the placeholder text', async () => {

        await page.placeholder.clear();
        await page.placeholder.sendKeys('Add tags here!');
        expect(await page.getTagInputsPlaceholderText()).toEqual('Add tags here!');

    });

    it('should allow changing of the tag delimiter characters', async () => {

        await page.tagDelimiters.clear();
        await page.tagDelimiters.sendKeys('|-');

        // A tag should be added after one of the delimiter characters is input.
        await page.sendCharactersToTagsInput('Delta');
        expect(await page.getNumberOfTags()).toEqual(3);
        await page.sendCharactersToTagsInput('|');
        expect(await page.getNumberOfTags()).toEqual(4);
        expect(await page.getTagName(3)).toEqual('Delta');

        // A tag should be added after one of the delimiter characters is input. Characters after the delimiter should be converted to a tag when Enter is input.
        await page.sendCharactersToTagsInput('Epsilon-Zeta');
        expect(await page.getNumberOfTags()).toEqual(5);
        expect(await page.getTagName(4)).toEqual('Epsilon');
        await page.sendCharactersToTagsInput(Key.ENTER);
        expect(await page.getNumberOfTags()).toEqual(6);

        // Multiple names separated by delimiter characters should be converted to tags.
        await page.copyAndPasteTags('Eta|Theta-Iota');
        expect(await page.getNumberOfTags()).toEqual(9);
        expect(await page.getTagName(8)).toEqual('Iota');

    });

    it('should display tags in the typeahead list', async () => {

        await page.enableTypeahead.click();

        await page.sendCharactersToTagsInput('l');
        await page.waitForTypeaheadListToBeDisplayed();
        expect(await page.getNumberOfTagsInTypeaheadList()).toEqual(5);

        // The first list item, 'Alpha', should be disabled.
        expect(await page.confirmTypeaheadItemIsDisabled(0)).toBeTruthy();
        expect(await page.confirmTypeaheadItemIsDisabled(1)).toBeFalsy();
        expect(await page.confirmTypeaheadItemIsDisabled(4)).toBeFalsy();

        // The second list item, 'Delta', should be highlighted.
        expect(await page.confirmTypeaheadItemIsHighlighted(0)).toBeFalsy();
        expect(await page.confirmTypeaheadItemIsHighlighted(1)).toBeTruthy();
        expect(await page.confirmTypeaheadItemIsHighlighted(4)).toBeFalsy();

    });

    it('should allow the addition of a tag in the typeahead list', async () => {

        await page.enableTypeahead.click();
        await page.sendCharactersToTagsInput('l');
        await page.waitForTypeaheadListToBeDisplayed();
        expect(await page.getNumberOfTagsInTypeaheadList()).toEqual(5);
        await page.addTypeaheadItem(4);
        expect(await page.getNumberOfTags()).toEqual(4);
        expect(await page.getTagName(3)).toEqual('Upsilon');

    });

    it('should prevent addition of tags not in the typeahead list', async () => {

        // With freeInput on a name which is not in the typeahead list can be converted to a tag.
        await page.enableTypeahead.click();
        await page.sendCharactersToTagsInput('l');
        await page.waitForTypeaheadListToBeDisplayed();
        expect(await page.getNumberOfTagsInTypeaheadList()).toEqual(5);
        await page.sendCharactersToTagsInput('l');
        await page.sendCharactersToTagsInput(Key.ENTER);
        expect(await page.getNumberOfTags()).toEqual(4);
        expect(await page.getTagName(3)).toEqual('ll');

        // Turn freeInput off. A name which is not in the typeahead list should not be converted to a tag.
        await page.freeInput.click();

        await page.sendCharactersToTagsInput('l');
        await page.waitForTypeaheadListToBeDisplayed();
        expect(await page.getNumberOfTagsInTypeaheadList()).toEqual(5);
        await page.sendCharactersToTagsInput('l2');
        await page.sendCharactersToTagsInput(Key.ENTER);
        expect(await page.getNumberOfTags()).toEqual(4);
        expect(await page.getTagName(3)).toEqual('ll');

    });

    it('should prevent the highlighting of the first enabled tag in the typeahead list', async () => {

        await page.enableTypeahead.click();
        await page.selectFirst.click();

        // 'Delta' should not be highlighted in the list.
        await page.sendCharactersToTagsInput('l');
        await page.waitForTypeaheadListToBeDisplayed();
        expect(await page.getNumberOfTagsInTypeaheadList()).toEqual(5);
        expect(await page.confirmTypeaheadItemIsHighlighted(1)).toBeFalsy();

    });

    it('should display the typeahead list when the tags input area is clicked', async () => {

        await page.enableTypeahead.click();
        await page.showTypeaheadOnClick.click();

        await page.clickOnTagsInput();
        await page.waitForTypeaheadListToBeDisplayed();
        expect(await page.getNumberOfTagsInTypeaheadList()).toEqual(24);

    });

    /**
     * Fixing https://portal.digitalsafe.net/browse/EL-3662
     * Console error was thrown when clicking on the tag input after
     * max tags had been reached and enforceTagLimits was true
     */
    it('should not focus input when max tag limit is reached and enforceTagLimits is true', async () => {

        // set enforce tag limits
        await page.enforceTagLimits.click();
        await page.changeMaxTags('3');
        // ensure there are there 3 tags
        await page.tagsInput.click(); // console error would have been thrown here before fix
    });
});