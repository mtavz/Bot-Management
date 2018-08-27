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


/*import { Resolve } from '@angular/router';

import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
*/

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



    addBot(from, bot_address, bot_address_info, lat, long): Observable<any> {
        let meta;
        return Observable.create(observer => {
            this.BotMgmt.deployed().then(instance => {
                meta = instance;
                return meta.addBot(bot_address, bot_address_info, lat, long, {
                    from: from,
                });
            }).then(() => {
                observer.next()
                observer.next()
            }).catch(e => {
                console.log(e);
                observer.error(e)
            });
        })
    }

    addPermission(from, address, permisType): Observable<any> {
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

    getBalance(from, acc_addr): Observable<number> {
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


    /*resolve(route: ActivatedRouteSnapshot): Promise | boolean {
        let id = +route.params['id'];
        return this.heroService.getHero(id).then(hero => {
            if (hero) {
                return hero;
            } else { // id not found
                this.router.navigate(['/dashboard']);
                return false;
            }
        });
    }*/


    getBotListOb(from): Observable<Array<string>> {
        let meta;
        let size;
        let numbers = new Array;

        return Observable.create(observer => {
            this.BotMgmt.deployed().then(instance => {
                meta = instance;

                let botLenght = meta.getBotLenght({
                    from: from,
                });

                return botLenght.then(data => {
                    size = data.toNumber();
                }).then(() => {
                    //console.log(meta.botList);
                    for (var _i = 0; _i < size; _i++) {
                        let value = meta.getBotInfo(_i, {
                            from: from,
                        });
                        value.then(data => {
                            numbers.push(data[0]);
                            numbers.push(data[1]);
                            numbers.push(data[2]);
                            numbers.push(data[3]);
                            numbers.push(data[4]);
                        });
                    }

                    observer.next(numbers)
                    observer.complete()

                    //return numbers
                }).catch(e => {
                    console.log(e);
                    observer.error(e)
                });

            }).then((value) => {
                //observer.next(value)
                //observer.complete()
            }).catch(e => {
                console.log(e);
                //observer.error(e)
            });
        })
    }

    getBotList(from): Array<string> {
        let meta;
        var size;
        var numbers = new Array;
        this.BotMgmt.deployed().then(instance => {

            meta = instance;

            let botLenght = meta.getBotLenght({
                from: from,
            });

            botLenght.then(data => {
                size = data.toNumber();
            }).then(() => {
                for (var _i = 0; _i < size; _i++) {
                    let value = meta.getBotInfo(_i, {
                        from: from,
                    });
                    value.then(data => {
                        numbers.push(data);
                    })
                }
            })
        })
        return numbers;
        // })
    }

    getAccountList(from): Observable<Array<any>> {
        let meta;
        var size;
        var numbers = new Array;

        return Observable.create(observer => {

            this.BotMgmt.deployed().then(instance => {
                meta = instance;

                let botLenght = meta.getAccountLenght({
                    from: from,
                });

                return botLenght.then(data => {
                    size = data.toNumber();
                }).then(() => {
                    for (var _i = 0; _i < size; _i++) {
                        let value = meta.getAccount(_i, {
                            from: from,
                        });
                        value.then(data => {
                            numbers.push(data[0]);
                            numbers.push(data[1].toNumber());
                        })
                    }

                    observer.next(numbers)
                    observer.complete()

                    //return numbers
                }).catch(e => {
                    console.log(e);
                    observer.error(e)
                });

            }).catch(e => {
                console.log(e);
                //observer.error(e)
            });

        })
    }
}

