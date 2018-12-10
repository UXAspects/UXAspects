import { ConduitsPage, Zone } from './conduits.po.spec';

describe('Conduit Tests', () => {

    let page: ConduitsPage = new ConduitsPage();
    page.getPage();

    it('should have correct initial states', async () => {
        expect(await page.getConduitValue(Zone.One)).toBe('');
        expect(await page.getConduitValue(Zone.Two)).toBe('');
        expect(await page.getConduitValue(Zone.Three)).toBe('');
    });

    it('when zone 1 changes, zone 2 and 3 should update', async () => {
        await page.setConduitValue(Zone.One, 'UX Aspects');

        expect(await page.getConduitValue(Zone.One)).toBe('UX Aspects');
        expect(await page.getConduitValue(Zone.Two)).toBe('UX Aspects');
        expect(await page.getConduitValue(Zone.Three)).toBe('UX Aspects');
    });

    it('when zone 2 changes, zone 1 and 3 should update', async () => {
        await page.setConduitValue(Zone.Two, 'UX Aspects');

        expect(await page.getConduitValue(Zone.One)).toBe('UX Aspects');
        expect(await page.getConduitValue(Zone.Two)).toBe('UX Aspects');
        expect(await page.getConduitValue(Zone.Three)).toBe('UX Aspects');
    });

    it('when zone 3 changes, zone 1 and 2 should update', async () => {
        await page.setConduitValue(Zone.Three, 'UX Aspects');

        expect(await page.getConduitValue(Zone.One)).toBe('UX Aspects');
        expect(await page.getConduitValue(Zone.Two)).toBe('UX Aspects');
        expect(await page.getConduitValue(Zone.Three)).toBe('UX Aspects');
    });

    it('should not update other zones when producesOutput is set to false', async () => {
        await page.setConduitValue(Zone.One, 'UX Aspects');

        expect(await page.getConduitValue(Zone.One)).toBe('UX Aspects');
        expect(await page.getConduitValue(Zone.Two)).toBe('UX Aspects');
        expect(await page.getConduitValue(Zone.Three)).toBe('UX Aspects');

        await page.toggleProducesOutput(Zone.One);

        await page.setConduitValue(Zone.One, 'Conduit Changing');

        expect(await page.getConduitValue(Zone.One)).toBe('Conduit Changing');
        expect(await page.getConduitValue(Zone.Two)).toBe('UX Aspects');
        expect(await page.getConduitValue(Zone.Three)).toBe('UX Aspects');
    });

    it('should still receive input from other zones when producesOutput is set to false', async () => {

        await page.setConduitValue(Zone.One, 'UX Aspects');

        expect(await page.getConduitValue(Zone.One)).toBe('UX Aspects');
        expect(await page.getConduitValue(Zone.Two)).toBe('UX Aspects');
        expect(await page.getConduitValue(Zone.Three)).toBe('UX Aspects');

        await page.toggleProducesOutput(Zone.One);

        await page.setConduitValue(Zone.One, 'Conduit Changing');

        expect(await page.getConduitValue(Zone.One)).toBe('Conduit Changing');
        expect(await page.getConduitValue(Zone.Two)).toBe('UX Aspects');
        expect(await page.getConduitValue(Zone.Three)).toBe('UX Aspects');

        await page.setConduitValue(Zone.Two, 'Another Change');

        expect(await page.getConduitValue(Zone.One)).toBe('Another Change');
        expect(await page.getConduitValue(Zone.Two)).toBe('Another Change');
        expect(await page.getConduitValue(Zone.Three)).toBe('Another Change');
    });

    it('should be able to prevent any input', async () => {
        // disable all inputs
        await page.toggleAcceptsInput(Zone.One, Zone.Two);
        await page.toggleAcceptsInput(Zone.One, Zone.Three);

        await page.setConduitValue(Zone.Two, 'Should not change zone one');

        expect(await page.getConduitValue(Zone.One)).toBe('');
        expect(await page.getConduitValue(Zone.Two)).toBe('Should not change zone one');
        expect(await page.getConduitValue(Zone.Three)).toBe('Should not change zone one');

        await page.setConduitValue(Zone.Two, 'Also should not change zone one');

        expect(await page.getConduitValue(Zone.One)).toBe('');
        expect(await page.getConduitValue(Zone.Two)).toBe('Also should not change zone one');
        expect(await page.getConduitValue(Zone.Three)).toBe('Also should not change zone one');
    });

    it('should allow input from only one zone', async () => {
        await page.toggleAcceptsInput(Zone.One, Zone.Two);
        await page.toggleAcceptsInput(Zone.Three, Zone.Two);

        // setting zone 2 should have no effect on either zone 1 or 3
        await page.setConduitValue(Zone.Two, 'Zone two changing');

        expect(await page.getConduitValue(Zone.One)).toBe('');
        expect(await page.getConduitValue(Zone.Two)).toBe('Zone two changing');
        expect(await page.getConduitValue(Zone.Three)).toBe('');

        // should update all zones when zone 3 changes
        await page.setConduitValue(Zone.Three, 'Zone three changing');

        expect(await page.getConduitValue(Zone.One)).toBe('Zone three changing');
        expect(await page.getConduitValue(Zone.Two)).toBe('Zone three changing');
        expect(await page.getConduitValue(Zone.Three)).toBe('Zone three changing');
    });

    it('should allow indirect zone changes', async () => {

        // turn off inputs from zone 2
        await page.toggleAcceptsInput(Zone.One, Zone.Two);

        // setting zone 2 should update zone 3, but zone 1 accepts input from zone 3 so should still get updated
        await page.setConduitValue(Zone.Two, 'Zone two changing');

        expect(await page.getConduitValue(Zone.One)).toBe('Zone two changing');
        expect(await page.getConduitValue(Zone.Two)).toBe('Zone two changing');
        expect(await page.getConduitValue(Zone.Three)).toBe('Zone two changing');
    });

    it('should get an initial value when zone is dynamically added', async () => {

        // remove the zone completely
        await page.toggleZoneThreeVisibility();

        await page.setConduitValue(Zone.One, 'Zone one producing some output');

        await page.toggleZoneThreeVisibility();

        expect(await page.getConduitValue(Zone.One)).toBe('Zone one producing some output');
        expect(await page.getConduitValue(Zone.Two)).toBe('Zone one producing some output');
        expect(await page.getConduitValue(Zone.Three)).toBe('Zone one producing some output');
    });

});