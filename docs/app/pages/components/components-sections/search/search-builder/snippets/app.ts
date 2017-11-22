import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SearchBuilderQuery } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html'
})
export class AppComponent {

    modalRef: BsModalRef;
    query: SearchBuilderQuery = {};
    preview: string = '{}';

    constructor(private modalService: BsModalService) { }

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
