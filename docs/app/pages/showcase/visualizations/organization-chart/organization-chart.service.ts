import { Injectable } from '@angular/core';
import { OrganizationChartNode } from '@ux-aspects/ux-aspects';

@Injectable({
    providedIn: 'root'
})
export class OrganizationChartDataService {

    private _uniqueId: number = 0;

    private _dataset: OrganizationChartNode<OrganizationChartContext> = {
        id: this._uniqueId++,
        expanded: true,
        data: {
            name: 'Daniel Smith',
            role: 'CEO',
            email: 'ceo@company.com',
        },
        children: [
            {
                id: this._uniqueId++,
                expanded: true,
                data: {
                    name: 'Jacob Castro',
                    role: 'National Manager',
                    email: 'nat_manager@company.com'
                },
                children: [
                    {
                        id: this._uniqueId++,
                        expanded: true,
                        data: {
                            name: 'Pauline Norman',
                            role: 'Regional Manager',
                            email: 'reg_manager@company.com'
                        },
                        children: [
                            {
                                id: this._uniqueId++,
                                data: {
                                    name: 'Richard Jenson',
                                    role: 'Sales Manager',
                                    email: 'sales_manager@company.com'
                                },
                                children: [
                                    {
                                        id: this._uniqueId++,
                                        data: {
                                            name: 'Trevor Bolton',
                                            role: 'Team Leader',
                                            email: 'team_leader@company.com'
                                        },
                                        children: [
                                            {
                                                id: this._uniqueId++,
                                                data: {
                                                    name: 'Helen Barry',
                                                    role: 'Sales',
                                                    email: 'sales@company.com'
                                                },
                                                children: [
                                                    {
                                                        id: this._uniqueId++,
                                                        data: {
                                                            name: 'Katharine May',
                                                            role: 'Junior Sales',
                                                            email: 'junior_sales@company.com'
                                                        }
                                                    },
                                                    {
                                                        id: this._uniqueId++,
                                                        data: {
                                                            name: 'Tony Oliver',
                                                            role: 'Junior Sales',
                                                            email: 'junior_sales@company.com'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                id: this._uniqueId++,
                                                data: {
                                                    name: 'Andrew Barnes',
                                                    role: 'Sales',
                                                    email: 'sales2@company.com'
                                                }
                                            },
                                            {
                                                id: this._uniqueId++,
                                                data: {
                                                    name: 'Richard Abrey',
                                                    role: 'Sales',
                                                    email: 'sales3@company.com'
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        id: this._uniqueId++,
                                        data: {
                                            name: 'Amelia Harcourt',
                                            role: 'Account Executive',
                                            email: 'account_exec@company.com'
                                        },
                                        children: [
                                            {
                                                id: this._uniqueId++,
                                                data: {
                                                    name: 'Isaac Goodman',
                                                    role: 'Accountant',
                                                    email: 'accountant@company.com'
                                                }
                                            },
                                            {
                                                id: this._uniqueId++,
                                                data: {
                                                    name: 'Dora Brady',
                                                    role: 'Accountant',
                                                    email: 'accountant2@company.com'
                                                }
                                            },
                                            {
                                                id: this._uniqueId++,
                                                data: {
                                                    name: 'Jerry Horton',
                                                    role: 'Accountant',
                                                    email: 'accountant3@company.com'
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        id: this._uniqueId++,
                                        data: {
                                            name: 'Denise Phillips',
                                            role: 'Assistant',
                                            email: 'assistant@company.com'
                                        }
                                    }
                                ]
                            },
                            {
                                id: this._uniqueId++,
                                data: {
                                    name: 'Sue Aguilar',
                                    role: 'Marketing Manager',
                                    email: 'marketing_manager@company.com',
                                    marker: true
                                },
                                children: [
                                    {
                                        id: this._uniqueId++,
                                        data: {
                                            name: 'Zachary McCoy',
                                            role: 'Marketing',
                                            email: 'marketing@company.com'
                                        }
                                    },
                                    {
                                        id: this._uniqueId++,
                                        data: {
                                            name: 'William Dean',
                                            role: 'Marketing',
                                            email: 'marketing2@company.com'
                                        },
                                        children: [
                                            {
                                                id: this._uniqueId++,
                                                data: {
                                                    name: 'Ollie Sharp',
                                                    role: 'Junior Marketing',
                                                    email: 'junior_marketing@company.com'
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        id: this._uniqueId++,
                                        data: {
                                            name: 'Georgie King',
                                            role: 'Marketing',
                                            email: 'marketing3@company.com'
                                        }
                                    },
                                ]
                            },
                            {
                                id: this._uniqueId++,
                                data: {
                                    name: 'Jesse Peters',
                                    role: 'Head of Accounting',
                                    email: 'head_accounting@company.com'
                                },
                                children: [
                                    {
                                        id: this._uniqueId++,
                                        data: {
                                            name: 'Myra Lowe',
                                            role: 'Accounting',
                                            email: 'accounting@company.com'
                                        },
                                        children: [
                                            {
                                                id: this._uniqueId++,
                                                data: {
                                                    name: 'Allen Patton',
                                                    role: 'Junior Accounting',
                                                    email: 'junior_accounting@company.com'
                                                }
                                            },
                                            {
                                                id: this._uniqueId++,
                                                data: {
                                                    name: 'Katie Crawford',
                                                    role: 'Junior Accounting',
                                                    email: 'junior_accounting2@company.com'
                                                }
                                            },
                                            {
                                                id: this._uniqueId++,
                                                data: {
                                                    name: 'Glenn Adkins',
                                                    role: 'Junior Accounting',
                                                    email: 'junior_accounting3@company.com'
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        id: this._uniqueId++,
                                        data: {
                                            name: 'Chester Marsh',
                                            role: 'Accounting',
                                            email: 'accounting2@company.com'
                                        }
                                    },
                                    {
                                        id: this._uniqueId++,
                                        data: {
                                            name: 'Cordelia Powers',
                                            role: 'Accounting',
                                            email: 'accounting3@company.com'
                                        }
                                    },
                                    {
                                        id: this._uniqueId++,
                                        data: {
                                            name: 'Lenora Reynolds',
                                            role: 'Accounting',
                                            email: 'accounting4@company.com'
                                        }
                                    },
                                    {
                                        id: this._uniqueId++,
                                        data: {
                                            name: 'Winifred Huff',
                                            role: 'Accounting',
                                            email: 'accounting5@company.com'
                                        }
                                    },
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

    getDataset(): OrganizationChartNode<OrganizationChartContext> {
        return this._dataset;
    }
}

export interface OrganizationChartContext {
    name: string;
    role: string;
    email: string;
    marker?: boolean;
}