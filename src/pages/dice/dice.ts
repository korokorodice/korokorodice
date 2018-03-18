import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dice',
  templateUrl: 'dice.html',
})
export class DicePage {

  title:string    = "サイコロを振る";
  subtitle:string = "中高校生がサイコロで大人の本音を引き出し、卒業後の進路を考える";

  timeId: number = null;
  timeCount: number = null;

  image_dice:string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.timeCount = 40;
    this.image_dice = "assets/images/icon/first_1.png";
  }

  // カウンター (タイムアウト)
  counter = () => {
    let index = Math.floor(Math.random() * 6) + 1;
    this.image_dice = "assets/images/icon/first_" + index + ".png";

    if (this.timeCount > 0) {
      this.timeId = setTimeout(this.counter, 30);
      this.timeCount--;
    }
  }

  // サイコロを振る
  shakeDice = () => {
    this.timeCount = 30;
    this.timeId = setTimeout(this.counter, 30);
  }

}
