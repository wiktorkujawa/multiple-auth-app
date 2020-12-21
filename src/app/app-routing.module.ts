import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './components/public/public.component';
import { AboutComponent } from './components/about/about.component';



const routes: Routes = [
  { path: '', 
    component: PublicComponent,
    children: [
      {path: 'full', redirectTo: '/'},
      {path:'', component: AboutComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
