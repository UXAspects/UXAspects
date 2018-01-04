export class Facet {
    
    constructor(
        public title: string,
        public data: any = {},
        public count?: number,
        public disabled: boolean = false,
        public id?: string | number
    ) { }
}