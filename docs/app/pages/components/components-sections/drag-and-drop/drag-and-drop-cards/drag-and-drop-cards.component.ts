import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NgFor, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AccessibilityModule, FocusIfModule, IconModule, MenuModule, ReorderableModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-drag-and-drop-cards',
    templateUrl: './drag-and-drop-cards.component.html',
    styleUrls: ['./drag-and-drop-cards.component.less'],
    imports: [
        ReorderableModule,
        AccessibilityModule,
        NgFor,
        FocusIfModule,
        IconModule,
        NgTemplateOutlet,
        MenuModule,
        ButtonsModule,
        FormsModule,
        RouterLink,
        TabsetModule,
        SnippetComponent,
    ],
})
@DocumentationSectionComponent('ComponentsDragAndDropCardsComponent')
export class ComponentsDragAndDropCardsComponent
  extends BaseDocumentationSection
  implements AfterViewInit, IPlaygroundProvider
{
  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.css': this.snippets.raw.appCss,
    },
    modules: [
      {
        imports: ['FocusIfModule', 'ReorderableModule', 'MenuModule'],
        library: '@ux-aspects/ux-aspects',
      },
      {
        imports: ['ButtonsModule'],
        library: 'ngx-bootstrap/buttons',
        forRoot: true,
      },
      {
        imports: ['A11yModule'],
        library: '@angular/cdk/a11y',
      },
    ],
  };

  cards: DragAndDropComponent[];
  list: DragAndDropComponent[];
  focus: DragAndDropComponent = null;
  direction: string;

  @ViewChild('dropdown', { static: false }) dropdownTemplate: TemplateRef<any>;
  @ViewChild('text', { static: true }) textTemplate: TemplateRef<any>;
  @ViewChild('buttons', { static: true }) buttonsTemplate: TemplateRef<any>;

  constructor(private readonly _liveAnnouncer: LiveAnnouncer) {
    super(
      import.meta.webpackContext('./snippets/', { recursive: false, regExp: /\.(html|css|js|ts)$/ })
    );

    this.cards = [
      {
        name: 'Actions',
        type: 'Dropdown',
        icon: 'down',
      },
      {
        name: 'Comments',
        type: 'Text',
        icon: 'document',
      },
      {
        name: 'Direction',
        type: 'Buttons',
        icon: 'divide',
      },
    ];

    this.list = [];
  }

  ngAfterViewInit(): void {
    this.cards[0].content = this.dropdownTemplate;
    this.cards[1].content = this.textTemplate;
    this.cards[2].content = this.buttonsTemplate;
  }

  moveUp(collection: DragAndDropComponent[], index: number, event: KeyboardEvent): void {
    const item = collection[index];
    const target = Math.max(index - 1, 0);
    collection[index] = collection[target];
    collection[target] = item;
    this.focus = item;
    event.preventDefault();

    // announce the move
    this._liveAnnouncer.announce('Item moved up.');

    // ngFor blurs the element when shifting up - we want to retain focus
    setTimeout(() => (<HTMLTableRowElement>event.target).focus());
  }

  moveDown(collection: DragAndDropComponent[], index: number, event: KeyboardEvent): void {
    const item = collection[index];
    const target = Math.min(index + 1, collection.length - 1);
    collection[index] = collection[target];
    collection[target] = item;
    this.focus = item;
    event.preventDefault();

    // announce the move
    this._liveAnnouncer.announce('Item moved down.');
  }

  toList(sourceCollection: DragAndDropComponent[], index: number, event: KeyboardEvent): void {
    const item = sourceCollection[index];
    this.list.push(item);
    sourceCollection.splice(index, 1);
    this.focus = item;
    event.preventDefault();

    // announce the move
    this._liveAnnouncer.announce('Item moved to list.');
  }

  toCard(sourceCollection: DragAndDropComponent[], index: number, event: KeyboardEvent): void {
    const item = sourceCollection[index];
    this.cards.push(item);
    sourceCollection.splice(index, 1);
    this.focus = item;
    event.preventDefault();

    // announce the move
    this._liveAnnouncer.announce('Item moved to cards.');
  }
}

class DragAndDropComponent {
  name: string;
  type: string;
  icon: string;
  content?: TemplateRef<any>;
}
