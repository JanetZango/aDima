import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdimaProvider } from '../providers/adima/adima';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SigninPage } from '../pages/signin/signin';
import { MakeRequestPage } from '../pages/make-request/make-request';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public admina :AdimaProvider) {
    platform.ready().then(() => {
      
      admina.checkstate().then((data: any) => {
        if (data == 1) {
          this.rootPage = ListPage
        }
        else {
          this.rootPage = SigninPage
        }
       })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

