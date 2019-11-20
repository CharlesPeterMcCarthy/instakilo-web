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
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { CommentContainerComponent } from './components/comment-container/comment-container.component';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { DisplayCommentComponent } from './components/display-comment/display-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NavLinkComponent,
    SignUpComponent,
    LoginComponent,
    CreatePostComponent,
    SpinnerComponent,
    ConfirmEmailComponent,
    CommentContainerComponent,
    PostCommentComponent,
    DisplayCommentComponent
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
