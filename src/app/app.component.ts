import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobFree,AdMobFreeBannerConfig } from '@ionic-native/admob-free';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ChantCountPage } from '../pages/chant-count/chant-count';


export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
    // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
  
    // List of pages that can be navigated to from the left menu
    // the left menu only works after login
    // the login page disables the left menu
    appPages: PageInterface[] = [
      { title: 'Chant Count', name: 'ChantCountPage', component: ChantCountPage, tabComponent: ChantCountPage, index: 0, icon: 'calendar' },
      { title: 'About', name: 'AboutPage', component: AboutPage, tabComponent: AboutPage, index: 0, icon: 'info' },
      
    ];
    /* loggedInPages: PageInterface[] = [
      { title: 'Account', name: 'AccountPage', component: AccountPage, icon: 'person' },
      { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
      { title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true }
    ];
    loggedOutPages: PageInterface[] = [
      { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
      { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
      { title: 'Signup', name: 'SignupPage', component: SignupPage, icon: 'person-add' }
    ]; */
    

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public admobFree:AdMobFree,
    public events:Events
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString("E91E63");
      splashScreen.hide();
    });
  }

  
  listenToLoginEvents() {
    this.events.subscribe('music-controls-headset-plugged', () => {
      alert("Working");
    });

/*     this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    }); */
  }

/*   enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }
 */
  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }


  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      //this.userData.logout();
    }
  }
showAd(){
  let bannerConfig: AdMobFreeBannerConfig = {
      autoShow: true,
      id: 'ca-app-pub-1527462316825728/5928560906',//id: Your Ad Unit ID goes here
  };

  this.admobFree.banner.config(bannerConfig);

  this.admobFree.banner.prepare().then(() => {
      // success
  }).catch(e => console.log(e));
}
}

