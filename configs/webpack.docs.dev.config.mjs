import { generateAngularWebpackConfig } from './utils/generate-angular-webpack-config.mjs';
import { developmentConfiguration } from './documentation.mjs';
import { join } from 'path';
import { cwd } from 'process';
import { getDocumentationConfig } from './utils/documentation-webpack-partial.mjs';

export default await generateAngularWebpackConfig(
    'ux-aspects',
    join(cwd(), 'docs'),
    join(cwd(), 'docs', 'app'),
    developmentConfiguration,
    [getDocumentationConfig()]
);
