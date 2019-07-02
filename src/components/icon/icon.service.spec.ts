import { TestBed } from '@angular/core/testing';
import { IconService } from './icon.service';
import { hpeIconset } from './iconsets/hpe-iconset';

describe('Icon Service', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [IconService]
    }));

    it('should be created', () => {
        const service: IconService = TestBed.get(IconService);
        expect(service).toBeTruthy();
    });

    it('it should initially be instantiated with the UX Iconset', () => {
        const service: IconService = TestBed.get(IconService);
        const { icon, iconset, name, size } = service.getIcon('alert');

        expect(icon).toBe('ux-icon-alert');
        expect(iconset).toBe('ux-icon');
        expect(name).toBe('alert');
        expect(size).toBeUndefined();
    });

    it('it can be changed to use an alternate icon set', () => {
        const service: IconService = TestBed.get(IconService);

        // set an alternate iconset
        service.setIcons(hpeIconset);

        const { icon, iconset, name, size } = service.getIcon('alert');

        expect(icon).toBe('hpe-alert');
        expect(iconset).toBe('hpe-icon');
        expect(name).toBe('alert');
        expect(size).toBeUndefined();
    });

    it('it should allow adding additional custom icons to the set', () => {
        const service: IconService = TestBed.get(IconService);

        service.setIcon({ name: 'non-existant', icon: 'custom-non-existant-icon', iconset: 'custom-iconset' });

        const { icon, iconset, name, size } = service.getIcon('non-existant');

        expect(icon).toBe('custom-non-existant-icon');
        expect(iconset).toBe('custom-iconset');
        expect(name).toBe('non-existant');
        expect(size).toBeUndefined();
    });

    it('it should allow overriding the icon definition for the default size', () => {
        const service: IconService = TestBed.get(IconService);

        service.setIcon({ name: 'alert', icon: 'custom-alert-icon', iconset: 'custom-iconset' });

        const { icon, iconset, name, size } = service.getIcon('alert');

        expect(icon).toBe('custom-alert-icon');
        expect(iconset).toBe('custom-iconset');
        expect(name).toBe('alert');
        expect(size).toBeUndefined();
    });

    it('it should allow overriding the icon definition for a single specific size', () => {
        const service: IconService = TestBed.get(IconService);

        service.setIcon({ name: 'alert', icon: 'custom-alert-icon', iconset: 'custom-iconset', size: '24px' });

        const defaultIcon = service.getIcon('alert');

        // the default size should not be altered
        expect(defaultIcon.icon).toBe('ux-icon-alert');
        expect(defaultIcon.iconset).toBe('ux-icon');
        expect(defaultIcon.name).toBe('alert');
        expect(defaultIcon.size).toBeUndefined();

        const sizeIcon = service.getIcon('alert', '24px');

        expect(sizeIcon.icon).toBe('custom-alert-icon');
        expect(sizeIcon.iconset).toBe('custom-iconset');
        expect(sizeIcon.name).toBe('alert');
        expect(sizeIcon.size).toBe('24px');
    });

    it('it should allow overriding the icon definition for a multiple specific sizes', () => {
        const service: IconService = TestBed.get(IconService);

        service.setIcon({ name: 'alert', icon: 'custom-alert-icon', iconset: 'custom-iconset', size: ['24px', '32px'] });

        const defaultIcon = service.getIcon('alert');

        // the default size should not be altered
        expect(defaultIcon.icon).toBe('ux-icon-alert');
        expect(defaultIcon.iconset).toBe('ux-icon');
        expect(defaultIcon.name).toBe('alert');
        expect(defaultIcon.size).toBeUndefined();

        const smallSizeIcon = service.getIcon('alert', '24px');

        expect(smallSizeIcon.icon).toBe('custom-alert-icon');
        expect(smallSizeIcon.iconset).toBe('custom-iconset');
        expect(smallSizeIcon.name).toBe('alert');
        expect(smallSizeIcon.size).toBe('24px');

        const largeSizeIcon = service.getIcon('alert', '32px');

        expect(largeSizeIcon.icon).toBe('custom-alert-icon');
        expect(largeSizeIcon.iconset).toBe('custom-iconset');
        expect(largeSizeIcon.name).toBe('alert');
        expect(largeSizeIcon.size).toBe('32px');
    });

    it('it should fallback to default icon if exact match is not found', () => {
        const service: IconService = TestBed.get(IconService);
        const { icon, iconset, name, size } = service.getIcon('alert', '24px');

        expect(icon).toBe('ux-icon-alert');
        expect(iconset).toBe('ux-icon');
        expect(name).toBe('alert');
        expect(size).toBeUndefined();
    });
});
