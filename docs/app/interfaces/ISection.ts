export interface ISection {
    id: string;
    title: string;
    component: string;
    version: 'AngularJS' | 'Angular';
    hybrid?: boolean;
    deprecated?: boolean;
    deprecatedFor?: string;
    externalUrl?: string;
    schematic?: string;
    usage: [{
        title: string;
        content: string;
    }];
}