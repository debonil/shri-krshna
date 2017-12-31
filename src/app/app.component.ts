import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, Events, Alert } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobFree,AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
//import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ChantCountPage } from '../pages/chant-count/chant-count';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ChantHistoryPage } from '../pages/chant-history/chant-history';


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
  alert: Alert;
  backButtonPressedOnceToExit: boolean;
  rootPage:any = HomePage;
    // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
  
    // List of pages that can be navigated to from the left menu
    // the left menu only works after login
    // the login page disables the left menu
    appPages: PageInterface[] = [
      { title: 'Home', name: 'HomePage', component: HomePage, tabComponent: HomePage, index: 0, icon: 'home' },
      { title: 'Chant Go', name: 'ChantCountPage', component: ChantCountPage, tabComponent: ChantCountPage, index: 1, icon: 'calendar' },
      { title: 'Chant History', name: 'ChantHistoryPage', component: ChantHistoryPage, tabComponent: ChantHistoryPage, index: 2, icon: 'list-box' },
      { title: 'About Author', name: 'AboutPage', component: AboutPage, tabComponent: AboutPage, index: 3, icon: 'information-circle' },
      
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
    public events:Events,
    public admobFree:AdMobFree,
   // private ga: GoogleAnalytics,
   public alertCtrl: AlertController,
   public toastCtrl: ToastController,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString("E91E63");
     // this.loadGoogleAnalytics();
      this.showAdBanner();
      this.registerBackButton();
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
      if(page.index!= undefined&&page.index==2)
         this.showAdInterstitial();
      if(page.index!= undefined&&page.index==3)
        this.showAdRewardVideo();

      this.nav.setRoot(page.component, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      //this.userData.logout();
    }
  }
  showAdBanner(){
    let bannerConfig: AdMobFreeBannerConfig = {
        autoShow: true,
        id: 'ca-app-pub-1527462316825728/5928560906',//id: Your Ad Unit ID goes here
        overlap : false,
    };

    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare().then(() => {
        // success
    }).catch(e => console.log(e));
  }
  showAdInterstitial(){
    let adConfig: AdMobFreeInterstitialConfig = {
        autoShow: true,
        id: 'ca-app-pub-1527462316825728/7513717693',//id: Your Ad Unit ID goes here
    };

    this.admobFree.interstitial.config(adConfig);

    this.admobFree.interstitial.prepare().then(() => {
        // success
    }).catch(e => console.log(e));
  }
  
  showAdRewardVideo(){
    let adConfig: AdMobFreeRewardVideoConfig = {
        autoShow: true,
        id: 'ca-app-pub-1527462316825728/7130574319',//id: Your Ad Unit ID goes here
    };

    this.admobFree.rewardVideo.config(adConfig);

    this.admobFree.rewardVideo.prepare().then(() => {
        // success
    }).catch(e => console.log(e));
  }
  

  /* loadGoogleAnalytics(): any {
    this.ga.startTrackerWithId('UA-111374105-1')
   .then(() => {
     console.log('Google analytics is ready now');
        this.ga.trackView('AppComponent');
     // Tracker is ready
     // You can now track pages or set additional information such as AppVersion or UserId
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
  } */

  registerBackButton(){
    this.platform.registerBackButtonAction(() => {


      //uncomment this and comment code below to to show toast and exit app
      if (this.backButtonPressedOnceToExit) {
        this.platform.exitApp();
      } else if (this.nav.canGoBack()) {
        this.nav.pop({});
      }else if (this.nav.getActive() && this.nav.getActive().component != HomePage) {
        this.nav.setRoot(HomePage);
      } else {
        this.showToast();
        this.backButtonPressedOnceToExit = true;
        setTimeout(() => {

          this.backButtonPressedOnceToExit = false;
        },2000)
      }

      /* if(this.nav.canGoBack()){
        this.nav.pop();
      }else{
        if(this.alert){ 
          this.alert.dismiss();
          this.alert =null;     
        }else{
          this.showAlert();
         }
      } */
    });
  }

  /* showAlert() {
    this.alert = this.alertCtrl.create({
      title: 'Exit?',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alert =null;
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  } */

    showToast() {
      let toast = this.toastCtrl.create({
        message: 'Press Again to exit',
        duration: 2000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    }
}

