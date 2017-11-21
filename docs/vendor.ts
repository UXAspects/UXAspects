/*
  Import jQuery and expose to global scope
*/
import 'expose-loader?$!jquery';
import 'expose-loader?jQuery!jquery';

// import only the required jquery ui functionality
import 'jquery-ui/ui/unique-id';
import 'jquery-ui/ui/position';
import 'jquery-ui/ui/widgets/sortable';

import 'bootstrap';
import * as angular from 'angular';

/*
  Import Angular 1 Components and their dependencies
*/
import '../src/ng1/ux-aspects-ng1.module';


// create the AngularJS module
angular.module('app', ['ux-aspects']);
