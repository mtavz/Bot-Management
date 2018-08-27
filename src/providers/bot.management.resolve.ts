// hero-detail.resolve.service.ts

import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { BotManagementService } from './hero.service';

@Injectable()
export class BotManagementResolve implements Resolve {
    constructor(
        private botManagement: BotManagementService, 
        private router: Router
    ) {

    };

    resolve(route: ActivatedRouteSnapshot): Promise | boolean {
        let id = +route.params['id'];
        return this.botManagement.getHero(id).then(hero => {
            if (hero) {
                return hero;
            } else { // id not found
                this.router.navigate(['/dashboard']);
                return false;
            }
        });
    }
}