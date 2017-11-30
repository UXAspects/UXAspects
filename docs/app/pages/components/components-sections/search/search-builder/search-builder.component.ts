import { Component, TemplateRef, OnDestroy } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SearchBuilderQuery, SearchBuilderComponentDefinition, SearchTextComponent } from '../../../../../../../src/index';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'uxd-search-builder',
  templateUrl: './search-builder.component.html'
})
@DocumentationSectionComponent('ComponentsSearchBuilderComponent')
export class ComponentsSearchBuilderComponent extends BaseDocumentationSection implements IPlunkProvider, OnDestroy {

  modalRef: BsModalRef;
  query: SearchBuilderQuery = {};
  preview: string = '{}';

  plunk: IPlunk = {
    files: {
      'app.component.ts': this.snippets.raw.appTs,
      'app.component.html': this.snippets.raw.appHtml
    },
    modules: [
      {
        imports: ['ModalModule'],
        library: 'ngx-bootstrap/modal',
        forRoot: true
      },
      {
        imports: ['SearchBuilderModule'],
        library: '@ux-aspects/ux-aspects'
      }
    ]
  };

  components: SearchBuilderComponentDefinition[] = [
    {
      name: 'keyword',
      component: SearchTextComponent,
      config: {
        placeholder: 'Enter a keyword'
      }
    },
    {
      name: 'author',
      component: SearchTextComponent,
      config: {
        placeholder: 'Enter an Author'
      }
    },
    {
      name: 'repository',
      component: SearchTextComponent,
      config: {
        placeholder: 'Enter a Repository'
      }
    },
    {
      name: 'term',
      component: SearchTextComponent,
      config: {
        placeholder: 'Enter a Term'
      }
    }
  ];

  private _subscription: Subscription;

  constructor(private modalService: BsModalService) {
    super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

    // if the modal is closed by clicking on backdrop perform cancel
    this._subscription = this.modalService.onHide.subscribe(() => this.cancel());
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg search-builder-modal'
    });
  }

  save(): void {
    this.preview = JSON.stringify(this.query, null, 2);
    this.modalRef.hide();
  }

  cancel(): void {
    this.query = JSON.parse(this.preview);
    this.modalRef.hide();
  }

  addKeyword(): void {
    this.query.keywords.push({ type: 'date-range', value: new Date() });
  }

  addAuthor(): void {
    this.query.authors.push({ type: 'author', value: '' });
  }

  addRepository(): void {
    this.query.repositories.push({ type: 'repository', value: '' });
  }

  addTerm(): void {
    this.query.terms.push({ type: 'term', value: '' });
  }
}
