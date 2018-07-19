import { FloatingActionButtonsService } from './floating-action-buttons.service';
export declare class FloatingActionButtonComponent {
    fab: FloatingActionButtonsService;
    icon: string;
    tabindex: number;
    primary: boolean;
    constructor(primary: string, fab: FloatingActionButtonsService);
}
