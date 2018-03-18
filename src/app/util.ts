// ユーティリティ

export class Util {

  // CSVファイル読み込み(同期型)
  static readFile(pathname) {
    let request = new XMLHttpRequest();
    request.open('GET', pathname, false);  // synchronous request
    request.send(null); // bodyなし

    let result = [];
    if (request.status === 200) {
      let data = request.responseText;
      let splitdata = data.split("\n");

      let length = splitdata.length;
      for (let ii=0; ii<length; ii++) {
        let row = splitdata[ii].match(/"(\\["ntr\\]|[^"])*"|[^,]+/g);
        if (row) {
          result[ii] = row;
        }
      }
    }

    return result;
  }

  // CSV -> json 変換
  static csv2json(csvdata) {
    let result = [];

    let length = csvdata.length;
    if (length < 1) {
      return result;
    }

    let header = csvdata[0];

    for (let ii=1; ii<length; ii++) {
      let row = csvdata[ii];
      let dict = {};
      for (let jj=0; jj<row.length; jj++) {
        dict[header[jj]] = row[jj];
      }
      result.push(dict);
    }

    return result;
  }

  // シャフル設定
  static shuffle = (target) => {
    let length = target.length;
    for (let ii=length-1; ii>0; ii--) {
      let rr = Math.floor(Math.random() * (ii + 1));
      let tmp = target[ii];
      target[ii] = target[rr];
      target[rr] = tmp;
    }

    return target;
  }

}
