import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AccordionModule,
  MediaPlayerModule,
  RadioButtonModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsMediaPlayerComponent } from './media-player/media-player.component';

const SECTIONS = [ComponentsMediaPlayerComponent];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Media Player'),
    },
  },
];

@NgModule({
  imports: [
    TabsetModule,
    MediaPlayerModule,
    RadioButtonModule,
    AccordionModule,
    DocumentationComponentsModule,
    CommonModule,
    RouterModule.forChild(ROUTES),
    ...SECTIONS,
  ],
  exports: SECTIONS,
})
export class ComponentsMediaPlayerModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
