import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {Util} from "../../app/util";

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})

export class DetailsPage {
  question_list:{
    question : string,
    time  : number,
  }[] = [];

  images:string[] = [];

  title:string    = "カテゴリー";
  subtitle:string = "中高校生がサイコロで大人の本音を引き出し、卒業後の進路を考える";
  category:string = "";

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public loadingCtrl: LoadingController
  ) {}

  // ページがロードされた
  ionViewDidLoad() {
    let loading = this.loadingCtrl.create();
    loading.present();

    const index   = this.navParams.get('index') + 1;
    this.category = this.navParams.get('category');

    this.images.length = 0;
    let no:string = index;
    for (let ii:number = 0; ii<6; ii++) {
      let value:string = "assets/images/icon/second_" + no + (ii+1) + ".png";
      this.images.push(value);
    }

    // questionファイル読み込み
    let csvdata  = Util.readFile("assets/question/question.csv");
    let jsondata = Util.csv2json(csvdata);
    this.getDetail(index, jsondata);

    loading.dismiss();
  }

  // カテゴリー設定
  getDetail = (category_index:number, category_list) => {
    // categoryの番号でフィルター
    let target_categories = category_list.filter(
      function(item, index) {
                    if (item.category == category_index)
                      return true;
    });

    // 質問をランダムにシャッフル
    target_categories = Util.shuffle(target_categories);

    // QAリスト作成(最大6個)
    let count =  Math.min(6, target_categories.length);
    for (let ii:number=0; ii<count; ii++) {
      let question = target_categories[ii]["question"];
      let time     = target_categories[ii]["time"];
      this.question_list.push({"question": question, "time": time});
    }
  }
}

