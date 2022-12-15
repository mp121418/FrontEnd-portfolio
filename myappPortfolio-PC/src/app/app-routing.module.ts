import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {path: 'intro', component:IntroComponent},
{path: 'dashboard', component:DashboardComponent/*,canActivate:[GuardianGuard]*/},
{path: '', redirectTo: '/intro', pathMatch:'full'},
{path:'**', component:ErrorComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
