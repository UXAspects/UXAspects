@Component({
    providers: [
        {
            provide: ACCESSIBILITY_OPTIONS_TOKEN,
            useValue: { programmaticFocusIndicator: true }
        }
    ]
})
export class CustomComponent { }