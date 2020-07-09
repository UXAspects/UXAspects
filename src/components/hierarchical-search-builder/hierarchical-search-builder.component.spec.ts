import { HierarchicalSearchBuilderComponent } from './hierarchical-search-builder.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('HierarchicalSearchBuilderComponent', () => {
    let component: HierarchicalSearchBuilderComponent;
    let fixture: ComponentFixture<HierarchicalSearchBuilderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HierarchicalSearchBuilderComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HierarchicalSearchBuilderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeDefined();
    });
});
