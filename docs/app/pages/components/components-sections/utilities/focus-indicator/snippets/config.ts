@NgModule({
    AccessibilityModule.forRoot({
        mouseFocusIndicator: true,
        touchFocusIndicator: true,
        keyboardFocusIndicator: true,
        programmaticFocusIndicator: true,
    })
})
export class AppModule { }