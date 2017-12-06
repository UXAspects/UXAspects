import { Component, TemplateRef, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { first } from 'rxjs/operators/first';
import 'chance';
import { 
    SearchBuilderQuery, SearchBuilderComponentDefinition, SearchTextComponent, 
    SearchDateRangeComponent, SearchDateRangeConfig, SearchTextConfig, 
    SearchSelectComponent, SearchSelectConfig 
} from '@ux-aspects/ux-aspects';

@Component({
  selector: 'app',
  templateUrl: './src/app.component.html',
  styleUrls: ['./src/app.component.css']
})
export class AppComponent implements OnDestroy {

  modalRef: BsModalRef;
  query: SearchBuilderQuery = {};
  preview: string = '{}';
  valid: boolean = true;
  filter: string = '';
  panelOpen: boolean = false;

  placeholders = {
    any: false,
    all: false,
    none: false
  };

  components: SearchBuilderComponentDefinition[] = [
    {
      name: 'keyword',
      component: SearchTextComponent,
      config: {
        placeholder: 'Enter a keyword'
      } as SearchTextConfig
    },
    {
      name: 'author',
      component: SearchTextComponent,
      config: {
        label: 'Author',
        placeholder: 'Enter an Author'
      } as SearchTextConfig
    },
    {
      name: 'custodian',
      component: SearchSelectComponent,
      config: {
        label: 'Custodian',
        placeholder: 'Select Custodians',
        options: this.getCustodians(),
        multiple: true
      } as SearchSelectConfig
    },
    {
      name: 'date-range',
      component: SearchDateRangeComponent,
      config: {
        label: 'Date range'
      } as SearchDateRangeConfig
    },
    {
      name: 'file-name',
      component: SearchTextComponent,
      config: {
        label: 'File name',
        placeholder: 'Enter a File Name'
      }
    },
    {
      name: 'file-type',
      component: SearchSelectComponent,
      config: {
        label: 'File types',
        placeholder: 'Select File Types',
        options: [
            'AVI', 'BMP', 'CSV', 'DOC', 'EXE', 
            'GIF', 'JPG', 'MOV', 'PDF', 'PNG', 
            'PPT', 'RTF', 'TXT', 'XLS', 'ZIP'
        ],
        multiple: true
      } as SearchSelectConfig
    },
    {
      name: 'repository',
      component: SearchSelectComponent,
      config: {
        label: 'Repository',
        placeholder: 'Enter a Repository',
        options: [
            'Filesystem', 'Records Manager', 'Email', 
            'Legacy Email', 'Archives', 'Legacy Archives', 'Miscellaneous'
        ],
        multiple: true
      } as SearchSelectConfig
    },
    {
      name: 'text',
      component: SearchTextComponent,
      config: {
        label: 'Text',
        placeholder: 'Enter Text'
      } as SearchTextConfig
    }
  ];

  fields: SearchBuilderField[] = [
    {
      title: 'Author',
      type: 'author',
    },
    {
      title: 'Custodian',
      type: 'custodian'
    },
    {
      title: 'Date Range',
      type: 'date-range'
    },
    {
      title: 'File Name',
      type: 'file-name'
    },
    {
      title: 'File Type',
      type: 'file-type'
    },
    {
      title: 'Repository',
      type: 'repository'
    },
    {
      title: 'Text',
      type: 'text'
    }
  ];

  private _field$: Subject<SearchBuilderField> = new Subject<SearchBuilderField>();
  private _subscription: Subscription;

  constructor(private modalService: BsModalService) {
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
    this.query.keywords.push({ type: 'keyword', value: null });
  }

  addField(group: string): void {

    // show the panel
    this.showPanel();

    // show the placeholder field
    this.placeholders[group] = true;

    // subscribe to only the next field event
    this._field$.pipe(first()).subscribe(field => {

      // remove the placeholder
      this.placeholders[group] = false;

      // if a field was selected then add it to the query
      if (field) {
        this.query[group].push({ type: field.type, value: null });
      }
    });
  }

  showPanel() {
    // clear any existing filters
    this.filter = '';

    // show the panel
    this.panelOpen = true;
  }

  onPanelEvent(open: boolean): void {

    // if closing indication that no field was chosen
    if (!open) {
      this._field$.next(null);
    }
  }

  selectField(field: SearchBuilderField): void {

    // emit the selected field
    this._field$.next(field);

    // close the panel
    this.panelOpen = false;
  }

  getCustodians(): string[] {
    const custodians: string[] = [];

    for (let idx = 0; idx < 20; idx++) {
      custodians.push(chance.name());
    }

    return custodians;
  }
}

interface SearchBuilderField {
  title: string;
  type: string;
}
