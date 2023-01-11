import { InjectionToken } from '@angular/core';
import { BaseResizableTableService } from './resizable-table-base.service';

export const RESIZABLE_TABLE_SERVICE_TOKEN = new InjectionToken<BaseResizableTableService>('RESIZABLE_TABLE_SERVICE_TOKEN');
