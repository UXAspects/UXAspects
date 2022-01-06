UX Aspects 5.0.0 is now available! Check out the documentation at [uxaspects.github.io/UXAspects](https://uxaspects.github.io/UXAspects).

#### Installation
```bash
npm install @ux-aspects/ux-aspects@5.0.0
```

#### New Features
* (EL-4288) Angular 13 Support.

#### Bug Fixes and Improvements
* (EL-4242) [Dashboard](https://uxaspects.github.io/UXAspects/#/components/dashboard#dashboard) -
Added section for accessibility in the documentation detailing keyboard navigation and other accessibility features.

#### Breaking Changes (from UX Aspects 4.x)
* Angular 10 and 11 is no longer supported
* Tree Grid no longer supports the `rows` input. Use `(rowChange)="rows = $event"` instead.

Any questions or feedback? Feel free to open an issue on [GitHub](https://github.com/UXAspects/UXAspects/issues)!