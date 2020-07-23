import {PredefinedWidgetConfig} from './predefined-widget';

export interface DataWidgetConfig extends PredefinedWidgetConfig {
    header: ReadonlyArray<any>;
    data: ReadonlyArray<ReadonlyArray<any>>;
}
