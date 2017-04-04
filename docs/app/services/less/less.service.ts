import { Injectable } from '@angular/core';

// we need to setup some less settings
(<any>window).less = {
    env: 'production',
    logLevel: 0,
};

const less = require('less/dist/less.min');

@Injectable()
export class LessService {

    extractVariables(input: string, callback: (variables: any) => void) {

        let output = {};

        try {
            less.parse(input, (error: any, result: any) => {

                // handle any errors here
                if (error) {
                    console.log('Could not load variables.less - ' + error);
                    return;
                }

                // get the variables
                let variables = result.variables();

                // iterate each variable
                for (let variableName in variables) {

                    // get the properties of the variable
                    let variable = variables[variableName];

                    // extract the value - this will throw an error if it is a variable
                    let variableEval: any, variableValue: any;

                    try {
                        variableEval = variable.value.eval();

                        // calculate the variable value
                        variableValue = variableEval.type === 'Quoted' ? variableEval.value : variableEval.toCSS();

                        // store the variable and it's value
                        output[variableName] = variableValue;

                    } catch (err) {

                        // an error will occur when it references another variable
                        // but this is expected and we can handle it properly
                        let value = variable.value.value[0].value;

                        if (value.length > 1) {

                            let components = value.map((component: any) => {

                                // if its simply a variable reference then do not evaluate
                                if (component.name && component.type !== 'Call') {
                                    return component.name;
                                }

                                if (component.type === 'Call') {
                                    return component.toCSS();
                                }

                                // evaluated component
                                let evaluated = component.eval();

                                // otherwise return quoted value or evaluated css
                                return evaluated.type === 'Quoted' ? evaluated.value : evaluated.toCSS();
                            });

                            // join each component with a space
                            output[variableName] = components.join(' ');

                        } else {
                            // get the variable name
                            let varName = this.parseVariableTree(variable.value);

                            // store the value as the variable name
                            output[variableName] = varName;
                        }

                    }
                }

            });

        } catch (error) {
            console.log('An error occurred: ' + error);
        }

        callback.call(null, output);
    }

    parseVariableTree(tree: any) {

        // check if the current object has a name property
        if (tree.hasOwnProperty('name')) {

            if (tree.type === 'Call') {
                return tree.toCSS();
            }

            return tree.name;
        }

        for (var propName in tree) {

            if (tree.hasOwnProperty(propName)) {

                let subtree: any = this.parseVariableTree(tree[propName]);

                if (subtree !== null && subtree !== undefined) {
                    return subtree;
                }
            }
        }

        return null;
    }
}