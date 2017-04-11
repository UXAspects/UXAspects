import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import { DOCUMENT } from '@angular/platform-browser';

import { AppConfiguration } from '../app-configuration/app-configuration.service';
import { ICodePen } from '../../interfaces/ICodePen';

@Injectable()
export class CodePenService {

    private codepenAssetsBaseUrl = this.appConfig.get('assetsUrl');
    private codePenUrl = this.appConfig.get('codePen');

    constructor( @Inject(DOCUMENT) private document: Document,
        private appConfig: AppConfiguration,
        private http: Http) { }

    public launch(title: string, codepen: ICodePen) {

        this.loadForm(codepen).then(codepen => {

            const form = this.initForm(title, codepen);

            this.document.body.appendChild(form);

            form.submit();

            this.document.body.removeChild(form);
        });

    }

    private loadForm(codepen: ICodePen): Promise<ICodePen> {

        // load any files if 'lazy' is set to true
        return new Promise<ICodePen>((resolve, reject) => {

            // if not lazy then resolve immediately
            if (!codepen.lazy) {
                resolve(codepen);
            }
            debugger;
            this.loadHtml(codepen);
        });
    }

    private loadHtml(codepen: ICodePen): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.http.get(codepen.html).subscribe(response => {
                debugger;
            });
        });
    }

    private initForm(title: string, codepen: ICodePen): HTMLFormElement {

        // Set up the contents of each of the three editors
        const html = this.formatHtml(codepen);
        const css = this.formatCss(codepen);
        const code = this.formatCode(codepen);

        // determine which editors to show
        const editors = (html ? '1' : '0') + (css ? '1' : '0') + (codepen.js ? '1' : '0');

        // options for codepen
        const options = {
            title: title,
            description: 'UX Aspects Example',
            editors: editors,
            html: html,
            css: css,
            js: code,
            js_pre_processor: 'none',
            head: `<meta name="viewport" content="width=device-width, initial-scale=1">`,
            css_external: this.CODEPEN_STYLESHEETS.join(';'),
            js_external: this.CODEPEN_SCRIPTS.join(';')
        };

        const optionsString = JSON.stringify(options).replace(/"/g, '&​quot;').replace(/'/g, '&apos;');

        // create form object
        const form = document.createElement('form');

        // set form attributes
        form.action = this.codePenUrl;
        form.method = 'POST';
        form.target = '_blank';

        // create invisible form elements
        const formData = document.createElement('input');

        // set form data attributes
        formData.name = 'data';
        formData.type = 'hidden';
        formData.value = optionsString;

        // nest elements
        form.appendChild(formData);

        return form;
    }

    private formatHtml(codepen: ICodePen): string {

        // Copy the original attributes in order to modify with the id (for CSS purposes)
        const htmlAttributes = Object.assign({}, codepen.htmlAttributes);
        htmlAttributes.id = htmlAttributes.id || 'ux-codepen-container';

        // Wrap the main HTML fragment in a div with specified attributes
        let result = this.wrapHtml(codepen.html, null, htmlAttributes);
        if (codepen.htmlTemplates) {

            // Append each template provided inside <script> or <template> tags
            codepen.htmlTemplates.forEach((htmlTemplate) => {
                result += '\n\n' + this.wrapHtml(htmlTemplate.content, htmlTemplate.id, htmlTemplate.attributes);
            });
        }

        return result;
    }

    private wrapHtml(content: string, templateId: string, attributes: any): string {

        let result = content;

        // If the directive specified attributes here then add them to the wrapper div
        // Main use case is ng-controller
        if (attributes) {
            result = `<div${this.formatAttributes(attributes)}>\n${result}\n</div>`;
        }

        // If a templateId is specified then wrap it in version specific HTML with given ID
        if (templateId) {
            result = `<script type="text/ng-template" id="${templateId}">\n${result}\n</script>`;
        }

        return result;
    }

    private formatAttributes(attributes: any): string {

        let result = '';

        // Build a string as key="value" from the attributes object
        for (let key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                result += ` ${key}="${attributes[key]}"`;
            }
        }

        return result;
    }

    private formatCss(codepen: ICodePen): string {

        let result = '';

        if (codepen.css) {
            // Simply append the CSS fragments to each other
            codepen.css.forEach((cssString) => {
                result += cssString + '\n\n';
            });
        }
        return result;
    }

    private formatCode(codepen: ICodePen): string {

        // Set up with angular.module(...)
        let result = this.CODEPEN_BOILERPLATE.prefix + '\n\n';

        // Append the code fragments with trailing semicolon in case it was missed
        if (codepen.js) {
            codepen.js.forEach((codeString) => {
                result += codeString + ';\n\n';
            });
        }

        // Append angular.bootstrap(...)
        result += this.CODEPEN_BOILERPLATE.suffix;

        return result;
    }

    // Stylesheets for CodePen to reference
    private CODEPEN_STYLESHEETS = [
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css',
        this.codepenAssetsBaseUrl + '/css/ux-aspects.css'
    ];

    // Script files for CodePen to reference
    private CODEPEN_SCRIPTS = [
        'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js',
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/chance/0.8.0/chance.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.6/angular.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.13.0/ui-bootstrap-tpls.js',
        this.codepenAssetsBaseUrl + '/ng1/ux-aspects-ng1.js'
    ];

    // Prefix and suffix for the provided code
    private CODEPEN_BOILERPLATE = {
        prefix: `angular.module('app', ['ux-aspects']);`,
        suffix: `angular.bootstrap(document, ['app']);`
    };
}
