import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Amplify from 'aws-amplify';

const config = {
  identityPoolId: 'eu-west-1_6V0H7YYlb',
  region: 'eu-west-1',
  userPoolId: 'eu-west-1_6V0H7YYlb',
  userPoolWebClientId: '6ahriip0la2v4gall49m3sddo3'
};

Amplify.configure(config);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
