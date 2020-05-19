import { ICodePen } from '../../../interfaces/ICodePen';
import { IPlayground } from '../../../interfaces/IPlayground';

/**
 * Converting a legacy codepen to our new playground pattern
 */
export function playgroundAdapter(codepen: ICodePen): IPlayground {
    // create a list of files
    const files: { [file: string]: string } = {};

    // add the files
    files['app.html'] = getHtmlContent(codepen);

    files['app.css'] = getCssContent(codepen);

    if (codepen.js) {
        files['app.js'] = Array.isArray(codepen.js) ? codepen.js.join('\n\n') : codepen.js;
    }

    return { framework: 'angularjs', files };
}

function getHtmlContent(codepen: ICodePen): string {
    let html = codepen.html;

    // if there are htmlAttribute specified create a wrapper div
    if (codepen.htmlAttributes) {
        const wrapper = document.createElement('div');

        for (const attr in codepen.htmlAttributes) {
            wrapper.setAttribute(attr, codepen.htmlAttributes[attr]);
        }

        // place the original content as a child of the wrapper
        wrapper.innerHTML = `\n${html}\n`;

        // replace the string with the new content
        html = wrapper.outerHTML;
    }

    if (codepen.htmlTemplates) {
        for (const template of codepen.htmlTemplates) {
            const ngTemplate = document.createElement('script');
            ngTemplate.type = 'text/ng-template';
            ngTemplate.id = template.id;
            ngTemplate.innerHTML = template.content;
            html += `\n\n${ngTemplate.outerHTML}`;
        }
    }

    return html;
}

function getCssContent(codepen: ICodePen): string {
    if (!codepen.css) {
        return '\n';
    }

    return Array.isArray(codepen.css) ? codepen.css.join('\n\n') : codepen.css;
}
