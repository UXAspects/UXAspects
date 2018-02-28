import { Component } from '@angular/core';
import { ColorService, NotificationService } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    duration: number = 4000;    
    backgroundColor: string = this.colorService.getColor('accent').toHex();

    notificationColors = {
        primary: this.colorService.getColor('primary').toHex(),
        accent: this.colorService.getColor('accent').toHex(),
        chart4: this.colorService.getColor('chart4').toHex(),
        chart5: this.colorService.getColor('chart5').toHex(),
        ok: this.colorService.getColor('ok').toHex(),
        warning: this.colorService.getColor('warning').toHex(),
        critical: this.colorService.getColor('critical').toHex()
    };
    
    setColor (color: string): void {
        this.backgroundColor = this.notificationColors[color];
    }

    constructor(public notificationService: NotificationService,
        public colorService: ColorService) {
    }
}