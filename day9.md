# day9 - 基礎模組化 將上次的todolist部分模組化

#### 1.是否需要模組化
    * 重複利用
    * 分類管理功能

#### 2.為何component的data必須是function
    Vue.component('button-counter', {
        data: function () {
            return {
            count: 0
            }
        },
        template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
    })
    * 因為之前的data是物件，而物件是一個實體，若component使用物件data，各個component可能指向同一個物件，需要用function將data獨立出來，確保每一個組件有自己的資料狀態。

#### 3.props，從外層把資料分享給內層
    Vue.component('blog-post', { 
    props: ['title'],
    template: '<h3>{{ title }}</h3>'
    }) 
    * 單向原則 
    * 外層資料傳給你讓你顯示，但不能亂改 
    * 要改的話要通知外層
    * 內層 提出修改要求，而外層去執行

#### 4.$emit()方法通知外層要做什麼事
    * $emit方法傳入事件名稱來觸發一個事件
    <button v-on:click="$emit('enlarge-text')">
        Enlarge text
    </button>
    * $emit()可以帶第2個值。例如我們可能想讓<blog-post>組件決定它的文本要放大多少。這時可以使用$emit的第二個參數來提供這個值
    <button v-on:click="$emit('enlarge-text', 0.1)">
        Enlarge text
    </button>

#### 5.slot
    * 在模組內切一個區塊放slot，由外層決定內層的內容 

#### 6.is可以解決一些tag不能放客製化模組的問題
    * 有些比較嚴格的tag，會不允許內層放別的tag，像是<table>裡頭要放<tr>，<ul>裡面要放<li>，若想在內層放客製化模組，解決方法如下：
    //用is告訴tr這是個客製化模組
    <table>
        <tr is="blog-post-row"></tr> //原本應該是<blog-post-row></blog-post-row>
    </table>