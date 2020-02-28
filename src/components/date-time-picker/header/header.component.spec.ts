import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { DateTimePickerService } from '../date-time-picker.service';
import { DateRangeService } from '../../date-range-picker';
import { IconModule } from '../../icon/icon.module';
import { ChangeDetectorRef } from '@angular/core';

fdescribe('Date Time Picker Header', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let nativeElement: HTMLElement;
    let dateRangeService: DateRangeService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [IconModule],
            providers: [DateTimePickerService, DateRangeService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        dateRangeService = TestBed.get(DateRangeService);
        fixture.detectChanges();
    });

    it('should detect changes on range change', fakeAsync(() => {
        // spy on the changeDetector detectChanges function
        const detectChangesSpy = spyOn(((component as any)._changeDetector as ChangeDetectorRef), 'detectChanges');

        // trigger the range change
        dateRangeService.onRangeChange.next();

        // we have a delay of 100ms
        tick(100);

        expect(detectChangesSpy).toHaveBeenCalledTimes(1);
    }));

    /** Regression test for EL-3803 - Header component called detect changes after it was destroyed throwing an error */
    it('should teardown correctly', fakeAsync(() => {
        // spy on the changeDetector detectChanges function
        const detectChangesSpy = spyOn(((component as any)._changeDetector as ChangeDetectorRef), 'detectChanges');

        // trigger the range change
        dateRangeService.onRangeChange.next();

        // destroy the component before the 100ms has elapsed
        fixture.destroy();

        // we have a delay of 100ms
        tick(100);

        expect(detectChangesSpy).not.toHaveBeenCalled();
    }));
});