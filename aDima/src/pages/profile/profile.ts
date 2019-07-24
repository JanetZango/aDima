import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdimaProvider } from '../../providers/adima/adima';



declare var firebase;
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  arr = new Array();
  requestArr = new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams, public dima: AdimaProvider) {

    let userID = firebase.auth().currentUser;
    firebase.database().ref("App_Users/" + userID.uid).on('value', (data: any) => {
      let details = data.val();
      console.log(data.val());
      this.arr.push(details);
      console.log(this.arr)
    });

    this.dima.retriveRequest().then((data:any) => {
      this.requestArr = data
      console.log(this.requestArr)
    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
