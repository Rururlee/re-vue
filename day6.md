# day6 - 事件偵聽綁定

#### 1.function同時傳參數及接收mouseEvent
    * 接收mouseEvent的參數要加上$錢字號
     <h1 @click="clickHandler('index',$event)"></h1>
    * $event是vue內建參數
#### 2.Event Modifiers
    * 經常使用的event.preventDefault() or event.stopPropagation()，vue提供了更好的方法讓我們使用在directives上
    <a v-on:click.stop="doThis"></a>
    <a v-on:click.stop.prevent="doThat"></a>
    * 可用的event modifiers
    .stop  //不監聽下一個元素
    .prevent //不執行預設事件
    .capture //由外到內的監聽
    .self //執行自己
    .once //執行一次
    .passive

#### 3.巢狀結構時候適合使用.self
    * @click.self當點擊為自己時
    一段巢狀結構的div：
    <div @click.self="nestClick">
        <a href="#">
            <button>aaa</button>
        </a>
    </div>
    nestClick(event){
        console.log(event.target) 
    }
    * 這樣點擊時event.target才會抓到設＠click的div，而不是抓到button的target
    

#### 4.在@click能用的指令有限(有白名單)
    * 不能直接使用console.log

#### 5.@click.capture 偵聽為由外到內(預設是冒泡的由內到外)
    <div @click.capture="nestClick(1)">
      <a href="#" @click="nestClick(2)">
        <button @click="nestClick(3)">button</button>
      </a>
    </div>
    // 1
    // 3
    // 2

    * 加上.stop就不會偵聽下個元素
    <div @click.stop="nestClick(1)">
      <a href="#" @click="nestClick(2)">
        <button @click="nestClick(3)">button</button>
      </a>
    </div>
    // 1

#### 6.@click.capture 偵聽為由外到內(預設是冒泡的由內到外)

#### 7.偵聽keyCode
    * 以往使用keycode的偵聽按鍵，但由於各瀏覽器key有些不相容，所以vue提供的方法可相容key監聽
    * 欲使用ctrl放開的監聽，要使用@keyup.17。不是 ~~@keyup.ctrl~~