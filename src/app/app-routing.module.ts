import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { LoginComponent } from './pages/login/login.component'
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'create-post', component: CreatePostComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
