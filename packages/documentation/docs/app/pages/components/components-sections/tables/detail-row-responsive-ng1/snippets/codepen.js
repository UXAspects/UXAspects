angular.module("app").controller("DetailRowResponsiveTableCtrl", DetailRowResponsiveTableCtrl);

DetailRowResponsiveTableCtrl.$inject = ['$colorService'];

function DetailRowResponsiveTableCtrl($colorService) {

    var vm = this;

    vm.detailRowTableStatic = [
         {
          id: 1,
          rowType: 'hpe-mail',
          address: 'rosie.hunt@business.com',
          contacts: [{
            text: "Rosie Hunt",
          }],
          organization: {
            text: "Trading",
          },
          colorsPrimary: {
            primary: $colorService.getColor('primary').toHex(),
            secondary: "#ffffff"
          },
          medium: 'small',
          percent: 39,
          type: "spark-primary",
          sparklabel: "<span class=\'hidden-spark\'>0.39</span>",
          subject: 're: hi, This is a test email.',
          detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla, nunc sit amet faucibus' +
            'dapibus, est purus luctus magna, ut tempus orci quam vitae diam. Aenean congue ultricies leo, ut aliquam nibh.' +
            'Integer facilisis tortor id ligula mollis, eget pretium sapien tempor.' +
            ' Suspendisse quis tempus ante. Curabitur vulputate, felis non blandit dapibus.'

        }, {
          id: 2,
          rowType: 'hpe-mail',
          address: 'james.bryson@business.com',
          contacts: [{
            text: "James Bryson",
          }],
          organization : {
              text: "Trading",
           },
          colorsPrimary : {
              primary: $colorService.getColor('primary').toHex(),
              secondary: "#ffffff"
          },
          medium: 'small',
          subject: 're: hi, Attention! This email is high priority.',
          percent: 55,
          type : "spark-primary",
          sparklabel:  "<span class=\"hidden-spark\">0.55</span>",
          detail: 'Aenean congue ultricies leo, ut aliquam nibh. Integer facilisis tortor id ligula mollis, eget pretium sapien tempor.' +
                    ' Suspendisse quis tempus ante. Curabitur vulputate, felis non blandit dapibus. Duis volutpat nunc vel volutpat nunc vel metus ultrices.'
         },
         {
           id: 3,
           rowType: 'hpe-mail',
           address: 'adam.parker@business.com',
           contacts : [{
             text: "Adam Parker",
           }],
           organization : {
               text: "HR",
           },
           colorsPrimary : {
              primary: $colorService.getColor('accent').toHex(),
              secondary: "#ffffff"
           },
           medium: 'small',
           subject: 're: hi, There is something related.',
           percent : 44,
           type : "spark-primary",
           sparklabel: "<span class=\"hidden-spark\">-0.44</span>",
           detail:  'Duis volutpat nunc vel metus ultrices, vel cursus nisl scelerisque. Nulla facilisis ipsum ligula, nec' +
                     'blandit dolor aliquam a. Aenean posuere enim ligula, eu convallis mauris pulvinar nec.' +
                     'Praesent risus massa, rhoncus pretium massa non, blandit gravida risus. Duis ut orci dolor. Sed congue' +
                     'fermentum ante, a pellentesque quam gravida vel.'
         },
         {
           id: 4,
           rowType: 'hpe-mail',
           address: 'adam.jackson@business.com',
           contacts : [{
             text: "Adam Jackson",
           }],
           organization : {
               text: "Investing",
           },
           colorsPrimary : {
              primary: $colorService.getColor('primary').toHex(),
              secondary: "#ffffff"
           },
           medium: 'small',
           subject: 're: hi, This is an example.',
           percent: 67,
           type: "spark-primary",
           sparklabel: "<span class=\"hidden-spark\">-0.67</span>",
           detail: 'Praesent risus massa, rhoncus pretium massa non, blandit gravida risus. Duis ut orci dolor. Sed congue' +
                    'fermentum ante, a pellentesque quam gravida vel. Praesent risus massa, rhoncus pretium massa non.'
         },
      ];
}