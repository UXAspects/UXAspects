
import { TestBed } from '@angular/core/testing';
import { ColorServiceModule } from '.';
import { colorSets } from './color-sets';
import { ColorService } from './color.service';

describe('Color Service - Micro Focus Color Set', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ColorServiceModule.forRoot(colorSets.microFocus)],
    providers: [ColorService]
  }));

  it('should return the correct rgb values for aliases', () => {
    const service: ColorService = TestBed.inject(ColorService);

    expect(service.getColor('critical').toRgb()).toBe('rgb(229, 0, 76)');
    expect(service.getColor('danger').toRgb()).toBe('rgb(244, 139, 52)');
    expect(service.getColor('warning').toRgb()).toBe('rgb(252, 219, 31)');
    expect(service.getColor('ok').toRgb()).toBe('rgb(26, 172, 96)');
    expect(service.getColor('info').toRgb()).toBe('rgb(0, 171, 243)');
  });
});
