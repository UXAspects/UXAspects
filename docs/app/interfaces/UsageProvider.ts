import { Usage } from './Usage';

export interface UsageProvider {
    usage: Usage;
}

export function isUsageProvider(obj: any) {
    return 'usage' in obj;
}