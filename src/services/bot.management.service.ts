import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs/Observable';
import {
  fromPromise
} from 'rxjs/observable/fromPromise';
import {
  Web3Service
} from './web3.service'

const botArtifacts = require('../../build/contracts/BotManagement.json');
const contract = require('truffle-contract');

@Injectable()
export class BotManagementService {

  BotMgmt = contract(botArtifacts);

  constructor(
    private web3Ser: Web3Service,
  ) {
    this.BotMgmt.setProvider(web3Ser.web3.currentProvider);
  }



  addBot(from, bot_address): Observable < any > {
    let meta;
    return Observable.create(observer => {
      this.BotMgmt
        .deployed()
        .then(instance => {
          meta = instance;
          return meta.addBot(bot_address, {
            from: from,
          });
        })
        .then(() => {
          observer.next()
          observer.next()
        })
        .catch(e => {
          console.log(e);
          observer.error(e)
        });
    })
  }

  addPermission(from, address, permisType): Observable < any > {
    let meta;
    return Observable.create(observer => {
      this.BotMgmt
        .deployed()
        .then(instance => {
          meta = instance;
          return meta.addPermission(address, permisType, {
            from: from,
          });
        })
        .then(() => {
          observer.next()
          observer.next()
        })
        .catch(e => {
          console.log(e);
          observer.error(e)
        });
    })
  }

  getBalance(from, acc_addr): Observable < number > {
    let meta;
    return Observable.create(observer => {
      this.BotMgmt
        .deployed()
        .then(instance => {
          meta = instance;
          return meta.getBalance(acc_addr, {
            from: from,
          });
        })
        .then((value) => {
          observer.next(value)
          observer.complete()
        })
        .catch(e => {
          console.log(e);
          observer.error(e)
        });
    })
  }

  getBotList(from): Array < string > {
    let meta;
    var size;
    var numbers = new Array;
    this.BotMgmt
    .deployed()
    .then(instance => {
      meta = instance;

      let botLenght= meta.getBotLenght({
        from: from,
      });

      botLenght.then(data=>{
        size = data.toNumber();
      }).then(()=>{
        for (var _i = 0; _i < size; _i++) {
          let value = meta.botList(_i, {
            from: from,
          });
          value.then(data=>{
            numbers.push(data); 
          })
        }
      });
    })
    return numbers;
    // })
  }

  getAccountList(from): Array < any > {
    let meta;
    var size;
    var numbers = new Array;
    this.BotMgmt
    .deployed()
    .then(instance => {
      meta = instance;

      let botLenght= meta.getAccountLenght({
        from: from,
      });

      botLenght.then(data=>{
        size = data.toNumber();
      }).then(()=>{
        for (var _i = 0; _i < size; _i++) {
          let value = meta.getAccoutn(_i, {
            from: from,
          });
          value.then(data=>{
            numbers.push(data[0]); 
            numbers.push(data[1].toNumber()); 
          })
        }
      });
    })
    return numbers;
    // })
  }
}
