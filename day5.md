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

#### 3.如果是做比較多的使用者互動時->v-show
    例如：移進去打開、移走關掉，按開按關這種顯示。
    使用v-show去做功能
    * v-show是使用display控制
    * 是dom渲染時，比較後期的操作