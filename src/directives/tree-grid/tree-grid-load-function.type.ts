import { Observable } from 'rxjs';
import { TreeGridItem } from './tree-grid-item.interface';

export type TreeGridLoadFunction = (parent: TreeGridItem) => TreeGridItem[] | Promise<TreeGridItem[]> | Observable<TreeGridItem[]>;
