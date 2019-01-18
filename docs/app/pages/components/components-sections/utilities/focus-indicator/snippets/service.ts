@Component({
    selector: 'app-button',
    templateUrl: 'button.component.html'
})
export class ButtonComponent implements OnDestroy {

    private _focusIndicator: FocusIndicator;

    constructor(focusIndicatorService: FocusIndicatorService, elementRef: ElementRef) {
        // begin controlling focus indicator with defined options
        this._focusIndicator = focusIndicatorService.monitor(elementRef.nativeElement, {
            mouseFocusIndicator: true,
            touchFocusIndicator: true,
            keyboardFocusIndicator: true,
            programmaticFocusIndicator: true
        });
    }

    ngOnDestroy(): void {
        // stop monitoring focus when component is destroyed
        this._focusIndicator.destroy();
    }

}