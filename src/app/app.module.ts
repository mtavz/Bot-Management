import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import {Web3Service} from 'services/web3.service'
import {BotManagementService} from 'services/bot.management.service'


import {Topnavbar} from './components/topnavbar/topnavbar.component';
import {Navigation} from './components/navigation/navigation.component';

import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';
import {HomeComponent} from './pages/home/home.component';
import { getListComponent } from './pages/getList/getList.component';
import { getAccountComponent } from './pages/getAccount/getAccount.component';
import { addBotComponent } from './pages/addBot/addBot.component';
import { addPermissionComponent } from './pages/addPermission/addPermission.component';
import { checkAccountComponent } from './pages/checkAccount/checkAccount.component';

//import {DataTableModule} from 'angular2-datatable';
import { PipeModule } from '../pipes/pipes'
import { UserData } from 'providers/account';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    //DataTableModule,

    PipeModule.forRoot(),

    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,

    Navigation,
    Topnavbar,

    HomeComponent,
    getListComponent,
    getAccountComponent,
    addBotComponent,
    addPermissionComponent,
    checkAccountComponent
  ],
  providers: [
    BotManagementService,
    Web3Service,
    UserData,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
