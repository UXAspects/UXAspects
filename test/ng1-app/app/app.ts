declare var angular: ng.IAngularStatic;

// import required stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../src/styles/ux-aspects.less';

// import required scripts
import * as jQuery from 'jquery';
(<any>window).jQuery = jQuery;
(<any>window).$ = jQuery;

import 'jquery-ui/ui/unique-id';
import 'jquery-ui/ui/position';
import 'jquery-ui/ui/widgets/sortable';
import 'bootstrap';
import 'angular';
import '../../../src/ng1/ux-aspects-ng1.module';

// Import Controllers
import { MainController } from './controller';

angular.module('app', ['ux-aspects'])
    .controller('MainController', MainController);