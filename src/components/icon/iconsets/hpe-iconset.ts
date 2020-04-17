import { commonIcons } from './common-icons';
import { SingleIconDefinition } from './iconset.interface';

/** We generate the iconset definition as hardcoding it increases bundle size by ~40kb per iconset */
export const hpeIconset: ReadonlyArray<SingleIconDefinition> = [
    ...commonIcons.map<SingleIconDefinition>(hpeIconMapper)
];

function hpeIconMapper(icon: string): SingleIconDefinition {
    return { name: icon, iconset: 'hpe-icon', icon: `hpe-${icon}` };
}
