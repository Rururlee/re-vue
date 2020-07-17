# day6 - 事件偵聽綁定

#### 1.function同時傳參數及接收mouseEvent
    * 接收mouseEvent的參數要加上$錢字號
     <h1 @click="clickHandler('index',$event)"></h1>
    * $event是vue內建參數
