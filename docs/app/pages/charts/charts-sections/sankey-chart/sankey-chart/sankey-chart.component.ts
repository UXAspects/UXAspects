import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FileSizePipeModule,
  SankeyChartModule,
  SankeyLink,
  SankeyNode,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-charts-sankey-chart',
  templateUrl: './sankey-chart.component.html',
  styleUrls: ['./sankey-chart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SankeyChartModule,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
    FileSizePipeModule,
  ],
})
@DocumentationSectionComponent('ChartsSankeyChartComponent')
export class ChartsSankeyChartComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  nodes: ReadonlyArray<SankeyNode<SankeyNodeData>> = [
    {
      id: SankeyNodeId.FileSystem,
      data: { name: 'File System Windows', files: 2_100_000, space: 23_100_000_000 },
    },
    {
      id: SankeyNodeId.Exchange,
      data: { name: 'Exchange', files: 3_700_000, space: 40_700_000_000 },
    },
    {
      id: SankeyNodeId.Office365,
      data: { name: 'Office 365 Exchange', files: 1_600_000, space: 17_600_000_000 },
    },
    {
      id: SankeyNodeId.SharePoint,
      data: { name: 'Sharepoint', files: 5_300_000, space: 58_300_000_000 },
    },
    {
      id: SankeyNodeId.Text,
      data: { name: 'Text', files: 2_300_000, space: 18_700_000_000 },
    },
    {
      id: SankeyNodeId.Audio,
      data: { name: 'Audio', files: 1_300_000, space: 17_600_000_000 },
    },
    {
      id: SankeyNodeId.Video,
      data: { name: 'Video', files: 2_500_000, space: 23_100_000_000 },
    },
    {
      id: SankeyNodeId.Entity,
      data: { name: 'Entity', files: 2_950_000, space: 22_000_000_000 },
    },
    {
      id: SankeyNodeId.Metadata,
      data: { name: 'Metadata', files: 1_450_000, space: 12_100_000_000 },
    },
    {
      id: SankeyNodeId.Other,
      data: { name: 'Other', files: 2_200_000, space: 20_900_000_000 },
    },
    {
      id: SankeyNodeId.EmployeeData,
      data: { name: 'Employee data', files: 3_030_000, space: 23_100_000_000 },
    },
    {
      id: SankeyNodeId.HealthData,
      data: { name: 'Health data', files: 1_400_000, space: 17_600_000_000 },
    },
    {
      id: SankeyNodeId.FinancialData,
      data: { name: 'Financial', files: 2_540_000, space: 17_600_000_000 },
    },
    {
      id: SankeyNodeId.LegalData,
      data: { name: 'Legal', files: 640_000, space: 30_000_000 },
    },
    {
      id: SankeyNodeId.PersonalData,
      data: { name: 'Personal', files: 2_480_000, space: 20_900_000_000 },
    },
    {
      id: SankeyNodeId.OtherData,
      data: { name: 'Other', files: 2_800_000, space: 19_800_000_000 },
    },
  ];

  links: ReadonlyArray<SankeyLink> = [
    { source: SankeyNodeId.FileSystem, target: SankeyNodeId.Video, value: 950_000 },
    { source: SankeyNodeId.FileSystem, target: SankeyNodeId.Metadata, value: 200_000 },
    { source: SankeyNodeId.FileSystem, target: SankeyNodeId.Other, value: 950_000 },
    { source: SankeyNodeId.Exchange, target: SankeyNodeId.Text, value: 2_440_000 },
    { source: SankeyNodeId.Exchange, target: SankeyNodeId.Entity, value: 1_700_000 },
    { source: SankeyNodeId.Office365, target: SankeyNodeId.Text, value: 500_000 },
    { source: SankeyNodeId.Office365, target: SankeyNodeId.Audio, value: 1_000_000 },
    { source: SankeyNodeId.Office365, target: SankeyNodeId.Other, value: 300_000 },
    { source: SankeyNodeId.SharePoint, target: SankeyNodeId.Audio, value: 300_000 },
    { source: SankeyNodeId.SharePoint, target: SankeyNodeId.Video, value: 1_250_000 },
    { source: SankeyNodeId.SharePoint, target: SankeyNodeId.Entity, value: 1_250_000 },
    { source: SankeyNodeId.SharePoint, target: SankeyNodeId.Metadata, value: 1_250_000 },
    { source: SankeyNodeId.SharePoint, target: SankeyNodeId.Other, value: 1_250_000 },
    { source: SankeyNodeId.Text, target: SankeyNodeId.EmployeeData, value: 1_150_000 },
    { source: SankeyNodeId.Text, target: SankeyNodeId.FinancialData, value: 920_000 },
    { source: SankeyNodeId.Text, target: SankeyNodeId.LegalData, value: 640_000 },
    { source: SankeyNodeId.Text, target: SankeyNodeId.PersonalData, value: 230_000 },
    { source: SankeyNodeId.Audio, target: SankeyNodeId.HealthData, value: 520_000 },
    { source: SankeyNodeId.Audio, target: SankeyNodeId.OtherData, value: 780_000 },
    { source: SankeyNodeId.Video, target: SankeyNodeId.PersonalData, value: 2_250_000 },
    { source: SankeyNodeId.Video, target: SankeyNodeId.OtherData, value: 250_000 },
    { source: SankeyNodeId.Entity, target: SankeyNodeId.OtherData, value: 1_770_000 },
    { source: SankeyNodeId.Entity, target: SankeyNodeId.FinancialData, value: 1_180_000 },
    { source: SankeyNodeId.Metadata, target: SankeyNodeId.EmployeeData, value: 1_000_000 },
    { source: SankeyNodeId.Other, target: SankeyNodeId.HealthData, value: 880_000 },
    { source: SankeyNodeId.Other, target: SankeyNodeId.EmployeeData, value: 880_000 },
    { source: SankeyNodeId.Other, target: SankeyNodeId.FinancialData, value: 440_000 },
  ];

  columns: string[] = ['Repositories', 'Extraction', 'Classification'];

  playground = () => {
    return {
      files: {
        'app.component.html': this.snippets.raw.appHtml,
        'app.component.css': this.snippets.raw.appCss,
        'app.component.ts': this.snippets.raw.appTs,
      },
      modules: [
        {
          imports: ['SankeyChartModule', 'FileSizePipeModule'],
          library: '@ux-aspects/ux-aspects',
        },
      ],
    };
  };

  constructor() {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );
  }

  getFileCount(count: number): string {
    return (count / 1_000_000).toPrecision(2) + 'M';
  }

  getAriaLabel(node: SankeyNode<SankeyNodeData>, size: string): string {
    return (
      node.data.name +
      ' has ' +
      (node.data.files / 1_000_000).toPrecision(2) +
      ' million files, occupying ' +
      size +
      ' of disk space'
    );
  }
}

export interface SankeyNodeData {
  name: string;
  files: number;
  space: number;
}

export enum SankeyNodeId {
  FileSystem,
  Exchange,
  Office365,
  SharePoint,
  Text,
  Audio,
  Video,
  Entity,
  Metadata,
  Other,
  EmployeeData,
  HealthData,
  FinancialData,
  LegalData,
  PersonalData,
  OtherData,
}
