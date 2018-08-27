/**
 * Created by andrew.yang on 5/18/2017.
 */
import {
    OnInit,
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
import { UserData } from 'providers/account';

@Component({
    selector: 'getAccount',
    templateUrl: './getAccount.component.html'
})
export class getAccountComponent implements OnInit {

    account: any;

    accounts: any;

    constructor(
        private _ngZone: NgZone,
        private web3Service: Web3Service,
        private vehicleServie: BotManagementService,

        private userData: UserData,
    ) {
        /*this.userData.getAccount().then((data) => {
            this.account = data;
        });
        console.log(this.account)*/

        // Get the initial account balance so it can be displayed.
        // Get the initial account balance so it can be displayed.
        this.web3Service.getAccounts().subscribe(accs => {
            this.account = accs[0];
            this._ngZone.run(() =>
                this.getAccounts()
            );
        }, err => alert(err))

    }

    ngOnInit() {
    }

    getAccounts() {
        this.vehicleServie.getAccountList(this.account).subscribe((data) => {
            this.accounts = data;

            console.log(data);
        });
    }

}
