import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DecimalPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  AccessibilityModule,
  ColorService,
  FlippableCardModule,
  IconModule,
  NestedDonutChartData,
  NestedDonutChartModule,
  SparkModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
  selector: 'uxd-components-flippable-cards',
  templateUrl: './flippable-cards.component.html',
  styleUrls: ['./flippable-cards.component.less'],
  imports: [
    NgFor,
    FlippableCardModule,
    AccessibilityModule,
    IconModule,
    NestedDonutChartModule,
    SparkModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
    DecimalPipe,
  ],
})
@DocumentationSectionComponent('ComponentsFlippableCardsComponent')
export class ComponentsFlippableCardsComponent extends BaseDocumentationSection {
  icon: string = 'assets/img/IconCaseColorized36x36.png';

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
        size: 1.2,
      },
      chart: this.getChartData(23456, 19876, 11123),
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
        size: 0.8,
      },
      chart: this.getChartData(15678, 10123, 3123),
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
        size: 10.7,
      },
      chart: this.getChartData(256987, 143567, 45678),
    },
  ];

  constructor(
    public colorService: ColorService,
    private readonly _announcer: LiveAnnouncer
  ) {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );
  }

  getChartData(documents: number, reviewed: number, produced: number): NestedDonutChartData[] {
    return [
      {
        name: 'documents',
        color: this.colorService.getColor('grey6').toHex(),
        value: documents,
      },
      {
        name: 'reviewed',
        color: this.colorService.getColor('vibrant1').toHex(),
        value: reviewed,
      },
      {
        name: 'produced',
        color: this.colorService.getColor('vibrant2').toHex(),
        value: produced,
      },
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
  chart: NestedDonutChartData[];
}
