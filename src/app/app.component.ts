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
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  // TODO add proper types these variables
  account: any;
  accounts: any;
  
  balance: number;
  acc_addr: string;
  permisType: number;
  address_bot: string;
  status: string;


  constructor(
    private _ngZone: NgZone,
    private web3Service: Web3Service,
    private vehicleServie: BotManagementService
  ) {
    this.onReady();
  }

  onReady = () => {

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

    this.web3Service.getNetworkID().subscribe(accs => {
      var networkID = accs;
      console.log(networkID);
      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
    }, err => alert(err))

    this.web3Service.getBalance('0xca4dbd935ade806b74b94e1ffe706d0eec770174').subscribe(value => {
      console.log(value);
      this.balance = value;
      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
    }, err => alert(err))
  };

  refreshBalance = () => {
    this.web3Service.getBalance(this.account)
      .subscribe(value => {
        this.balance = value
      }, e => {
        this.setStatus('Error getting balance; see log.')
      })
  };

  getBotList2 = () => {
    this.vehicleServie.getBotList2(this.account)
      .subscribe(value => {
        console.log(value);
      }, e => {
        this.setStatus('Error getting balance; see log.')
      })
  };

  setStatus = message => {
    this.status = message;
  };

  addPermission = () => {
    this.setStatus('Initiating transaction... (please wait)');
    this.vehicleServie.addPermission(this.account, this.acc_addr, this.permisType)
      .subscribe(value => {
        console.log(value);        
        this.setStatus('Transaction complete!');
      }, e => this.setStatus('Error sending coin; see log.'))
  };

  getBotList = () => {
    console.log( this.vehicleServie.getBotList(this.account))
  }; 

  getAccountList = () => {
    console.log( this.vehicleServie.getAccountList(this.account))
  };


  addBot = () => {
    this.setStatus('Initiating transaction... (please wait)');
    this.vehicleServie.addBot(this.account, this.address_bot, " "," " ,"")
      .subscribe(value => {
        console.log(value);        
        this.setStatus('Transaction complete!');
      }, e => this.setStatus('Error sending coin; see log.'))
  }; 
}
