import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/atm-list',
        pathMatch: 'full'
    },
    {
        path: 'atm-list',
        loadComponent: () => import('./features/atm-list/atm-list.component').then(m => m.AtmListComponent),
        title: 'ATM Management System'
    },
    {
        path: '**',
        redirectTo: '/atm-list'
    }
];