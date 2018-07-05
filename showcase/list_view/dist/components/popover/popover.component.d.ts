import { Subject } from 'rxjs/Subject';
import { TooltipComponent } from '../tooltip/index';
export declare class PopoverComponent extends TooltipComponent {
    /** Define a unique id for each popover */
    id: string;
    /** If specified allows the popover to show a title */
    title: string;
    /** This will emit an event any time the user clicks outside the popover */
    clickOutside$: Subject<MouseEvent>;
    /** This will update the title of the popover and trigger change detection */
    setTitle(title: string): void;
}
