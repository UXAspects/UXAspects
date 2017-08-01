import { Component } from '@angular/core';
import { LessService } from '../../services/less/less.service';
import { ICustomisePage, ICustomisePageSection, ICustomisePageVariable } from '../../interfaces/ICustomisePage';

@Component({
    selector: 'uxd-customize',
    templateUrl: './customize.component.html'
})
export class CustomizePageComponent {

    sections: ICustomisePageSection[];
    variables: any;

    constructor(private lessService: LessService) {

        // import the less variables file
        let lessInput: string = require('!raw-loader!../../../../src/styles/variables.less');

        // load the variables to show
        let data: ICustomisePage = require('../../data/customize-page.json');

        // store data on each section
        this.sections = data.sections;

        // extract less variable values from theme
        lessService.extractVariables(lessInput, (variables: any) => {

            this.variables = variables;

            // insert values to model
            this.sections.forEach(section => {
                section.variables.forEach(variable => variable.value = variables[variable.name]);
            });
        });

    }

    getVariableColor(variable: ICustomisePageVariable) {
        if (variable.value && this.variables.hasOwnProperty(variable.value.trim())) {
            return this.variables[variable.value.trim()];
        }

        return variable.value;
    }

    trackBySection(index: number, section: ICustomisePageSection) {
        return index;
    }

    trackByVariable(index: number, variable: ICustomisePageVariable) {
        return index;
    }

}