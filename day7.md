# day7 - 雙向資料綁定
#### 用在福利中心的地址

#### 1.checkbox用boolean去判斷
    * 有資料就是true，沒資料或0就是false
    
#### 2.checkbox做多選時
    * data的部分要做陣列，這樣當勾選時，會自動塞資料進陣列
    * 先勾選的項目會在陣列前面，因此能有排序排名的功能。例如：讓使用者勾選喜愛的項目，可以透過陣列知道第一筆資料就是使用者第一喜愛的項目。
    * 搭配form表一定要綁name，不要只寫value，但如果純api打不一定要name，因為已經有資料綁定

#### 3.form表取value預設是字串
    * 要注意轉型的問題
    * 例如：傳進後端的值要是數值，取form表的value是字串，要記得轉成數值

#### 4.v-model也可以加上修飾符
    * v-model.number，那麼資料型態會是數值
    * v-model.trim為去頭尾空白


#### 5.v-model綁定的tag有value值時
    * 在radio等有value屬性的tag上，那麼v-model會帶進value值
    * select tag上，v-model會帶進option所選的value
    * checkbox則是跟true/false有關係，跟value沒關係
    
#### 6.select
    * 如果為必填項目，option tag上要加上disabled，才能讓使用者不選擇第一項資料，第一項資料通常是放'請選擇'字樣
    * 不是必選的選項不要放disabled

#### 7.所有tag都可觸發focus和blur事件
    * tag上戴上tabIndex指示該元素是否可以聚焦，以及是否可透過鍵盤導航(通常是tab鍵)
    * blur監聽放開後
    <div tabIndex="1"></div>
    document.querySelector('div').addEventListener('blur', function () {
            console.log('blur')
    }

#### 8.checkbox能指定當true/false時要傳什麼資料
    * 使用情境：當打api，遇到後端要求true/false傳xxx資料時，可用這個方法，快速又方便
    * tag上可加上true-value="後端要求的資料" false-value="後端要求的資料"
        <input type="checkbox" v-model="toggle" true-value="yes" false-value="no">
        // 當選中時
        vm.toggle === 'yes'
        // 當沒有選中時
        vm.toggle === 'no'
    * true-value/false-value不會操作value值，若要確保兩個值中的一個值能夠被傳出去的話，要用radio input，如下：
        <input type="radio" v-model="pick" v-bind:value="a">

#### 9.v-model.lazy
    * 當綁定有加上lazy的tag，在資料輸入完當下不會連動更新其他資料，而是焦點離開該tag才觸發其他地方更新資料
    // input和textarea綁定同個資料text
    // 在加上lazy的input輸入資料後，當焦點離開該tag才觸發textarea的更新
    <input type="text" v-model.lazy="text">
    <textarea v-model="text"></textarea>
    * 適用情境：
        - 這個值需要被高消耗量的檢查，例如打api。檢查帳號有沒有重複
        - 當焦點離開觸發了資料更新時，可以watch這個資料去做api的檢查


#### 10.v-model可以掛在客製化component
    * 之後章節會提到

#### 11.alex題外
    * 教學的demo不要100%拿去專案用
    * 基本上操作資料都加在form裡，會比較好
    * 單純要做按鈕不要用a，那用button就好