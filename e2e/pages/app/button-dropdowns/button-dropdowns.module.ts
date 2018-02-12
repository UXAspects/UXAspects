import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';

import { ButtonDropdownsTestPageComponent } from './button-dropdowns.testpage.component';

@NgModule({
    imports: [
        BsDropdownModule.forRoot(),
        RouterModule.forChild([
            {
                path: '',
                component: ButtonDropdownsTestPageComponent
            }
        ])
    ],
    declarations: [ButtonDropdownsTestPageComponent]
})
export class ButtonDropdownsTestPageModule { }
