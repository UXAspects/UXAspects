import { browser, by, element } from 'protractor';

export class ConduitsPage {

    zone1Input = element(by.id('zone-one-input'));
    zone2Input = element(by.id('zone-two-input'));
    zone3Input = element(by.id('zone-three-input'));

    zone1ProducesOutput = element(by.id('zone-1-produces-output'));
    zone2ProducesOutput = element(by.id('zone-2-produces-output'));
    zone3ProducesOutput = element(by.id('zone-3-produces-output'));

    zone1AcceptsInput2 = element(by.id('zone-1-accepts-input-2'));
    zone1AcceptsInput3 = element(by.id('zone-1-accepts-input-3'));

    zone2AcceptsInput1 = element(by.id('zone-2-accepts-input-1'));
    zone2AcceptsInput3 = element(by.id('zone-2-accepts-input-3'));

    zone3AcceptsInput1 = element(by.id('zone-3-accepts-input-1'));
    zone3AcceptsInput2 = element(by.id('zone-3-accepts-input-2'));

    toggleBtn = element(by.id('toggle-visibility'));

    async getPage(): Promise<void> {
        await browser.get('#/conduits');
    }

    async getConduitValue(zone: Zone): Promise<string> {
        switch (zone) {
            case Zone.One:
                return await this.zone1Input.getAttribute('value');

            case Zone.Two:
                return await this.zone2Input.getAttribute('value');

            case Zone.Three:
                return await this.zone3Input.getAttribute('value');
        }
    }

    async setConduitValue(zone: Zone, value: string): Promise<void> {
        switch (zone) {
            case Zone.One:
                await this.zone1Input.clear();
                return await this.zone1Input.sendKeys(value);

            case Zone.Two:
                await this.zone2Input.clear();
                return await this.zone2Input.sendKeys(value);

            case Zone.Three:
                await this.zone3Input.clear();
                return await this.zone3Input.sendKeys(value);
        }
    }

    async toggleProducesOutput(zone: Zone): Promise<void> {
        switch (zone) {
            case Zone.One:
                return await this.zone1ProducesOutput.click();

            case Zone.Two:
                return await this.zone2ProducesOutput.click();

            case Zone.Three:
                return await this.zone3ProducesOutput.click();
        }
    }

    async toggleAcceptsInput(zone: Zone, target: Zone): Promise<void> {
        switch (zone) {
            case Zone.One:
                if (target === Zone.Two) {
                    return await this.zone1AcceptsInput2.click();
                }

                if (target === Zone.Three) {
                    return await this.zone1AcceptsInput3.click();
                }

            case Zone.Two:
                if (target === Zone.One) {
                    return await this.zone2AcceptsInput1.click();
                }

                if (target === Zone.Three) {
                    return await this.zone1AcceptsInput3.click();
                }

            case Zone.Three:
                if (target === Zone.One) {
                    return await this.zone3AcceptsInput1.click();
                }

                if (target === Zone.Two) {
                    return await this.zone3AcceptsInput2.click();
                }
        }
    }

    async toggleZoneThreeVisibility(): Promise<void> {
        return await this.toggleBtn.click();
    }
}

export enum Zone {
    One,
    Two,
    Three
}

