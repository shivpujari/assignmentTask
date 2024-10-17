import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/products.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

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
        path: '**',
        component: NotFoundComponent
    }
];
