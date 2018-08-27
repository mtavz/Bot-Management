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

import { Observable } from 'rxjs';

@Component({
    selector: 'getList',
    templateUrl: './getList.component.html'
})
export class getListComponent implements OnInit {
    // TODO add proper types these variables
    account: any;

    bots: any;

    constructor(
        private _ngZone: NgZone,
        private web3Service: Web3Service,
        private vehicleServie: BotManagementService
    ) {
        // Get the initial account balance so it can be displayed.
        this.web3Service.getAccounts().subscribe(accs => {
            this.account = accs[0];
            this._ngZone.run(() =>
                this.loadBots()
            );
        }, err => alert(err))

    }

    ngOnInit() {
    }

    loadBots() {
        this.vehicleServie.getBotListOb(this.account).subscribe((data) => {
            this.bots = data;

            console.log(data);
        });
    }

}
