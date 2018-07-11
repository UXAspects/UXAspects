import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnDestroy } from '@angular/core';
import { ColorService } from '../../../../../../../src/index';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-flippable-cards',
    templateUrl: './flippable-cards.component.html',
    styleUrls: ['./flippable-cards.component.less']
})
@DocumentationSectionComponent('ComponentsFlippableCardsComponent')
export class ComponentsFlippableCardsComponent extends BaseDocumentationSection implements OnDestroy {

    options = {
        size: 70,
        donutWidth: 3,
        donutSpacing: 3,
        hoverAnimation: true,
        centerLabel: {
            show: false
        },
        tooltip: {
            show: false
        }
    };

    cards: Card[] = [
        {
            title: 'NYC vs Volkswagen',
            label: 'Flippable Card: Activate toggle button to flip card',
            flipped: false,
            trigger: 'manual',
            direction: 'vertical',
            stats: {
                documents: 23456,
                reviewed: 19876,
                produced: 11123,
                size: 1.2
            },
            chart: this.getChartData(23456, 19876, 11123)
        },
        {
            title: 'The Dorling Case',
            label: 'Flippable Card: Activate to flip card',
            flipped: false,
            trigger: 'hover',
            direction: 'horizontal',
            stats: {
                documents: 15678,
                reviewed: 10123,
                produced: 3123,
                size: 0.8
            },
            chart: this.getChartData(15678, 10123, 3123)
        },
        {
            title: 'The Salisbury Case',
            label: 'Flippable Card: Activate to flip card',
            flipped: false,
            trigger: 'click',
            direction: 'horizontal',
            stats: {
                documents: 256987,
                reviewed: 143567,
                produced: 45678,
                size: 10.7
            },
            chart: this.getChartData(256987, 143567, 45678)
        }
    ];

    constructor(public colorService: ColorService, private _announcer: LiveAnnouncer) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    ngOnDestroy(): void {
        this._announcer.ngOnDestroy();
    }

    getChartData(documents: number, reviewed: number, produced: number): ChartData[] {
        return [
            {
                label: 'documents',
                color: this.colorService.getColor('grey6').toHex(),
                value: documents
            }, {
                label: 'reviewed',
                color: this.colorService.getColor('vibrant1').toHex(),
                value: reviewed
            }, {
                label: 'produced',
                color: this.colorService.getColor('vibrant2').toHex(),
                value: produced
            }
        ];
    }

    onCardFlip(flipped: boolean): void {
        this._announcer.announce(flipped ? 'Card is flipped.' : 'Card is not flipped.', 'assertive');
    }

}

export interface Card {
    title: string;
    label: string;
    flipped: boolean;
    trigger: string;
    direction: string;
    stats: {
        documents: number;
        reviewed: number;
        produced: number;
        size: number;
    };
    chart: ChartData[];
}

export interface ChartData {
    label: string;
    color: string;
    value: number;
}