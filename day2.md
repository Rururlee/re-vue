# day2

#### 1.vue 不完全是 mvvm ，但大部分是受到 mvvm 啟發

#### 2.將自己當成 v-model 角色去貫穿、串聯 model 跟 vue

#### 3.MVVM: Model -> ViewModel -> View

#### 4.靠限縮功能控制效能，效能指時間或有沒有佔記憶體空間。Object.freeze 有時也有省效能，但專案不要亂用

#### 5.拿 Vue 的東西盡量靠 vue 去拿。e.g.:vm.\$el 拿綁定的 div，而不是 document.querySelector('#app')

#### 6.vm.$data的$錢字號是要做區別，預設代表 vue 提供的功能，沒有特別的意思

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

### mount]

 | 上到畫面了，但此時還抓不到網頁的元素(getElementById 等)

### beforeDestroy

 | 模組要被消滅之前做的事 \*自己做 addEventListener 要在這裡就關掉，否則會殘留
