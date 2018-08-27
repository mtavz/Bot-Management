import {smoothlyMenu} from '../../app.helpers';


import {
    Component,
    HostListener,
    NgZone
} from '@angular/core';

import {
    Web3Service
} from 'services/web3.service'

import {
    BotManagementService
} from 'services/bot.management.service';


@Component({
    selector: 'topnavbar',
    templateUrl: 'topnavbar.component.html'
})
export class Topnavbar {

    account = '';

    bots: any;

    constructor(
        private _ngZone: NgZone,
        private web3Service: Web3Service,
        private vehicleServie: BotManagementService
    ) {

        // Get the initial account balance so it can be displayed.
        this.web3Service.getAccounts().subscribe(accs => {
            this.account = accs[0];
            console.log(this.account);

            jQuery('#account_adr>a').html(this.account);
        }, err => alert(err))
    }

    ngOnInit() {

    }
    toggleNavigation(): void {
        jQuery('body').toggleClass('mini-navbar');
        smoothlyMenu();
    }
    logout() {
        localStorage.clear();
        // location.href='http://to_login_page';
    }
}