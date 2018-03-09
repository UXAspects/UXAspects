export interface ICustomisePage {
    sections: ICustomisePageSection[];
}

export interface ICustomisePageSection {
    name: string;
    description: string;
    variables: ICustomisePageVariable[];
}

export interface ICustomisePageVariable { 
    name: string;
    value?: string;
}