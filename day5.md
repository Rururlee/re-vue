# day5 - 條件渲染與列表渲染

#### 1.v-if / v-else需緊緊相依」
    <h1 v-if="show">Hello vue</h1>
    <h1 v-else>xxx</h1>

#### 3.v-if初學 vs 進階寫法 ---> template 包起來
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