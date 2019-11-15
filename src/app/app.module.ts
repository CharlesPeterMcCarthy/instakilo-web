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
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NavLinkComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    AmplifyAngularModule
  ],
  providers: [
    {
      provide: AmplifyService,
      useFactory:  () => {
        return AmplifyModules({
          Auth
        });
      }
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
