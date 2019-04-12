import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Color } from '../../common/index';
import { ResizeDimensions, ResizeService } from '../../directives/resize/index';
import { ColorServiceModule } from '../../services/color/index';
import { TooltipModule } from '../tooltip/index';
import { NestedDonutChartComponent } from './nested-donut-chart.component';

export class MockResizeService {
    addResizeListener(target: HTMLElement): BehaviorSubject<ResizeDimensions> {
        return new BehaviorSubject<ResizeDimensions>({ width: target.offsetWidth, height: target.offsetHeight });
    }

    removeResizeListener(_target: HTMLElement): void { }
}

describe('NestedDonutChartComponent', () => {
    let component: NestedDonutChartComponent;
    let fixture: ComponentFixture<NestedDonutChartComponent>;
    let element: HTMLElement;
    let chart: SVGElement;
    let tracks: NodeListOf<SVGPathElement>;
    let arcs: NodeListOf<SVGPathElement>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TooltipModule,
                ColorServiceModule
            ],
            providers: [
                { provide: ResizeService, useClass: MockResizeService }
            ],
            declarations: [NestedDonutChartComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NestedDonutChartComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        // set the default size
        element.style.width = '165px';
        element.style.height = '165px';

        component.dataset = [
            { name: 'To be retained', value: 42, color: Color.Ok },
            { name: 'Potentially sensitive', value: 33, color: Color.Warning },
            { name: 'Sensitive', value: 9, color: Color.Critical }
        ];

        component.animationDuration = 0;

        fixture.detectChanges();

        chart = element.querySelector('.ux-nested-donut-chart');
        tracks = chart.querySelectorAll('.ux-nested-donut-chart-track');
        arcs = chart.querySelectorAll('.ux-nested-donut-chart-arc');
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should set the correct sizes', () => {

        // the outermost chart element should get the correct size
        expect(element.offsetWidth).toBe(165);
        expect(element.offsetWidth).toBe(165);

        // the chart element should also be the same size
        expect(chart.getAttribute('width')).toBe('165');
        expect(chart.getAttribute('height')).toBe('165');
    });

    it('should correctly position the content area', () => {
        const content: HTMLElement = element.querySelector('.ux-nested-donut-chart-content');

        expect(content.style.top).toBe('48px');
        expect(content.style.right).toBe('48px');
        expect(content.style.bottom).toBe('48px');
        expect(content.style.left).toBe('48px');
        expect(content.style.width).toBe('69px');
        expect(content.style.height).toBe('69px');
    });

    it('should have the correct number of tracks', () => {
        expect(tracks.length).toBe(3);
    });

    it('should have the correct number of arcs', () => {
        expect(arcs.length).toBe(3);
    });

    it('should set the correct track colors', () => {
        expect(tracks.item(0).style.fill).toBe('rgb(238, 238, 238)');
        expect(tracks.item(1).style.fill).toBe('rgb(238, 238, 238)');
        expect(tracks.item(2).style.fill).toBe('rgb(238, 238, 238)');
    });

    it('should set the correct arc colors', () => {
        expect(arcs.item(0).style.fill).toBe('rgb(59, 170, 67)');
        expect(arcs.item(1).style.fill).toBe('rgb(255, 144, 72)');
        expect(arcs.item(2).style.fill).toBe('rgb(255, 69, 79)');
    });

    it('should update the dataset when the @Input changes', (done) => {
        component.dataset = [
            { name: 'To be retained', value: 42, color: Color.Critical },
            { name: 'Potentially sensitive', value: 33, color: Color.Warning },
            { name: 'Sensitive', value: 9, color: Color.Ok }
        ];

        detectChanges();

        // wait for tweening to finish
        setTimeout(() => {
            expect(arcs.item(0).style.fill).toBe('rgb(255, 69, 79)');
            expect(arcs.item(1).style.fill).toBe('rgb(255, 144, 72)');
            expect(arcs.item(2).style.fill).toBe('rgb(59, 170, 67)');
            done();
        }, 100);

    });

    it('should set the trackColor when the @Input changes', (done) => {
        component.trackColor = 'rgb(255, 0, 0)';

        detectChanges();

        // wait for tweening to finish
        setTimeout(() => {
            expect(tracks.item(0).style.fill).toBe('rgb(255, 0, 0)');
            expect(tracks.item(1).style.fill).toBe('rgb(255, 0, 0)');
            expect(tracks.item(2).style.fill).toBe('rgb(255, 0, 0)');
            done();
        }, 100);
    });

    /**
     * Workaround for TestBed bug on components with ChangeDetectionStrategy.OnPush
     * https://github.com/angular/angular/issues/12313#issuecomment-263978801
     */
    function detectChanges(): void {
        (component as any)._changeDetector.markForCheck();
        fixture.detectChanges();
        component.ngOnChanges();
    }
});
