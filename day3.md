# day3

#### 1.Computed Properties
    * 簡單的計算可以放在template
    * 太過複雜且重複使用的計算放computed
    * 可使用computed時機，需要資料產生資料的時候：
        1.資料來源是個資料
        2.某個資料變動了而產生了另一個資料
    * 裡面一定會至少有一個是vue的連動資料，可能從data、store或者其他的computed來

#### 2.使用computed和methods區別
    * 兩個方式優先選擇computed
    | computed
        * computed看作為屬性，操作上就像讀變數、參數一樣
        * computed可以很直觀知道這是一筆資料，有內容的參數
    | methods
        * 用呼叫的方式，e.g. funName()，computed不用括號()

#### 3.computed有cache
    * 原始資料沒有變動，直接cache給使用者原始資料。效率高
    * 若使用者有更新資料，跟cache時間搭不上的話就重算一次，然後將資料給使用者

