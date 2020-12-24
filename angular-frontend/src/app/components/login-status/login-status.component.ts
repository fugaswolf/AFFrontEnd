import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular'
import { AuthConfig, JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';



import AppConfig from '../../config/appconfig';

export const authConfig: AuthConfig = {
  clientId: '0oa33t0ul5fV8qYj35d6',
  issuer: 'https://dev-4777435.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/login/callback',
}


@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})


export class LoginStatusComponent implements OnInit {

  constructor(private oauthService: OAuthService) { 

    this.configure();

  }

  configure(){
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  ngOnInit(){ 

  }

  login(){
    this.oauthService.initImplicitFlow();
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