import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

import { ItemListComponent } from './components/item-list/item-list.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoutComponent } from './components/logout/logout.component';

import { LoadingComponent } from './components/loading/loading.component';
import { KendoDemoComponent } from './components/kendo-demo/kendo-demo.component';

export const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: "header",
                component: HeaderComponent
            },
            {
                path: "item-list",
                component: ItemListComponent
            },
            {
                path: "register",
                component: RegisterComponent
            },
            {
                path: "login",
                component: LoginComponent
            },
            {
                path: "add-item",
                component: AddItemComponent
            },
            {
                path: "loading",
                component: LoadingComponent
            },
            {
                path: "logout",
                component: LogoutComponent
            },
            {
                path: "kendo-demo",
                component: KendoDemoComponent
            },

            {
                path: "",
                redirectTo: "/register",
                pathMatch: "full"
            }
        ]
    }
];
