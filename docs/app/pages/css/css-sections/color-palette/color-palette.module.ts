import { ComponentFactoryResolver, NgModule, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorServiceModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { CssColorPaletteComponent } from './color-palette/color-palette.component';

const SECTIONS = [CssColorPaletteComponent];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Css, 'Color Palette'),
    },
  },
];

@NgModule({
  imports: [
    DocumentationComponentsModule,
    RouterModule.forChild(ROUTES),
    ColorServiceModule,
    ...SECTIONS,
  ],
  exports: SECTIONS,
})
export class CssColorPaletteModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
