import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/products.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { MockComponent } from './components/mock/mock.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductsComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'mock',
        component: MockComponent
    },
    {
        path: 'stop-watch',
        loadComponent: () => import('./components/stop-watch/stop-watch.component').then((m) => m.StopWatchComponent)
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];
