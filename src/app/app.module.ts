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
import { CommentContainerComponent } from './components/comments/comment-container/comment-container.component';
import { CommentDisplayComponent } from './components/comments/comment-display/comment-display.component';
import { CommentEnterComponent } from './components/comments/comment-enter/comment-enter.component';

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
    CommentContainerComponent,
    CommentDisplayComponent,
    CommentEnterComponent
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
