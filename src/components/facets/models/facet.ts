export class Facet {

    constructor(
        public title: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        public data: any = {},
        public count?: number,
        public disabled: boolean = false,
        public id?: string | number
    ) { }
}