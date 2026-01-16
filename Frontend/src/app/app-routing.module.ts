import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [

  {path:'',loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)},
   {path:'',loadChildren:()=>import('./dashbord/dashbord.module').then(m=>m.DashbordModule),canLoad:[AuthGuard]},
   {path:'Unauthorized',component:UnauthorizedComponent},
    {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
