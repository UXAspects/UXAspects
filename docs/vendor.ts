/*
  Import jQuery and expose to global scope
*/
import * as $ from 'jquery';
(<any>window).$ = $;
(<any>window).jQuery = $;

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
import '../src/ng1/ux-aspects-ng1.module';

/*
    Import Angular Libraries
*/
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
import '@angular/upgrade';


import 'angular-ui-bootstrap';
