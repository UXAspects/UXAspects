!not-ready-for-release!

#### Version Number
${version-number}

#### New Features

* UX Aspects now bundles the complete Bootstrap 3.4.1 stylesheet as a new `ux-aspects-bootstrap` stylesheet, shipped in the `@ux-aspects/ux-aspects` package as `styles/ux-aspects-bootstrap.css` (with `.min.css` and `.less` variants), with the glyphicon fonts included in the package `fonts/` directory. The `bootstrap` npm package is no longer a dependency.

#### Breaking Changes

* The `bootstrap` package is no longer a dependency of `@ux-aspects/ux-aspects`. Replace any Bootstrap 3 stylesheet include (e.g. `bootstrap/dist/css/bootstrap.min.css` or `~bootstrap/less/bootstrap.less`) with `@ux-aspects/ux-aspects/styles/ux-aspects-bootstrap.css`, imported before `ux-aspects.css`. The new stylesheet is a complete drop-in replacement for the Bootstrap 3 stylesheet, vendored from Bootstrap 3.4.1, so any Bootstrap 3 class can still be used in application markup; only Bootstrap's JavaScript is not included (UX Aspects never used it — interactive behaviour comes from the Angular components). See BREAKING_CHANGES.md for details.

#### Known Issues
