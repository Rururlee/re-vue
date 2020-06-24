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

#### 4.不會被執行的computed
    computed: {
        now: function () {
            return Date.now()
        }
    }
    // 因為沒有來源資料
    // 雖然可做成methods，但沒有cache，它永遠會再一次執行(抓新的date)
    // date.now做在computed會抓到第一次的date

#### 5.有時候computed會比data用得還多
    是因為data有時候不會放在同個component，可能四散，為了將各地資料彙集呈現，computed使用可能就多了

#### 6.methods
    * methods可以連動或不連動，取決於有沒有用於畫面顯示:
        1.有用在畫面，會更新methods重新呼叫，反之，不會更新
        2.沒有cache

#### 7.watch
    * 沒有cache
    * 有連動概念，連動型function
    * watch比較不適合單純處裡普通資料:
        1.單純產資料用computed(例如:資料+1這種單純處理)
        2.有比較複雜的行為時候使用watch(例如:資料改變了打Api這個行為)
    * 不要濫用watch

