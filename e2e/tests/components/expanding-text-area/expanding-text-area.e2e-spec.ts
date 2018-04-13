import { ExpandingTextAreaPage } from './expanding-text-area.po.spec';

describe('Expanding Text Area Tests', () => {

  let page: ExpandingTextAreaPage;

  const height: number = 33;

  beforeEach(() => {
    page = new ExpandingTextAreaPage();
    page.getPage();
  });

  it('should have correct initial states', async () => {
    expect(await page.getHeight()).toBe(height);
    expect(await page.getText()).toBe('');
  });

  it('should not grow when one line has been entered', async () => {
    expect(await page.getHeight()).toBe(height);
    expect(await page.getText()).toBe('');

    await page.setText('A single line of text');

    expect(await page.getHeight()).toBe(height);
    expect(await page.getText()).toBe('A single line of text');
  });

  it('should grow when two lines has been entered', async () => {
    expect(await page.getHeight()).toBe(height);
    expect(await page.getText()).toBe('');

    await page.setText('A first line of text\nA second line of text');

    expect(await page.getHeight()).toBe(58);
    expect(await page.getText()).toBe('A first line of text\nA second line of text');
  });

  it('should grow when three lines have been entered', async () => {
    expect(await page.getHeight()).toBe(height);
    expect(await page.getText()).toBe('');

    await page.setText('A first line of text\nA second line of text\nA third line of text');

    expect(await page.getHeight()).toBe(83);
    expect(await page.getText()).toBe('A first line of text\nA second line of text\nA third line of text');
  });

  it('should not grow when four lines have been entered', async () => {
    expect(await page.getHeight()).toBe(height);
    expect(await page.getText()).toBe('');

    await page.setText('A first line of text\nA second line of text\nA third line of text\nA fourth line of text');

    expect(await page.getHeight()).toBe(83);
    expect(await page.getText()).toBe('A first line of text\nA second line of text\nA third line of text\nA fourth line of text');
  });

});
