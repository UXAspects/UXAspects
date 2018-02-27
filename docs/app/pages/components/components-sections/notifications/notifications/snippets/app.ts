import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {

}

interface NotificationRef {
    templateRef: TemplateRef<any>;
    duration: number;
    date: Date;
    visible?: boolean;
    height?: number;
    spacing?: number;
}

interface NotificationOptions {
    duration?: number;
    height?: number;
    spacing?: number;
}