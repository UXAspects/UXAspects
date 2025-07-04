import { browser, by, element, ElementFinder } from 'protractor';

export class RadioButtonsPage {
  async getPage(): Promise<void> {
    await browser.get('#/radiobuttons');
  }

  radiobutton1 = element(by.css('ux-radio-button#radiobutton1 .ux-radio-button'));
  radiobutton2 = element(by.css('ux-radio-button#radiobutton2 .ux-radio-button'));
  radiobutton3 = element(by.css('ux-radio-button#radiobutton3 .ux-radio-button'));
  radiobutton4 = element(by.css('ux-radio-button#radiobutton4 .ux-radio-button'));
  text1 = element(by.id('text1'));
  disableFirstButton = element(by.id('button1'));
  changeToSimplified = element(by.id('button2'));
  removeSelected = element(by.id('remove-selected-button'));
  topFocus = element(by.id('top-focus'));

  async getRadioButtonClasses(radiobutton: ElementFinder): Promise<string> {
    return await radiobutton.getAttribute('class');
  }

  async confirmIsChecked(radiobutton: ElementFinder): Promise<boolean> {
    const classes = await this.getRadioButtonClasses(radiobutton);

    return classes.indexOf('ux-radio-button-checked') !== -1;
  }

  async confirmIsDisabled(radiobutton: ElementFinder): Promise<boolean> {
    const classes = await this.getRadioButtonClasses(radiobutton);

    return classes.indexOf('ux-radio-button-disabled') !== -1;
  }

  async confirmIsSimplified(radiobutton: ElementFinder): Promise<boolean> {
    const classes = await this.getRadioButtonClasses(radiobutton);

    return classes.indexOf('ux-radio-button-simplified') !== -1;
  }

  async confirmIsFocused(radiobutton: ElementFinder): Promise<boolean> {
    const classes = await this.getRadioButtonClasses(radiobutton);

    return classes.indexOf('ux-radio-button-focused') !== -1;
  }
}
