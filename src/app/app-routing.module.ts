import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { LoginComponent } from './pages/login/login.component'
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { LoggedInGuard } from './guards/logged-in/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out/logged-out.guard';
import { FeedComponent } from './pages/feed/feed.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [ LoggedOutGuard ] },
  { path: 'signup', component: SignUpComponent, canActivate: [ LoggedOutGuard ] },
  { path: 'confirm/:username/:code', component: ConfirmEmailComponent, canActivate: [ LoggedOutGuard ] },
  { path: 'login', component: LoginComponent, canActivate: [ LoggedOutGuard ] },
  { path: 'create-post', component: CreatePostComponent, canActivate: [ LoggedInGuard ] },
  { path: 'feed', component: FeedComponent, canActivate: [ LoggedInGuard ] },
  { path: 'post/:id', component: ViewPostComponent, canActivate: [ LoggedInGuard ] },
  { path: 'search', component: SearchComponent, canActivate: [ LoggedInGuard ] },
  { path: 'search/:type/:value', component: SearchComponent, canActivate: [ LoggedInGuard ] },
  { path: 'profile', component: ProfileComponent, canActivate: [ LoggedInGuard ] },
  { path: 'profile/edit', component: ProfileComponent, canActivate: [ LoggedInGuard ] },
  { path: 'profile/:userId', component: ProfileComponent, canActivate: [ LoggedInGuard ] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
