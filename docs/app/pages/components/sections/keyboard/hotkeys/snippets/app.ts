import { Component, Inject, ElementRef } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html',
    styleUrls: ['./src/app.component.less'],
    host: {
        '(window:keydown.q)': 'focusNextQ()',
        '(window:keydown.w)': 'focusNextW()'
    }
})
export class AppComponent {

    qText: string = 'None';
    wText: string = 'None';
    qFocused: number = null;
    wFocused: number = null;

    focusNextQ() {
        this.qFocused = this.qFocused === null || this.qFocused === 3 ? 0 : this.qFocused + 1;
    }

    focusNextW() {
        this.wFocused = this.wFocused === null || this.wFocused === 3 ? 0 : this.wFocused + 1;
    }

}