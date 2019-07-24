import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdimaProvider } from '../../providers/adima/adima';
import { LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { HomePage } from '../home/home';
import { ListPage } from '../list/list';
import { SignupPage } from '../signup/signup';

declare var firebase;
/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
email;
password;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public alertCtrl: AlertController,public adima :AdimaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  gotoRegister(){
    this.navCtrl.push(SignupPage)
  }

  SignIn(email: string, password: string) {
    if(email == "" || password== "" || email == null || password == null  ){
      console.log('error')
    }
    else{
      console.log(email, password)
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Signing in...',
        duration: 40000
      });
      loading.present();
      this.adima.SignIn(email, password).then((user: any) => {
        this.adima.checkVerification().then((data: any) => {
          if (data == 0) {
            const alert = this.alertCtrl.create({
              cssClass: "myAlert",
              subTitle: "We have sent you a verification mail, Please activate your account with the link in the mail",
              buttons: ['OK'],
            });
            loading.dismiss()
            alert.present();
          }
          else if (data == 1) {
            loading.dismiss()
            this.navCtrl.setRoot(ListPage);
          }
        })
      }).catch((error) => {
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          subTitle: error.message,
          buttons: ['OK'],
        });
        loading.dismiss()
        alert.present();
      })
    }

  }




  forgotpassword(PlaceObject: object) {
    return new Promise((resolve, reject) => {
      if (this.email == null || this.email == undefined) {
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          title: 'Forgot your password?',
          message: "We just need your registered email address to reset your password.",
          inputs: [
            {
              name: 'email',
              type:'email',
              placeholder: 'Your email address'
            },
          ],
          buttons: [
            { 
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Send',
              handler: data => {
                console.log('Saved clicked');

                this.adima.forgetPassword(data.email).then(()=>{
                  console.log("forgot password works");
                  const alert = this.alertCtrl.create({
                    cssClass: "myAlert",
                    title: 'Confirmation',
                    subTitle: "Please check your email to reset your password",
                    buttons: ['OK']
                  });
                  alert.present();
                }, Error => {
                  const alert = this.alertCtrl.create({
                    cssClass: "myAlert",
                    subTitle: Error.message,
                    buttons: ['OK'],
        
                  });
                  alert.present();
                  resolve()
                });
              }
            }
          ],
        });
        alert.present();
      }
      else if (this.email != null || this.email != undefined) {
        firebase.auth().sendPasswordResetEmail(this.email).then(() => {
          const alert = this.alertCtrl.create({
            cssClass: "myAlert",
            title: 'Password request Sent',
            subTitle: "We've sent you and email with a reset link, go to your email to recover your account.",
            buttons: ['OK'],

          });
          alert.present();
          resolve()
        }, Error => {
          const alert = this.alertCtrl.create({
            cssClass: "myAlert",
            subTitle: Error.message,
            buttons: ['OK'],

          });
          alert.present();
          resolve()
        });
      }
    }).catch((error) => {
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        subTitle: error.message,
        buttons: [
          {
            text: 'OK',
            handler: data => {
              console.log('Cancel clicked');
            }
          }
        ],
      });
      alert.present();
    })
  }

}
