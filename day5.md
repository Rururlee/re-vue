# day5 - 條件渲染與列表渲染

#### 1.v-if / v-else需緊緊相依」
    <h1 v-if="show">Hello vue</h1>
    <h1 v-else>xxx</h1>

#### 2.v-if初學 vs 進階寫法 ---> template 包起來
    * 初學
    <h1 v-if="show">Hello vue</h1>
    <h1 v-if="show">description</h1>

    * 進階
    <template v-if="show">
        <h1 v-if="show">Hello vue</h1>
        <h1 v-if="show">description</h1>
    </template>
    <template v-else>
        <h1 v-if="show">xxx</h1>
        <h1 v-if="show">ooo</h1>
    </template>

#### 3.如果是做比較多的使用者互動時，優先使用v-show
    如：移進去打開、移走關掉，按開按關這種顯示隱藏。
    * v-show是使用display控制
    * 是dom渲染時，比較後期的操作，做的事情會比較少
    * tab切換、輪播也傾向用v-show

#### 4.v-if VS v-show
    [v-if]
    * v-if是拔dom，元素會真正從dom上消失
    * 一開始的量很大，用v-if，但切換頻率要小
    * v-if為不立即做，因為他還得先經過true/false的判斷
    * 不立即做的話，在切換機率不高的地方，就可以省資源

    [v-show]
    * v-show則是控制style，元素還留在dom上(打開f12在html可看到被display:none的元素)
    * 切換頻率高用v-show
    

#### 5.v-show 不支援使用 template

#### 6.List rendering
    * 可依照陣列、物件、數量render
    * 數量多用陣列包裝資料；用物件的話，有時候後端傳過來資料，key比較不容易掌控
