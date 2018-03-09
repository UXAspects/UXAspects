import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    // ux-select configuration properties
    options: string[] | Function;
    display: string = null;
    key: string = null;
    selected: string | string[];
    multiple = new BehaviorSubject<boolean>(false);
    allowNull = false;
    disabled = false;
    dropDirection = 'down';
    dropdownOpen: boolean;
    maxHeight: string = '250px';
    placeholder = 'Select a country';

    private _pageSize = 20;
    get pageSize() {
        return this._pageSize;
    }
    set pageSize(value: number) {
        const numValue = Number(value);
        this._pageSize = (numValue >= 1) ? numValue : 1;
    }

    // Customize settings
    pagingEnabled = new BehaviorSubject<boolean>(false);
    dataSet = new BehaviorSubject<string>('strings');
    loadOptionsCallback = this.loadOptions.bind(this);

    dataSets: { strings?: any[], objects?: any[] } = {};
 
    constructor() {

        // Reset select when "multiple" checkbox changes.
        this.multiple.subscribe((value) => {
            
            this.selected = null;
            this.dropdownOpen = false;
        });

        // Reset and switch options between array and function when paging checkbox changes.
        this.pagingEnabled.subscribe((value) => {
            this.selected = null;
            this.dropdownOpen = false;
            this.options = this.pagingEnabled.getValue() ? this.loadOptionsCallback : this.selectedDataSet();
        });

        // Reset and reassign options when the dataset changes. Also set display and key properties.
        this.dataSet.subscribe((value) => {

            if (this.multiple.getValue() === true) {
                this.pagingEnabled.next(false);
            } 

            this.selected = null;
            this.dropdownOpen = false;
            this.options = this.pagingEnabled.getValue() ? this.loadOptionsCallback : this.selectedDataSet();
            this.display = (value === 'objects') ? 'name' : null;
            this.key = (value === 'objects') ? 'id' : null;
        });

        // "strings" data set
        this.dataSets.strings = ['United States', 'United Kingdom', 'Afghanistan', 'Aland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia, Plurinational State of', 'Bonaire, Sint Eustatius and Saba', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, The Democratic Republic of The', 'Cook Islands', 'Costa Rica', 'Cote D\'ivoire', 'Croatia', 'Cuba', 'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-bissau', 'Guyana', 'Haiti', 'Heard Island and Mcdonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran, Islamic Republic of', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, Democratic People\'s Republic of', 'Korea, Republic of', 'Kuwait', 'Kyrgyzstan', 'Lao People\'s Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia, The Former Yugoslav Republic of', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territory, Occupied', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Barthelemy', 'Saint Helena, Ascension and Tristan da Cunha', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin (French part)', 'Saint Pierre and Miquelon', 'Saint Vincent and The Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten (Dutch part)', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and The South Sandwich Islands', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan, Province of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Timor-leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela, Bolivarian Republic of', 'Viet Nam', 'Virgin Islands, British', 'Virgin Islands, U.S.', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];      

        // "objects" data set
        this.dataSets.objects = this.dataSets.strings.map((option, i) => {
            return { id: i, name: option };
        });
    }
    
    ngOnInit() {
        this.options = this.selectedDataSet();
    }

    selectedDataSet(): any[] {
        return this.dataSets[this.dataSet.getValue()];
    }

    loadOptions(pageNum: number, pageSize: number, filter: any): Promise<any[]> {
        // Return a promise using setTimeout to simulate an HTTP request.
        let promise = new Promise<any[]>((resolve, reject) => {
            setTimeout(() => {
                const pageStart = pageNum * pageSize;
                const newItems = this.selectedDataSet()
                    .filter((option) => this.isFilterMatch(option, filter))
                    .slice(pageStart, pageStart + pageSize);
                resolve(newItems);
            }, 2000);
        });

        return promise;
    }

    isFilterMatch(option: string | FilterOption, filter: string): boolean {
        if (!filter) {
            return true;
        }

        if (typeof option === 'string') {
            return option.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
        } else {
            return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
        }
    }
}

export interface FilterOption {
    id: string;
    name: string;
}