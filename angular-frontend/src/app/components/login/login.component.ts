import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignin from '@okta/okta-signin-widget'
import {OAuthService, AuthConfig} from 'angular-oauth2-oidc';

import AppConfig from '../../config/appconfig';

export const authConfig: AuthConfig = {
  clientId: '0oa33t0ul5fV8qYj35d6',
  issuer: 'https://dev-4777435.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/login/callback',
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 

  constructor(private oauthService: OAuthService) { 

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();


  }

  ngOnInit(){ 

  }

  login(){
    this.oauthService.initLoginFlow();
  }

  logout(){
    this.oauthService.logOut();
  }

  getUsername(){
    const claims = this.oauthService.getIdentityClaims();
    if(!claims) {
      return null;
    }
    return claims['name'];
  }

}
