import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  
   { path: 'main', loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
     canLoad: [ UsuarioGuard ] },

  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },

  { path: 'favoritos', loadChildren: './pages/favoritos/favoritos.module#FavoritosPageModule' },
  
  { path: 'tarjeta', loadChildren: './pages/tarjeta/tarjeta.module#TarjetaPageModule' },
  
  // { path: '', pathMatch: 'full', redirectTo: 'main/tabs/tab1'},
  { path: '', pathMatch: 'full', redirectTo: 'main/tabs/tab1'}

  

  

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
