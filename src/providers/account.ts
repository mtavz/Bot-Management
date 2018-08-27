import {
    Injectable,
    Component,
    HostListener,
    NgZone
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Http, Headers, RequestOptions } from '@angular/http';


import {
    Web3Service
} from '../services/web3.service'
import {
    BotManagementService
} from '../services/bot.management.service';


@Injectable()
export class UserData {
    HAS_LOGGED_IN = 'hasLoggedIn';
    HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
    data: any;


    public account: any;
    public accounts: any;
    public balance: number;
    public status: string;


    constructor(
        public http: Http,


        private _ngZone: NgZone,
        private web3Service: Web3Service,
        private vehicleServie: BotManagementService
    ) {
    }

    getAccount = () => {
        // Get the initial account balance so it can be displayed.
        this.web3Service.getAccounts().subscribe(accs => {
            this.accounts = accs;
            this.account = this.accounts[0];
            console.log(this.account);
            // This is run from window:load and ZoneJS is not aware of it we
            // need to use _ngZone.run() so that the UI updates on promise resolution
            this._ngZone.run(() =>
                this.refreshBalance()
            );
        }, err => alert(err))
    }

    refreshBalance = () => {
        this.web3Service.getBalance(this.account).subscribe(value => {
            this.balance = value
        }, e => {
            this.setStatus('Error getting balance; see log.')
        })
    };

    setStatus = message => {
        this.status = message;
    };

}
