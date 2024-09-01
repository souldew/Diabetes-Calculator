https://souldew-diabetes-calculator.netlify.app/

# Diabetes-Calculator

糖尿病患者が病院で受け取る薬の量を計算するためのツールです。<br>
このツールはあくまで個人開発のツールです。<br>
本ツールの使用により生じた、いかなる損害に対しても、一切の責任を負いかねます。<br>

# 設定画面

設定項目の表記に従って基本情報を入力してください。
設定項目で指定した値は、LocalStorage に保管され、次回以降ページを開いたときに
自動で入力されるようになります。

## インスリン 1 日使用量

各時間帯で使用する即効インスリンと、持続インスリンの量を入力してください。<br>
捨てる量で空打ちする量を指定します。<br>
使用量が 0 の場合、その時間帯の空打ち量の加算も行いません。<br>
1 日使用量の項目で 1 日に実際に消費する量を確認することができます。

## 1 日使用量

1 日に使用する各機器の量を指定します。<br>
即効インスリン、持続インスリンについては、**インスリン 1 日使用量**の項目で
指定した値に基づいて値を表示します。

## 最小受け取り単位

実際に病院で受け取ることができる最小単位を入力してください。<br>
インスリンは、本数ではなく 1 本当たりの単位数を入力してください。

## その他

### 次回までの基本日数

メイン画面での次回通院日の計算に使用します。<br>
ページを開いた際に、ページを開いた日付にここで指定した日数を加算した値を、
次回通院日の初期値として使用します。

### Libre を項目に追加する

Libre を使用している人で計算に含めたい場合はチェックを ON にしてください。<br>
計算結果に Libre の項目が表示されるようになります。<br>
使用期間は 2 週間を前提にしています。

# メインページ

## 残数

通院前に残っている薬、機器の残数を入力します。<br>
設定項目同様、次回以降ページを開いたときに自動で入力されるようになります。

## 通院日（当日）・次回通院日

それぞれの日付を自動で入力しています。
当日、必要に応じて変更してください。

## 薬の予備日数

予備としてもらう薬の日数分を指定します。
次回通院日までの日数には含まれませんが、
計算結果にはここで指定した日数分を含めた量が出力されます。

# 計算結果の見方

**計算ボタン**をタップすることで、設定した値に基づいて必要な薬の量を計算します。

## 詳細必要数 - 必要数

次回通院日までに、最低限必要な薬の量を出力します。
薬の予備日数の量は含まれません。

## 詳細必要数 - 必要数+予備

次回通院日までに最低限必要な薬の量と、
指定した予備日数分を確保する場合にもらわなければならない薬の量を出力します。

## もらう量 - 正確量

**詳細必要数 - 必要数+予備**と同じ値を出力します。

## もらう量 - 概量

必要数と予備の薬の量をもらう際に、
病院側に指定できる最小単位数を考慮した値を出力します。<br>
<span style="color: red; text-decoration: underline; font-weight: bold;">主治医の方にもらう薬の量を伝える場合はここに表示される薬の量を伝えることを推奨します。</span>

## 計算結果の補足

計算結果について、残数が必要数より多い場合マイナスの値が表示されます。<br>
あまりにもマイナスの値が大きい場合は、薬をもらい過ぎなため、
もらう薬の量について調整してください。
（必要に応じて主治医に相談しましょう。）

<br>
<br>
<br>

---

<br>

# 工夫点

- Local Storage を使って人によってほぼ固定値になる値を自動入力できるようにした点
- Libre のように人によって使用しない項目はオプションとして表示の ON/OFF を設定できるようにした点
