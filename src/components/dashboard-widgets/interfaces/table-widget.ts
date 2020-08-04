import { PredefinedWidgetConfig } from './predefined-widget';

export interface TableWidgetConfig extends PredefinedWidgetConfig {
    header: ReadonlyArray<any>;
    data: ReadonlyArray<ReadonlyArray<any>>;
}
