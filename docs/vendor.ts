/*
  Import jQuery and expose to global scope
*/
import * as $ from 'jquery';
(<any>window).$ = $;
(<any>window).jQuery = $;

import 'jquery-ui-dist/jquery-ui';

import 'bootstrap';

/*
  Import Angular 1 Components and their dependencies
*/
import 'angular';

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
