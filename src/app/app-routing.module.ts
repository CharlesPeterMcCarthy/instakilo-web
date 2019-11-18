import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { LoginComponent } from './pages/login/login.component'
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { LoggedInGuard } from './guards/logged-in/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out/logged-out.guard';
import { FeedComponent } from './pages/feed/feed.component';

const routes: Routes = [
  { path: 'signup', component: SignUpComponent, canActivate: [ LoggedOutGuard ] },
  { path: 'confirm/:username/:code', component: ConfirmEmailComponent, canActivate: [ LoggedOutGuard ] },
  { path: 'login', component: LoginComponent, canActivate: [ LoggedOutGuard ] },
  { path: 'create-post', component: CreatePostComponent, canActivate: [ LoggedInGuard ] },
  { path: 'feed', component: FeedComponent, canActivate: [ LoggedInGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
