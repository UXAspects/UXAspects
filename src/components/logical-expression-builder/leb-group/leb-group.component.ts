import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExpressionCondition, ExpressionGroup } from '../interfaces/LogicalExpressionBuilderExpression';
import { LogicalOperatorDefinition } from '../interfaces/LogicalOperatorDefinition';
import { LogicalExpressionBuilderService } from '../services/logical-expression-builder.service';

@Component({
    selector: 'ux-leb-group',
    templateUrl: './leb-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LebGroupComponent implements OnInit {
    @Input() subExpression: ExpressionGroup;
    @Input() logicalOperatorName: string;
    @Input() indent: number = 0;

    @Output() groupChange = new EventEmitter<ExpressionGroup>();

    public logicalOperators: LogicalOperatorDefinition[];
    public selectedLogicalOperator: LogicalOperatorDefinition;

    constructor(private _lebService: LogicalExpressionBuilderService) {
    }

    ngOnInit(): void {
        this.logicalOperators = this._lebService.getLogicalOperators();
        this.selectedLogicalOperator = this._lebService.getLogicalOperatorByName(this.logicalOperatorName);
    }

    public handleSelectedOperatorChange(selectedOperator: LogicalOperatorDefinition) {
        this.selectedLogicalOperator = selectedOperator;
        this.subExpression = { ...this.subExpression, logicalOperator: this.selectedLogicalOperator.name };
        this.groupChange.emit(this.subExpression);
    }

    public handleGroupChange(event: ExpressionGroup | ExpressionCondition, index: number) {
        this.subExpression.children[index] = event;

        // remove children that have been deleted
        this.subExpression.children = this.subExpression.children.filter((child) => child);

        this.groupChange.emit(this.subExpression);
    }

    public addCondition() {
        this.subExpression.children = [...this.subExpression.children, {
            type: 'condition',
            field: null,
            operator: null,
            value: null,
            editable: true,
        }];
    }

    public addGroup() {
        this.subExpression.children = [...this.subExpression.children, {
            type: 'group',
            logicalOperator: this._lebService.getLogicalOperators()[0].name,
            children: [
                { type: 'condition', field: null, operator: null, value: null, editable: true },
            ],
        }];
    }

    public removeConditionAtIndex(id: number) {
        this.subExpression.children = this.subExpression.children.filter((_, index) => {
            return index !== id;
        });

        this.groupChange.emit(this.subExpression);
    }

    public embedConditionAtIndex(id: number) {
        let tempExpression = this.subExpression;
        const condition = tempExpression.children[id];

        tempExpression.children[id] = <ExpressionGroup>{
            type: 'group',
            logicalOperator: this._lebService.getLogicalOperators()[0].name,
            children: [condition],
        };

        this.subExpression = tempExpression;

        this.groupChange.emit(this.subExpression);
    }

    public deleteGroup(): void {
        this.subExpression = null;
        this.groupChange.emit(this.subExpression);
    }
}
