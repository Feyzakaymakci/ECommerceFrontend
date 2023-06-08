import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxFileDropModule } from 'ngx-file-drop';
import { LoginComponent } from './ui/components/login/login.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent    
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgxFileDropModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("accessToken"),  //Tüm isteklerde authorization olarak header a yerleştir
        allowedDomains: ["localhost:7073"]
      }
    }),
    SocialLoginModule
  ],
  
  providers: [
    {provide:"baseUrl",useValue:"https://localhost:7073/api", multi:true},
      {
        provide: "SocialAuthServiceConfig",
        useValue: {
          autoLogin: false,
          providers: [
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider("68973280934-plkok7mrca4nquu45p759ravh4qr1vcm.apps.googleusercontent.com")
            },
            {
              id: FacebookLoginProvider.PROVIDER_ID,
              provider: new FacebookLoginProvider("2473297539499443") //App ID
            }
          ],
          onError: err => console.log(err)
        } as SocialAuthServiceConfig
      }
    ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA]
})
   
export class AppModule { }
