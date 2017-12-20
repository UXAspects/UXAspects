# Optimizing Angular Applications

One thing you may notice when developing an Angular application is that there are often many dependencies which can result in rather large output files or slow loading times.

Below are a few different optimization techniques to improve page load times and reduce build output size.

### Inline Resources

When it comes to Angular components we can improve loading times by reducing the number of requests required to load a component's resources.

A component will often follow a pattern like this:

```typescript
@Component({
	selector: 'my-component',
    templateUrl: './my-component.component.html',    
    styleUrls: ['./my-component.component.css']
})
export class MyComponent {}
```

In this example Angular is required to load an HTML file and a CSS file before the component can be rendered. This is a slow operation and can easily be improved. One way of improving this could be to inline the template and styles:

```typescript
@Component({
	selector: 'my-component',
    template: `
        <div class="container">
			<h1 class="heading">My Component</h1>
        </div>`,    
    styles: [`
    	.container {
        	background-color: red;
            width: 500px;
        }
        
        .heading {
        	font-size: 2rem;
        }
    `]
})
export class MyComponent {}
```

However this generally results in long Typescript files and no distinct separation of concerns. 

The alternate way is to use a tool like Webpack which can automatically inline resources for us at build time. We can use the `templateUrl` and `styleUrls` properties to specify the relative path and use several loaders in our Webpack configuration similar to the following:

```javascript
rules: [{
    test: /\.ts$/,
    loaders: ['awesome-typescript-loader', 'angular2-template-loader']
}, {
    test: /\.html$/,
    loader: 'html-loader'
}, {
    test: /\.css/,
    loader: 'raw-loader'
}
```

There are some useful plugins for Gulp and Grunt such as `inlineNg2Template` and `gulp-inline-css` that can be used.

### Tree Shaking

Using a bundler tool like Webpack or Rollup will give you the benefit of Tree Shaking, which is the process of determining which modules your application actually uses, and which it doesn't, and discarding those which are never used to reduce the bundle size. Traditionally scripts would have simply been concatenated often resulting in lots of unused code, whereas with modules and bundlers only required code will be bundled.

### AOT

When an Angular app is run all the components' templates are parsed, and their styles processed to simulate encapsulation before anything can be rendered. This process takes time but also requires the Angular compiler to be bundled as part of your application to allow this to take place.

To improve upon this there is an option to run the ahead of time compiler on your application which does all the template parsing beforehand and outputs files that remove the initial compilation step. This also negates the need to include the compiler code in your application reducing the size of your application.

To use the ahead of time compiler with Webpack we can do the following:

Run the command below in the command prompt:

```
npm install --save-dev @ngtools/webpack @angular/compiler-cli @angular/platform-server
```

Create a second Typescript configuration file `tsconfig-aot.json` which should contain a configuration similar to the following:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "es2015",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": ["es2015", "dom"],
    "noImplicitAny": true,
    "declaration": false,
    "suppressImplicitAnyIndexErrors": true,
    "removeComments": true
  },
  "angularCompilerOptions": {
    "debug": false,
    "skipMetadataEmit": true
  },
  "exclude": [
    "node_modules"
  ]
}
```

We can then include the AOT plugin in our Webpack configuration and use it instead of the `awesome-typescript-loader` and `angular2-template-loader`. Below is an example of how the config file might look:

```javascript
var path = require('path');
var webpack = require('webpack');
var AotPlugin = require('@ngtools/webpack').AotPlugin;

module.exports = {

    entry: path.join(__dirname, 'docs', 'main.ts'),

    output: {
        path: path.join(__dirname, 'dist', 'docs'),
        filename: 'docs.js'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [{
                test: /\.scss$/,
                loaders: ['raw-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.ts$/,
                loader: '@ngtools/webpack'
            }
        ]
    },

    plugins: [
        new AotPlugin({
            tsConfigPath: './tsconfig-aot.json',
            mainPath: './docs/main.ts'
        }),

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.join(__dirname, 'docs'), {}
        ),
        
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ]
};
```

This will run the TypeScript files through the AOT compiler and should reduce the file size and page load time. Notice we have also added in an `UglifyJSPlugin` which will minify the code as well.

For a quick comparison of page load times:

**JIT Compiler - No Minification**: 2294ms

**AOT Compiler - With Minification**: 753ms


### Server Side Rendering

An additional option is to take advantage of server side rendering. Traditionally static apps were often rendered on the server side and sent to the client, however any time the user wanted to view different data the page had to be reloaded. Then came along AJAX, which allow Javascript to make calls for data after the page had loaded, and while this was an improvement this often resulted in loading spinners appearing everywhere.

With Angular's server side rendering capabilities we get the best of both worlds. When a user goes to your website, Angular runs on the server and populates the page with the initial data, so when it is displayed in the web browser all the data is present, no need for loading spinners. At this point Angular bootstraps itself to the website and any further data requests are loaded in asynchronously and do not require the page to reload, resulting in both very quick initial page loads and a dynamic single page application.

A complete guide can be [found here](https://universal.angular.io/quickstart/)
