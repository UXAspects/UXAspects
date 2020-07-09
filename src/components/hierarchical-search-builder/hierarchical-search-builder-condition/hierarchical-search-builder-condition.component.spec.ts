import { HierarchicalSearchBuilderConditionComponent } from './hierarchical-search-builder-condition.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('HierarchicalSearchBuilderConditionComponent', () => {
    let component: HierarchicalSearchBuilderConditionComponent;
    let fixture: ComponentFixture<HierarchicalSearchBuilderConditionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HierarchicalSearchBuilderConditionComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HierarchicalSearchBuilderConditionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeDefined();
    });
});
