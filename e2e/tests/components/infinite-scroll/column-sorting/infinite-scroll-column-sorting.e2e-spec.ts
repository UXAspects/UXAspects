import { InfiniteScrollColumnSortingPage } from './infinite-scroll-column-sorting.po.spec';

describe('Infinite Scroll (Column Sorting) Tests', () => {
  let page: InfiniteScrollColumnSortingPage;

  beforeEach(async () => {
    page = new InfiniteScrollColumnSortingPage();
    await page.getPage();
  });

  it('should allow loading to be triggered after reset, regardless if there are any pending requests', async () => {
    await page.clickSortTwice.click();

    expect((await page.employeesRows).length).toBe(90);
  });
});
