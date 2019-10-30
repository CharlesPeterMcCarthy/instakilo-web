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
import { CreatePostComponent } from './pages/create-post/create-post.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NOTYF, notyfFactory } from './utils/notyf.token';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NavLinkComponent,
    CreatePostComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    AmplifyAngularModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: AmplifyService,
      useFactory:  () => {
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
