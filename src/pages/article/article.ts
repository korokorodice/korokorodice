import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the ArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {
    title:string    = "質問タイム";
    subtitle:string = "中高校生がサイコロで大人の本音を引き出し、卒業後の進路を考える";
    category:string = "";

    question:string = "";

    timeLeft: number = 60;
    timeId: number = null;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController
    ) {
    }

  // ページがロードされた
    ionViewDidLoad() {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.question = this.navParams.get('question');
        this.timeLeft = this.navParams.get('time');
        this.category = this.navParams.get('category');

        loading.dismiss();

        this.timeId = setTimeout(this.counter, 1000);
    }

    // ページが非アクティブになる直前
    ionViewWillLeave() {
      if (this.timeId) {
        clearTimeout(this.timeId);
        this.timeId = null;
      }
    }

    // カウンター (タイムアウト)
    counter = () => {
      // カウントダウン
      this.timeLeft--;

      // beep音再生
      if (this.timeId && this.timeLeft == 0) {
        new Audio("assets/audio/beep.wav").play();
      }

      // 次のタイマー起動
      this.timeId = setTimeout(this.counter, 1000);
    }

    // タイマー延長
    extendedTime = () => {
      this.timeLeft += 10;
    }
}
