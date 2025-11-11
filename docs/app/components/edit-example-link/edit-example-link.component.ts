import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { AccessibilityModule, IconModule } from '@ux-aspects/ux-aspects';
import { IPlayground } from '../../interfaces/IPlayground';
import { EditExampleService } from '../../services/edit-example/edit-example.service';

@Component({
  selector: 'uxd-edit-example-link',
  templateUrl: './edit-example-link.component.html',
  styleUrls: ['./edit-example-link.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.enabled]': '!!content',
  },
  imports: [AccessibilityModule, IconModule],
})
export class EditExampleLinkComponent {
  private readonly editExampleService = inject(EditExampleService);

  @Input() title: string;
  @Input() content: IPlayground;
  @Input() version: 'Angular' | 'AngularJS' = 'Angular';

  linkClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    target.blur();
    this.editExampleService.launchEditor(this.title, this.content);
  }
}
