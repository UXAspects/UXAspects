import { imageCompare } from '../common/image-compare';
import { SankeyChartPage } from './sankey-chart.po.spec';

describe('Sankey Chart', () => {

    let page: SankeyChartPage;

    beforeEach(async () => {
        page = new SankeyChartPage();
        await page.getPage();
    });

    it('should size nodes with minHeight = 0', async () => {
        expect(await imageCompare('sankey-chart-initial')).toEqual(0);
    });

    it('should size nodes with minHeight = 56', async () => {
        await page.setMinHeightTo56();
        expect(await imageCompare('sankey-chart-min-height-56')).toEqual(0);
    });

    it('should size nodes with minHeight = 75', async () => {
        await page.setMinHeightTo75();
        expect(await imageCompare('sankey-chart-min-height-75')).toEqual(0);
    });

    it('should fail to size nodes with minHeight = 100 and fall back to minHeight = 0', async () => {
        await page.setMinHeightTo100();
        expect(await imageCompare('sankey-chart-min-height-100')).toEqual(0);
    });
});
