import { Observable } from 'rxjs/Observable';
import { TreeGridItem } from './tree-grid-item.interface';

export type TreeGridLoadFunction = (parent: TreeGridItem) => TreeGridItem[] | Promise<TreeGridItem[]> | Observable<TreeGridItem[]>;
