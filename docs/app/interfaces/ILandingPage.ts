import { ILink } from './ILink';

export interface ILandingPage {
    brand: {
        title: string;
        slogan: string;
        action: ILink;
    };
    overview: {
        title: string;
        description: string;
        features: ILandingFeature[];
    };
    showcase: {
        title: string;
        description: string;
    };
    social: {
        title: string;
        description: string;
        links: [{
            title: string;
            description: string;
            link: ILink;
        }]
    };
}

export interface ILandingFeature {
    image: string;
    title: string;
    description: string;
}