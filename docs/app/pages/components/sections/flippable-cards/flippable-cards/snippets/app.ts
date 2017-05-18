import { Component } from '@angular/core';
import { ColorService } from 'ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html',
    styleUrls: ['./src/app.component.css']
})
export class AppComponent {

    donut1 = [{
        label: 'documents',
        color: this.colorService.getColor('grey6').toHex(),
        value: 23456
    }, {
        label: 'reviewed',
        color: this.colorService.getColor('vibrant1').toHex(),
        value: 19876
    }, {
        label: 'produced',
        color: this.colorService.getColor('vibrant2').toHex(),
        value: 11123
    }];

    donut2 = [{
        label: 'documents',
        color: this.colorService.getColor('grey6').toHex(),
        value: 15678
    }, {
        label: 'reviewed',
        color: this.colorService.getColor('vibrant1').toHex(),
        value: 10123
    }, {
        label: 'produced',
        color: this.colorService.getColor('vibrant2').toHex(),
        value: 3123
    }];

    donut3 = [{
        label: 'documents',
        color: this.colorService.getColor('grey6').toHex(),
        value: 256987
    }, {
        label: 'reviewed',
        color: this.colorService.getColor('vibrant1').toHex(),
        value: 143567
    }, {
        label: 'produced',
        color: this.colorService.getColor('vibrant2').toHex(),
        value: 45678
    }];

    options = {
        size: 70,
        donutWidth: 3,
        donutSpacing: 3,
        hoverAnimation: true,
        centerLabel: {
            show: false
        },
        tooltip: {
            show: false
        }
    };

    constructor(public colorService: ColorService) { }

}