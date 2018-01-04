import * as angular from "angular";
import { fixedHeaderTableDirective } from "./fixed-header-table.directive";

angular.module('ux-aspects.fixed-header-table', [])
    .directive('fixedHeaderTable', fixedHeaderTableDirective);