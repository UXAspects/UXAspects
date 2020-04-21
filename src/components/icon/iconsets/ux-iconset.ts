import { commonIcons } from './common-icons';
import { SingleIconDefinition } from './iconset.interface';

/** We generate the iconset definition as hardcoding it increases bundle size by ~40kb per iconset */
export const uxIconset: ReadonlyArray<SingleIconDefinition> = [
    ...commonIcons.map<SingleIconDefinition>(uxIconMapper)
];

function uxIconMapper(icon: string): SingleIconDefinition {
    return { name: icon, iconset: 'ux-icon', icon: `ux-icon-${icon}` };
}
