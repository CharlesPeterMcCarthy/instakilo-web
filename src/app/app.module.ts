import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { NavLinkComponent } from './components/nav/nav-link/nav-link.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AmplifyAngularModule, AmplifyModules, AmplifyService } from 'aws-amplify-angular';
import Auth from '@aws-amplify/auth';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NOTYF, notyfFactory } from './utils/notyf.token';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FeedComponent } from './pages/feed/feed.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { PostBriefComponent } from './components/posts/post-brief/post-brief.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { PostComponent } from './components/posts/post/post.component';
import { SearchComponent } from './pages/search/search.component';
import { SearchPostsResultsComponent } from './components/search-posts-results/search-posts-results.component';
import { SearchPostsFormComponent } from './components/search-posts-form/search-posts-form.component';
import { SearchPostsByComponent } from './components/search-posts-form/search-posts-by/search-posts-by.component';
import { GenericSearchResultsPipe } from './pipes/generic-search-results/generic-search-results.pipe';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NavLinkComponent,
    SignUpComponent,
    LoginComponent,
    CreatePostComponent,
    SpinnerComponent,
    FeedComponent,
    ConfirmEmailComponent,
    BottomNavComponent,
    PostBriefComponent,
    ViewPostComponent,
    PostComponent,
    SearchComponent,
    SearchPostsResultsComponent,
    SearchPostsFormComponent,
    SearchPostsByComponent,
    GenericSearchResultsPipe,
    HomeComponent,
    ProfileComponent,
    EditProfileComponent,
    ViewProfileComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    AmplifyAngularModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: AmplifyService,
      useFactory: (): AmplifyAngularModule => {
        return AmplifyModules({
          Auth
        });
      }
    },
    {
      provide: NOTYF,
      useFactory: notyfFactory
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
