import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WildCardRouteHandlerComponent } from './wild-card-route-handler/wild-card-route-handler.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(module => module.HomeModule)
  },
  {
    path: '**', 
    component: WildCardRouteHandlerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
