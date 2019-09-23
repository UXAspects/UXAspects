import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IPlayground } from '../../interfaces/IPlayground';
import { EditExampleService } from '../../services/edit-example/edit-example.service';

@Component({
    selector: 'uxd-edit-example-link',
    templateUrl: './edit-example-link.component.html',
    styleUrls: ['./edit-example-link.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.enabled]': '!!content'
    }
})
export class EditExampleLinkComponent {

    @Input() title: string;
    @Input() content: IPlayground;
    @Input() version: 'Angular' | 'AngularJS' = 'Angular';

    constructor(private editExampleService: EditExampleService) { }

    linkClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        target.blur();
        this.editExampleService.launchEditor(this.title, this.content);
    }

}
