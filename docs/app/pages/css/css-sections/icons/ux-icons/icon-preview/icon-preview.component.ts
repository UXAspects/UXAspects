import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'uxd-icon-preview',
    templateUrl: './icon-preview.component.html',
    styleUrls: ['./icon-preview.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconPreviewComponent {
    @Input() name: string;
    @Input() classname: string;
    @Input() iconset: string;
    @Input() iconSetClass: string;

    constructor() {}

    getUXComponentSnippet(): string {
        return `<ux-icon name="${this.name}"></ux-icon>`;
    }

    getUXIconSnippet(): string {
        return `<i class="ux-icon ${this.classname}"></i>`;
    }

    getHpeIconSnippet(): string {
        return `<i class="hpe-icon ${this.classname}"></i>`;
    }
}