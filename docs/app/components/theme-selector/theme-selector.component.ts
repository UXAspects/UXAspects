import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Theme } from '../../interfaces/Theme';

@Component({
    selector: 'uxd-theme-selector',
    templateUrl: './theme-selector.component.html',
    styleUrls: ['./theme-selector.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSelectorComponent implements OnInit {
    @Input()
    title: string;

    @Input()
    themes: ReadonlyArray<Theme> = [];

    dropdownOpen: boolean;
    selected: Theme;

    ngOnInit(): void {
        this.selected = this.themes[0];
    }
}
