import { HomeComponent } from './pages/home/home.component';
import { getListComponent } from './pages/getList/getList.component';
import { checkAccountComponent } from './pages/checkAccount/checkAccount.component';
import { addPermissionComponent } from './pages/addPermission/addPermission.component';
import { addBotComponent } from './pages/addBot/addBot.component';
import { getAccountComponent } from './pages/getAccount/getAccount.component';

export const appRoutes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'getList',
        component: getListComponent
    },
    {
        path: 'getAccount',
        component: getAccountComponent
    },
    {
        path: 'addBot',
        component: addBotComponent
    },
    {
        path: 'addPermission',
        component: addPermissionComponent
    },
    {
        path: 'checkAccount',
        component: checkAccountComponent
    },
    /*{
        path: 'others',
        loadChildren: './pages/others/others.module#OthersModule',
    },*/
];