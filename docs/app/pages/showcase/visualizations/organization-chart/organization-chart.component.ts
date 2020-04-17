import { FocusOrigin } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FocusIndicatorOriginService, HierarchyBarNode, OrganizationChartComponent, OrganizationChartNode, TypeaheadKeyService, TypeaheadOptionEvent } from '@ux-aspects/ux-aspects';
import { Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { OrganizationChartContext, OrganizationChartDataService } from './organization-chart.service';

@Component({
    selector: 'uxd-organization-chart',
    templateUrl: './organization-chart.component.html',
    styleUrls: ['./organization-chart.component.less']
})
export class OrganizationChartShowcaseComponent implements OnInit, OnDestroy {

    /** Define the open state of the search input */
    isSearchOpen: boolean = false;

    /** Determine if we should show the reveal button */
    showReveal: boolean = true;

    /** Store the current search query */
    query: string = '';

    /** Get the organization dataset */
    dataset: OrganizationChartNode<OrganizationChartContext> = this._dataService.getDataset().children[0];

    /** Get the hierarchy from the dataset */
    hierarchy: HierarchyBarNode = this.getHierarchy(this.dataset);

    /** Store the currently selected hierarchy bar node */
    hierarchyBarSelected: HierarchyBarNode;

    /** Store the currently selected organization chart node */
    organizationChartSelected: OrganizationChartNode<OrganizationChartContext>;

    /** Store the typeahead search options */
    typeaheadOptions: OrganizationChartNode<OrganizationChartContext>[] = this.flatten(this.dataset);

    /** Store the current highlighted options */
    highlighted: OrganizationChartNode<OrganizationChartContext>;

    /** Emit whenever the transition ends */
    onTransitionEnd = new Subject<void>();

    /** Get the organization chart component instance */
    @ViewChild(OrganizationChartComponent, { static: true }) organizationChart: OrganizationChartComponent<OrganizationChartContext>;

    constructor(
        private _dataService: OrganizationChartDataService,
        public typeaheadKeyService: TypeaheadKeyService,
        private _changeDetector: ChangeDetectorRef,
        private _focusIndicatorOrigin: FocusIndicatorOriginService
    ) { }

    ngOnInit(): void {
        // set the initial selection
        this.onOrganizationChartSelect(this.dataset.children[0]);
    }

    ngOnDestroy(): void {
        this.onTransitionEnd.complete();
    }

    getHierarchy(node: OrganizationChartNode<OrganizationChartContext>): HierarchyBarNode {
        return {
            title: node.data.name,
            children: node.children ? node.children.map(child => this.getHierarchy(child)) : null
        } as HierarchyBarNode;
    }

    onReveal(): void {
        this.dataset = this._dataService.getDataset();

        // update the hierarchy bar
        this.hierarchy = this.getHierarchy(this.dataset);
        this.typeaheadOptions = this.flatten(this.dataset);

        this.showReveal = false;
    }

    onOrganizationChartSelect(node: OrganizationChartNode<OrganizationChartContext>): void {
        // store the selected node
        this.organizationChartSelected = node;

        // get a flattened array of all hierarchy bar nodes
        const nodes = this.flatten(this.hierarchy);

        // find the matching hierarchy bar node
        this.hierarchyBarSelected = nodes.find(_node => _node.title === node.data.name);
    }

    onHierarchyBarSelect(node: HierarchyBarNode): void {
        // get a flattened array of all hierarchy bar nodes
        const nodes = this.flatten(this.dataset);

        // find the matching hierarchy bar node
        this.organizationChartSelected = nodes.find(_node => _node.data.name === node.title);
    }

    onTypeaheadSelect(event: TypeaheadOptionEvent | OrganizationChartNode<OrganizationChartContext>, focusOrigin: FocusOrigin = 'mouse'): void {
        const node = event instanceof TypeaheadOptionEvent ? event.option : event;
        this.query = '';

        // set the focus origin
        this._focusIndicatorOrigin.setOrigin(focusOrigin);

        const selectNode = () => {
            this.onOrganizationChartSelect(node);
            this._changeDetector.detectChanges();
            this.organizationChart.focus(node);
        };

        // ensure the node is visible - if not get may need to fetch hidden items
        if (this.flatten(this.dataset).indexOf(node) === -1) {
            this.onReveal();
            this.typeaheadOptions = this.flatten(this.dataset);

            // wait for transition to end
            this.onTransitionEnd.pipe(first()).subscribe(() => selectNode());
        } else {
            selectNode();
        }
    }

    /** Get a flattened array of the OrganizationChart nodes or HierarchyBarNodes */
    flatten<T extends HasChildren<T>>(nodes: T | T[]): T[] {
        nodes = Array.isArray(nodes) ? nodes : [nodes];
        return nodes.reduce((accumulation, node) =>
            Array.isArray(node.children) ?
                [...accumulation, node, ...this.flatten(node.children)] :
                [...accumulation, node], []);
    }

    getTypeaheadDisplay(node: OrganizationChartNode<OrganizationChartContext>): string {
        return node.data.name;
    }

    search(): void {
        // filter the dataset
        const options = this.flatten(this._dataService.getDataset());

        this.typeaheadOptions = options.filter(option => {
            return option.data.name.toLowerCase().indexOf(this.query.toLowerCase()) !== -1 ||
                option.data.role.toLowerCase().indexOf(this.query.toLowerCase()) !== -1;
        });
    }
}

export interface HasChildren<T> {
    children?: T[] | ReadonlyArray<T> | Observable<T[]>;
}