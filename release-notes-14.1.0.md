#### Version Number
${version-number}

#### New Features
- Resolved two critical Angular 22 compatibility issues in UX Aspects 14.0.0 by ensuring TypeScript declaration files are correctly included in the published npm package and replacing deprecated ComponentFactoryResolver usage with the Angular 22-compatible ViewContainerRef.createComponent() API. Added automated release validation scripts to verify packaged artifacts, confirm declaration files are shipped, and detect Angular API incompatibilities before publication.

#### Known Issues
