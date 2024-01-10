import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AddItemComponent } from './components/add-item/add-item.component';

export const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: "home",
                component:HomeComponent
            },
            {
                path: "item-list",
                component:ItemListComponent
            },
            {
                path: "register",
                component:RegisterComponent
            },
            {
                path: "login",
                component:LoginComponent
            },
            {
                path: "add-item",
                component:AddItemComponent
            },
            {
                path: "",
                redirectTo: "/home",
                pathMatch: "full"
            }

        ]
    }
];
