!not-ready-for-release!

#### Version Number
${version-number}

#### New Features

#### Breaking Changes

* `bootstrap` is no longer a dependency of the published `@ux-aspects/ux-aspects` package. UX Aspects only consumes the Bootstrap 3 stylesheet (never its JavaScript), and applications already include that stylesheet explicitly. Applications that relied on Bootstrap being installed transitively via UX Aspects must now add `bootstrap` to their own `package.json`.

#### Known Issues
