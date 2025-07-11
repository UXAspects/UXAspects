import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AccessibilityModule,
  AccordionModule,
  CheckboxModule,
  ColorPickerColor,
  ColorPickerModule,
  ColorService,
  IconModule,
  MenuModule,
  MenuTriggerDirective,
  NumberPickerModule,
  RadioButtonModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import { ApiPropertiesComponent } from '../../../../../components/api-properties/api-properties.component';
import { ApiPropertyComponent } from '../../../../../components/api-property/api-property.component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.less'],
  imports: [
    MenuModule,
    IconModule,
    ColorPickerModule,
    NgIf,
    AccessibilityModule,
    AccordionModule,
    NumberPickerModule,
    CheckboxModule,
    RadioButtonModule,
    RouterLink,
    ApiPropertiesComponent,
    ApiPropertyComponent,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsColorPickerComponent')
export class ComponentsColorPickerComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['ColorPickerModule, MenuModule'],
        library: '@ux-aspects/ux-aspects',
      },
    ],
  };

  @ViewChild(MenuTriggerDirective) menuTrigger?: MenuTriggerDirective;

  colors: ColorPickerColor[][];
  selected: ColorPickerColor;
  columns = 4;
  buttonStyle = 'circle';
  buttonSize = 'md';
  showTooltips = false;
  showInput = false;

  _colorNames = [
    [
      'Primary',
      'Accent',
      'Secondary',
      'Alternate1',
      'Alternate2',
      'Alternate3',
      'Vibrant1',
      'Vibrant2',
    ],
    ['Grey1', 'Grey2', 'Grey3', 'Grey4', 'Grey5', 'Grey6', 'Grey7', 'Grey8'],
  ];

  constructor(colorService: ColorService) {
    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );

    this.colors = this._colorNames.map(row =>
      row.map(colorName => new ColorPickerColor(colorName, colorService.resolve(colorName)))
    );

    this.selected = this.colors[0][0];
  }

  close(): void {
    this.menuTrigger?.closeMenu();
  }

  onColorPickerSelectedChange(): void {
    if (!this.showInput) {
      this.close();
    }
  }
}
