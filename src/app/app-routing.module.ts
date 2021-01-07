import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './components/public/public.component';
import { AboutComponent } from './components/about/about.component';
import { MessagesComponent } from './components/Message/messages/messages.component';



const routes: Routes = [
  { path: '', 
    component: PublicComponent,
    children: [
      {path: 'full', redirectTo: '/'},
      {path: '', component:MessagesComponent},
      {path:'about', component: AboutComponent},
      {path:'messages', component: MessagesComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
