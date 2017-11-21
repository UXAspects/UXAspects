angular.module('app').controller('PopoverDemoCtrl', PopoverDemoCtrl);

function PopoverDemoCtrl() {
    var vm = this;

    vm.senders = [{
        name: "Simona Terrace",
        title: "Equity Trader",
        email: "simona.terrace@enron.com",
        radioModel: 4
    }];

    vm.recipients = [
        {
            name: "Luke French",
            email: "luke.french@pxc.com",
            radioModel: 4
        }, {
            name: "Irene Beck",
            email: "irene.beck@pxc.com",
            radioModel: 4
        }
    ];

    vm.radioOptions = {
        option1: 1,
        option2: 2,
        option3: 3,
        option4: 4
    };
}