import { Component, TemplateRef } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SearchBuilderQuery } from '../../../../../../../src/index';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-search-builder',
    templateUrl: './search-builder.component.html'
})
@DocumentationSectionComponent('ComponentsSearchBuilderComponent')
export class ComponentsSearchBuilderComponent extends BaseDocumentationSection implements IPlunkProvider {

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

    constructor(private modalService: BsModalService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
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
      this.query.keywords.push({
        type: 'text',
        value: '',
        config: {
          placeholder: 'Enter a keyword'
        }
      });
    }
    
    addAuthor(): void {
      this.query.authors.push({
        type: 'text',
        value: '',
        config: {
          placeholder: 'Enter an Author'
        }
      });
    }
    
    addRepository(): void {
      this.query.repositories.push({
        type: 'text',
        value: '',
        config: {
          placeholder: 'Enter a Repository'
        }
      });
    }
    
    addTerm(): void {
      this.query.terms.push({
        type: 'text',
        value: '',
        config: {
          placeholder: 'Enter a Term'
        }
      });
    }
}
