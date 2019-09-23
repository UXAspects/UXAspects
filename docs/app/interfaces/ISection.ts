export interface ISection {
    id: string;
    title: string;
    component: string;
    version: 'AngularJS' | 'Angular';
    hybrid?: boolean;
    deprecated?: boolean;
    deprecatedFor?: string;
    externalUrl?: string;
    usage: [{
        title: string;
        content: string;
    }];
}