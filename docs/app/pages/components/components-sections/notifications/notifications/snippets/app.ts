import { Component } from '@angular/core';
import { ColorService, NotificationService } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    
    duration: number = 4;
    description: string = 'You have 16 messages';    
    backgroundColor: string = this.colorService.getColor('accent').toHex();

    colors = [
        this.colorService.getColor('primary').toHex(),
        this.colorService.getColor('accent').toHex(),
        this.colorService.getColor('chart4').toHex(),
        this.colorService.getColor('chart5').toHex(),
        this.colorService.getColor('ok').toHex(),
        this.colorService.getColor('warning').toHex(),
        this.colorService.getColor('critical').toHex()
    ];
    
    setColor (color: string): void {
        this.backgroundColor = this.colors[color];
    }

    constructor(public notificationService: NotificationService,
        public colorService: ColorService) {
    }
}