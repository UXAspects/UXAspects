import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DateRangeService } from '../../date-range-picker/index';
import { IconModule } from '../../icon/icon.module';
import { DateTimePickerModule } from '../date-time-picker.module';
import { DateTimePickerService } from '../date-time-picker.service';
import { HeaderComponent } from './header.component';

describe('Date Time Picker Header', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dateRangeService: DateRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IconModule, HeaderComponent, DateTimePickerModule],
      providers: [DateTimePickerService, DateRangeService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    dateRangeService = TestBed.inject(DateRangeService);
    fixture.detectChanges();
  });

  it('should detect changes on range change', fakeAsync(() => {
    // spy on the changeDetector detectChanges function

    const detectChangesSpy = spyOn(
      (component as any)._changeDetector as ChangeDetectorRef,
      'detectChanges'
    );

    // trigger the range change
    dateRangeService.onRangeChange.next();

    // we have a delay of 100ms
    tick(100);

    expect(detectChangesSpy).toHaveBeenCalledTimes(1);
  }));

  /** Regression test for EL-3803 - Header component called detect changes after it was destroyed throwing an error */
  it('should teardown correctly', fakeAsync(() => {
    // spy on the changeDetector detectChanges function

    const detectChangesSpy = spyOn(
      (component as any)._changeDetector as ChangeDetectorRef,
      'detectChanges'
    );

    // trigger the range change
    dateRangeService.onRangeChange.next();

    // destroy the component before the 100ms has elapsed
    fixture.destroy();

    // we have a delay of 100ms
    tick(100);

    expect(detectChangesSpy).not.toHaveBeenCalled();
  }));
});
