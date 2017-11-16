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

/*
  Import Angular 1 Components and their dependencies
*/
import 'angular';

/*
  Import Angular 1 Components and their dependencies
*/
import '../../dist/ng1/ux-aspects-ng1';

/*
    Import Angular Libraries
*/
import '@angular/platform-browser';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
import '@angular/upgrade';

import * as angular from 'angular';

// create the AngularJS module
angular.module('app', ['ux-aspects']);
