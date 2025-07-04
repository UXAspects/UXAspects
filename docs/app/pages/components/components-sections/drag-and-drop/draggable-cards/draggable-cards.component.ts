import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ColorService, TabbableListDirective } from '@ux-aspects/ux-aspects';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-draggable-cards',
    templateUrl: './draggable-cards.component.html',
    styleUrls: ['./draggable-cards.component.less'],
    standalone: false
})
@DocumentationSectionComponent('ComponentsDraggableCardsComponent')
export class ComponentsDraggableCardsComponent
    extends BaseDocumentationSection
    implements IPlaygroundProvider
{
    colors = [
        this._colorService.getColor('accent').toRgb(),
        this._colorService.getColor('accent').setAlpha(0.5).toRgba(),
        this._colorService.getColor('grey5').toRgb(),
    ];

    options: ChartOptions<'doughnut'> = {
        animation: {
            duration: 0,
        },
        cutout: 20,
        elements: {
            arc: {
                borderWidth: 0,
            },
        },
        plugins: {
            tooltip: {
                enabled: false,
            },
        },
        responsive: false,
    };

    fixedCards: FixedCard[] = [
        {
            title: 'All',
            count: 8,
        },
        {
            title: 'No Category',
            count: 2,
        },
    ];

    draggableCards: DraggableCard[] = [
        {
            title: 'Protected',
            count: 6,
            subtitle: '15% unique, 10% shared',
            description: 'NYC Preliminary Production 1 created from the protected items.',
            chart: {
                count: 13.2,
                segments: [
                    {
                        data: [45, 25, 30],
                        backgroundColor: this.colors,
                    },
                ],
            },
        },
        {
            title: 'Privileged',
            count: 4,
            subtitle: '7% unique, 10% shared',
            description: 'NYC Production 2 created as a follow up to Production 1.',
            chart: {
                count: 6.5,
                segments: [
                    {
                        data: [10, 5, 85],
                        backgroundColor: this.colors,
                    },
                ],
            },
        },
        {
            title: 'Relevant',
            count: 2,
            subtitle: '65% unique, 12% shared',
            description: 'NYC Production 3 Lorem ipsum dolor sit amet, consectetur…',
            chart: {
                count: 33.2,
                segments: [
                    {
                        data: [60, 15, 25],
                        backgroundColor: this.colors,
                    },
                ],
            },
        },
        {
            title: 'Proprietary',
            count: 3,
            subtitle: '7% unique, 10% shared',
            description: 'NYC Production 4 Lorem ipsum dolor sit amet, consectetur…',
            chart: {
                count: 5.4,
                segments: [
                    {
                        data: [10, 5, 85],
                        backgroundColor: this.colors,
                    },
                ],
            },
        },
        {
            title: 'Reviewed',
            count: 2,
            subtitle: '65% unique, 12% shared',
            description: 'NYC Production 3 Lorem ipsum dolor sit amet, consectetur…',
            chart: {
                count: 33.2,
                segments: [
                    {
                        data: [60, 10, 30],
                        backgroundColor: this.colors,
                    },
                ],
            },
        },
    ];

    active: FixedCard | DraggableCard = this.draggableCards[0];

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            {
                imports: ['ReorderableModule'],
                library: '@ux-aspects/ux-aspects',
            },
            {
                imports: ['NgChartsModule'],
                library: 'ng2-charts',
            },
            {
                imports: ['A11yModule'],
                library: '@angular/cdk/a11y',
            },
        ],
    };

    @ViewChildren('draggableCard') cards?: QueryList<ElementRef>;

    constructor(private readonly _colorService: ColorService, private readonly _liveAnnouncer: LiveAnnouncer) {
        super(
            import.meta.webpackContext('./snippets/', {
                recursive: false,
                regExp: /\.(html|css|js|ts)$/,
            })
        );
    }

    remove(card: DraggableCard, tabbableList: TabbableListDirective): void {
        // remove the card
        this.draggableCards = this.draggableCards.filter(_card => _card !== card);

        // announce the card has been removed
        this._liveAnnouncer.announce('Card has been removed');

        // we want to focus the previous card
        if (tabbableList.focusKeyManager && tabbableList.focusKeyManager.activeItemIndex != null) {
            if (tabbableList.focusKeyManager.activeItemIndex > 0) {
                tabbableList.focusKeyManager.setActiveItem(
                    tabbableList.focusKeyManager.activeItemIndex - 1
                );
            } else {
                tabbableList.focusKeyManager.setActiveItem(
                    tabbableList.focusKeyManager.activeItemIndex + 1
                );
            }
        }
    }

    move(card: DraggableCard, delta: number): void {
        // perform the move
        const index = this.draggableCards.indexOf(card);
        this.swap(index, index + delta);

        // Announce the move if the order has changed
        if (this.draggableCards.indexOf(card) !== index) {
            this._liveAnnouncer.announce(`Card moved ${delta > 0 ? 'down' : 'up'}`);
        }

        // after the UI has updated focus the element again (ngFor creates new DOM elements)
        requestAnimationFrame(() => {
            const target = this.cards.toArray()[index + delta];

            if (target) {
                target.nativeElement.focus();
            }
        });
    }

    private swap(source: number, target: number): void {
        // perform boundary checks
        if (target < 0 || target > this.draggableCards.length - 1) {
            return;
        }

        const temp = { ...this.draggableCards[target] };
        this.draggableCards[target] = { ...this.draggableCards[source] };
        this.draggableCards[source] = temp;
    }
}

export interface FixedCard {
    title: string;
    count: number;
}

export interface DraggableCard {
    title: string;
    count: number;
    subtitle: string;
    description: string;
    chart: {
        count: number;
        segments: ChartDataset<'doughnut'>[];
    };
}
