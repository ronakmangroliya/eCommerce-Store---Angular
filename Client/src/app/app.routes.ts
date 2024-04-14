import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { CartComponent } from './components/cart/cart.component';
import { SuccessComponent } from './components/success/success.component';
import { CancelComponent } from './components/cancel/cancel.component';

export const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: 'cart', component: CartComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'cancel', component: CancelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
