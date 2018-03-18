import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Platform } from 'ionic-angular';
import { Util } from '../../app/util';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  category_list:{
    "no" : number,
    "category" : string
  }[] = [];

  images:string[] = [
    "assets/images/icon/first_1.png",
    "assets/images/icon/first_2.png",
    "assets/images/icon/first_3.png",
    "assets/images/icon/first_4.png",
    "assets/images/icon/first_5.png",
    "assets/images/icon/first_6.png",
  ];

  title:string    = "";
  subtitle:string = "中高校生がサイコロで大人の本音を引き出し、卒業後の進路を考える";
  category:string = "トップページ";

  constructor(
      public navCtrl: NavController,
      public loadingCtrl: LoadingController,
      public platform: Platform
  ) {}

  // ページがロードされた
  ionViewDidLoad() {
    let loading = this.loadingCtrl.create();
    loading.present();

    // カテゴリファイル読み込み
    let csvdata  = Util.readFile("assets/question/category.csv");
    this.category_list = Util.csv2json(csvdata);

    loading.dismiss();
  }
}
