# 課題のリンク

* [HTML/CSS初級アウトプット課題](https://github.com/happiness-chain/practice/blob/main/005.1.1_html_css/001.2_%E5%88%9D%E7%B4%9A%E3%82%A2%E3%82%A6%E3%83%88%E3%83%97%E3%83%83%E3%83%88%E8%AA%B2%E9%A1%8C.md)

HTML/CSSのアウトプット課題について、上手くいかないところがあるため質問させていただきたいです。

## 動作確認方法

HTMLandCSS/html_css_output_beginner/index.htmlをご確認ください。

## 実現したいこと

PC表示の時もfooterのborderを横幅いっぱいに引きたい。

## 今起きていること

PC表示の時に、footerのborderが横幅いっぱいにならず、短い。

## 実際に試したこと

* containerに対して指定したmax-widthの960pxの幅になっていると考えた。max-widthをリセットするためにfooterに対し「max-width: initial;」を指定したが、見た目に変化はなかった。

* 「max-widthはインライン要素に対しては効かない」という情報を目にしたため、footerがインライン要素なのかと疑ったが、footerはブロック要素だった。

## 参考にした記事

* 「max-width initial 効かない」で検索して以下の記事を参考にしました。

  * [max-widthのリセットはautoではなくinitialを使う](https://qiita.com/skwbr/items/90654ed6bb81c2b8cdaf)
  
  * [CSSの「max-width」が効かない時に確認してほしい４つのこと](https://kouhekikyozou.com/css_max_width_error)

* 「max-width」と「border」のMDNも参考にしました。
  * [max-width](https://developer.mozilla.org/ja/docs/Web/CSS/max-width)
  * [border-width](https://developer.mozilla.org/ja/docs/Web/CSS/border-width)

## その他特記事項

footerタグ自体をcontainerクラスの外に出せば（bodyタグの直下にすれば）、containerに指定したmax-widthからは逃れられ、borderが横幅いっぱいに引くことができることはわかりました。しかし、html側を修正せずに直す方法があればと思い、質問させていただきました。

お手数をおかけしますが、よろしくお願いいたします。
