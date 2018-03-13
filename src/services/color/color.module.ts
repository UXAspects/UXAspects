import { NgModule } from '@angular/core';
import { ThemeModule } from '../theme/theme.module';
import { ColorService } from './color.service';

@NgModule({
    imports: [ThemeModule],
    providers: [ColorService],
})
export class ColorServiceModule { }
