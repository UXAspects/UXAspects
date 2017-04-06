angular.module('app').directive('uxdSelectWrapper', () => {
    return {
        restrict: 'E',
        controller: 'SelectDemoCtrl as vm',
        template: require('./select-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('SelectDemoCtrl', SelectDemoCtrl);

SelectDemoCtrl.$inject = ['$timeout', '$filter', '$q', '$scope'];

function SelectDemoCtrl($timeout: ng.ITimeoutService, $filter: any, $q: any, $scope: angular.IScope) {
    var vm = this;

    vm.$onDestroy = function() {
       $scope.$destroy();
    };

    // Configuration options for the single select controls
    vm.singleSelectOptions = {
        placeholder: 'Select a location',
        pageSize: 20
    };

    // Configuration options for the multiple select controls
    vm.multipleSelectOptions = {
        placeholder: 'Select some locations',
        pageSize: 20
    };

    // Data source with strings
    vm.locations = [
        'United States',
        'United Kingdom',
        'Afghanistan',
        'Aland Islands',
        'Albania',
        'Algeria',
        'American Samoa',
        'Andorra',
        'Angola',
        'Anguilla',
        'Antarctica',
        'Antigua and Barbuda',
        'Argentina',
        'Armenia',
        'Aruba',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Bahamas',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bermuda',
        'Bhutan',
        'Bolivia, Plurinational State of',
        'Bonaire, Sint Eustatius and Saba',
        'Bosnia and Herzegovina',
        'Botswana',
        'Bouvet Island',
        'Brazil',
        'British Indian Ocean Territory',
        'Brunei Darussalam',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        'Cambodia',
        'Cameroon',
        'Canada',
        'Cape Verde',
        'Cayman Islands',
        'Central African Republic',
        'Chad',
        'Chile',
        'China',
        'Christmas Island',
        'Cocos (Keeling) Islands',
        'Colombia',
        'Comoros',
        'Congo',
        'Congo, The Democratic Republic of The',
        'Cook Islands',
        'Costa Rica',
        'Cote D\'ivoire',
        'Croatia',
        'Cuba',
        'Curacao',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'Ecuador',
        'Egypt',
        'El Salvador',
        'Equatorial Guinea',
        'Eritrea',
        'Estonia',
        'Ethiopia',
        'Falkland Islands (Malvinas)',
        'Faroe Islands',
        'Fiji',
        'Finland',
        'France',
        'French Guiana',
        'French Polynesia',
        'French Southern Territories',
        'Gabon',
        'Gambia',
        'Georgia',
        'Germany',
        'Ghana',
        'Gibraltar',
        'Greece',
        'Greenland',
        'Grenada',
        'Guadeloupe',
        'Guam',
        'Guatemala',
        'Guernsey',
        'Guinea',
        'Guinea-bissau',
        'Guyana',
        'Haiti',
        'Heard Island and Mcdonald Islands',
        'Holy See (Vatican City State)',
        'Honduras',
        'Hong Kong',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iran, Islamic Republic of',
        'Iraq',
        'Ireland',
        'Isle of Man',
        'Israel',
        'Italy',
        'Jamaica',
        'Japan',
        'Jersey',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kiribati',
        'Korea, Democratic People\'s Republic of',
        'Korea, Republic of',
        'Kuwait',
        'Kyrgyzstan',
        'Lao People\'s Democratic Republic',
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Macao',
        'Macedonia, The Former Yugoslav Republic of',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Marshall Islands',
        'Martinique',
        'Mauritania',
        'Mauritius',
        'Mayotte',
        'Mexico',
        'Micronesia, Federated States of',
        'Moldova, Republic of',
        'Monaco',
        'Mongolia',
        'Montenegro',
        'Montserrat',
        'Morocco',
        'Mozambique',
        'Myanmar',
        'Namibia',
        'Nauru',
        'Nepal',
        'Netherlands',
        'New Caledonia',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'Niue',
        'Norfolk Island',
        'Northern Mariana Islands',
        'Norway',
        'Oman',
        'Pakistan',
        'Palau',
        'Palestinian Territory, Occupied',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Pitcairn',
        'Poland',
        'Portugal',
        'Puerto Rico',
        'Qatar',
        'Reunion',
        'Romania',
        'Russian Federation',
        'Rwanda',
        'Saint Barthelemy',
        'Saint Helena, Ascension and Tristan da Cunha',
        'Saint Kitts and Nevis',
        'Saint Lucia',
        'Saint Martin (French part)',
        'Saint Pierre and Miquelon',
        'Saint Vincent and The Grenadines',
        'Samoa',
        'San Marino',
        'Sao Tome and Principe',
        'Saudi Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Sint Maarten (Dutch part)',
        'Slovakia',
        'Slovenia',
        'Solomon Islands',
        'Somalia',
        'South Africa',
        'South Georgia and The South Sandwich Islands',
        'South Sudan',
        'Spain',
        'Sri Lanka',
        'Sudan',
        'Suriname',
        'Svalbard and Jan Mayen',
        'Swaziland',
        'Sweden',
        'Switzerland',
        'Syrian Arab Republic',
        'Taiwan, Province of China',
        'Tajikistan',
        'Tanzania, United Republic of',
        'Thailand',
        'Timor-leste',
        'Togo',
        'Tokelau',
        'Tonga',
        'Trinidad and Tobago',
        'Tunisia',
        'Turkey',
        'Turkmenistan',
        'Turks and Caicos Islands',
        'Tuvalu',
        'Uganda',
        'Ukraine',
        'United Arab Emirates',
        'United States Minor Outlying Islands',
        'Uruguay',
        'Uzbekistan',
        'Vanuatu',
        'Venezuela, Bolivarian Republic of',
        'Viet Nam',
        'Virgin Islands, British',
        'Virgin Islands, U.S.',
        'Wallis and Futuna',
        'Western Sahara',
        'Yemen',
        'Zambia',
        'Zimbabwe'
    ];

    // Data source with objects
    vm.locationObjects = [];
    for (var i in vm.locations) {
        vm.locationObjects.push({
            country: vm.locations[i],
            id: i
        });
    }

    // Properties to bind to the ng-model attribute of each control
    vm.singleSelectLocation = '';
    vm.multipleSelectLocations = [];
    vm.singleSelectPagingLocation = '';
    vm.multipleSelectPagingLocations = [];

    // Paging function which returns a promise, and simulates an asynchronous data request
    // Fetches from vm.locations
    vm.locationPageFn = function(pageNumber: number, pageSize: number, searchString: string) {
        var deferred = $q.defer();
        // Simulate a server request using a timeout
        $timeout(function() {
            var results;
            results = $filter('filter')(vm.locations, searchString);
            results = results.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
            deferred.resolve(results);
        }, 1000);
        return deferred.promise;
    };

    // Paging function which returns a promise, and simulates an asynchronous data request
    // Fetches from vm.locationObjects
    vm.locationObjectPageFn = function(pageNumber: number, pageSize: number, searchString: string) {
        var deferred = $q.defer();
        // Simulate a server request using a timeout
        $timeout(function() {
            var results;
            results = $filter('filter')(vm.locationObjects, searchString);
            results = results.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
            deferred.resolve(results);
        }, 1000);
        return deferred.promise;
    };
}