import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)}, // loadChildren = lazy load
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
