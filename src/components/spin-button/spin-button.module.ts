import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinButtonComponent } from './spin-button.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [SpinButtonComponent],
    declarations: [SpinButtonComponent]
})
export class SpinButtonModule { }