export interface ISection {
    id: string;
    title: string;
    component: string;
    codepen: boolean;
    version: 'AngularJS' | 'Angular';
    deprecated?: boolean;
    externalUrl?: string;
    usage: [{
        title: string;
        content: string;
    }];
}