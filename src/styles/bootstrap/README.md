# Vendored Bootstrap 3.4.1 stylesheet

This directory contains the Less source of the **Bootstrap v3.4.1 stylesheet**, vendored from
the [`bootstrap@3.4.1`](https://www.npmjs.com/package/bootstrap/v/3.4.1) npm package. Together
with the glyphicon fonts in `../fonts/`, it is compiled into the published
`ux-aspects-bootstrap` stylesheet — a drop-in replacement for `bootstrap.css`.

## Scope

**Included:** the Less modules, mixins and variables that make up the complete Bootstrap 3.4.1
stylesheet, and the five `glyphicons-halflings-regular` font files.

**Not included:** any Bootstrap JavaScript. No file from Bootstrap's `js/` directory (or
`dist/js/`) is present in this repository or in the published package. UX Aspects has never
loaded Bootstrap's JavaScript; interactive behaviour comes from its Angular components.

Every `.less` file in this directory is byte-identical to the corresponding file in the
upstream `bootstrap@3.4.1` package (`less/` directory). Do not edit these files — prettier and
stylelint are configured to ignore this directory so that the files remain verbatim copies.
The only exceptions are this README, the `LICENSE` file, and the aggregator
`../ux-aspects-bootstrap.less`, which replaces upstream `bootstrap.less`/`mixins.less` with the
same imports in the same order.

## Security scanner findings (CVE disposition)

Component scanners will correctly identify this directory as Bootstrap 3.4.1 and may associate
its known CVEs. None apply to what is distributed here:

- **[CVE-2024-6485](https://nvd.nist.gov/vuln/detail/CVE-2024-6485)** (XSS in the button
  plugin's `data-loading-text`): the vulnerable code is `button.js`, which is **not
  distributed** — this directory contains no JavaScript. VEX status:
  `vulnerable_code_not_present`.
- **[CVE-2024-6484](https://github.com/twbs/bootstrap-sass/issues/1251)** (carousel XSS): the
  advisory was **withdrawn** upstream after being determined not to be a vulnerability in
  Bootstrap. It also concerned JavaScript, which is not distributed.
- All earlier Bootstrap 3 CVEs (CVE-2018-14040/14041/14042, CVE-2019-8331) were **fixed in
  3.4.1**, the exact version vendored here.

## License

Bootstrap is Copyright (c) 2011-2019 Twitter, Inc. and licensed under the
[MIT License](https://github.com/twbs/bootstrap/blob/v3.4.1/LICENSE) — see [`LICENSE`](LICENSE)
in this directory. The license is shipped in the published package as `LICENSE-bootstrap`, and
a license banner is prepended to the compiled `ux-aspects-bootstrap` CSS.

## Updating

To verify or refresh the vendored copy, download the pristine package and diff:

```sh
npm pack bootstrap@3.4.1 && tar -xzf bootstrap-3.4.1.tgz
diff -r package/less <this directory>   # only bootstrap.less, mixins.less, theme.less, README.md and LICENSE differ
```
