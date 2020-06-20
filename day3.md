# day2

#### 1.vue 不完全是 mvvm ，但大部分是受到 mvvm 啟發

#### 2.將自己當成 v-model 角色去貫穿、串聯 model 跟 vue

#### 3.MVVM: Model -> ViewModel -> View

#### 4.靠限縮功能控制效能，效能指時間或有沒有佔記憶體空間。Object.freeze 有時也有省效能，但專案不要亂用

#### 5.拿 Vue 的東西盡量靠 vue 去拿。e.g.:vm.\$el 拿綁定的 div，而不是 document.querySelector('#app')

#### 6.vm.$data的$錢字號是要做區別，預設代表 vue 提供的功能，沒有特別的意思

#### 7.lifecycle hook 沒有非同步的概念。也不要嘗試中斷 lifecycle

#### 8.不要用箭頭函式做 hook

    因為在vue的function會需要this，但當用箭頭函式就沒有自己的this(會變外層的this)

#### 9.Vue.js uses an HTML-based template

#### 10.在 template 語法裡允許使用 js 表達式

#### 11.instance & template
    1.html template + el option
    //下面兩種是不想要template寫在html上
    2.el option + template option 
    3.template options(selector) + vm.$mount
    

#### 12.vue 有全域變數白名單

    *不是所有的JS功能，不是所有的全域參數都能在vue用
    *能用的全域變數不多
    *不要太依賴全域參數

# Directives

    指令，放在html標籤上，e.g. v-bind/v-html等

# v-once

    | 資料render過一次後，不用再通知它了，就是當資料改變時，該標籤的內容不連動
    | 例如；copyright，是不太會再去變動的資料
    | 考慮那些資料不連動，省效能

# Raw HTML - v-html

    | 它會把內容取代掉
    | 也可用在像noscript的效果
    | 盡可能不要使用v-html，它可能產生 XSS 攻擊
    | 使用者輸入資料不要用v-html

    ****使用者輸入這端，用特定標籤去定義這段是甚麼(是圖片、文字..等)，進到後台之後，針對這個標籤去做轉移

# Data and Methods

    1.當Vun instance被開啟時候，它會去把data所有找到的屬性去做驅動化
    2.data === vm.$data，從console去操作，可發現vm.$data是跟data一樣東西

# lifecycle

    *盡量用 vue 去綁定事件
    *這些 hook 都可做在 option 裡面

### beforeCreate

    | beforeCreate

### create

    | 確定有 el 或 template

### beforeMount

    | html 都準備好了，準備要放到對應的 el
    | lightbox 會應用到，先把 lightbox new 好，等使用者用到時再 mount 出來

### mount

    | 上到畫面了，但此時還抓不到網頁的元素(getElementById 等)

### beforeDestroy

    | 模組要被消滅之前做的事，自己做 addEventListener 要在這裡就關掉，否則會殘留
