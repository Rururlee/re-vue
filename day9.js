
//filter-component和input-component模組都是內部打事件叫外部 觸發事件

//部分html模組化
Vue.component('filter-component', {
    data() {
        return { //return出這個物件
            buttonList: [
                { text: '全部', value: 'all' },
                { text: '未完成', value: 'open' },
                { text: '完成', value: 'doen' },
            ]
        }
    },
    template: `
                <p>
                    <button v-for="item of buttonList" :key="item.text" @click="$emit('filter',item.value)">
                        {{ item.text }}
                    </button>
                </p>
            `
    //$emit('filter',item.value) 解釋為打事件(filter)，順便帶資料(item.value)，通過第二個參數知道
})

// 1. input部分模組化 - 外到內的方式(inputText屬於外部的，inputText就是輸入框輸入的值)
Vue.component('input-component', {
    props: ['value'],//要接外面的資料。外面綁v-model，裡面這裡要接v-model資料
    data() {
        return {
            //輸入法狀態
            //此模組的事件用到的資料  
            compositionStatus: false
        }
    },
    //模板上的事件也要切進來
    //組件的v-model，是綁value和input事件(不寫v-model)
    //v-bind:value="value"，這個引號裡的value要綁上面props的值
    //模板裡的input，是使用者打字要更新出去的動
    //而input-push則是將打的字按enter後的動作
    template: `
                <p>
                    <input type="text" 
                        v-bind:value="value"
                        v-on:input="$emit('input', $event.target.value)"
                        @compositionstart="cstartHanlder" 
                        @compositionend="cendHanlder"
                        @keydown.enter="inputHandler">
                </p>
            `,
    methods: {
        cstartHanlder() {
            this.compositionStatus = true
        },
        cendHanlder() {
            this.compositionStatus = false
        },
        inputHandler() {
            if (this.compositionStatus) return false
            //推資料進list(包成object,不建議用陣列放一般資料，文字、數字基本資料)
            // 模組化後，this.list.push事件要改用$emit，因為list是在外層，不屬於input模組的東西
            // this.list.push({
            //     timestamp: new Date().getTime(),//作為key使用
            //     status: false,//預設false,表示事項未完成
            //     content: this.inputText
            // })
            // //推進去後input清掉資料
            // this.inputText = ''

            //改用$emit，因為list是外層的資料
            this.$emit('input-push')
        }
    }
})

// 2. input部分模組化 - 內到外的方式(inputText屬於內部的，inputText就是輸入框輸入的值) 偏好2的寫法
Vue.component('input-component2', {
    data() {
        return {
            //輸入文字
            inputText: '',
            compositionStatus: false
        }
    },
    template: `
                <p>
                    <input type="text" 
                        v-model="inputText"
                        @compositionstart="cstartHanlder" 
                        @compositionend="cendHanlder"
                        @keyup.enter="inputHandler">
                </p>
            `,
    methods: {
        cstartHanlder() {
            this.compositionStatus = true
        },
        cendHanlder() {
            this.compositionStatus = false
        },
        inputHandler() {
            if (this.compositionStatus) return false
            this.$emit('input-push', this.inputText) //多帶上這個模組綁定的inputText
            this.inputText = ''
        }
    }
})

// 顯示列表模組化
// 重點：item.timestamp,item.status,item.content
// 1方式：傳物件，無法限制動不動物件。怕協作的人動到物件，就失去單向資料流的意義，所以用2較好
// 2方式：傳單筆資料
Vue.component('list-item-component', {
    data() {
        return {
            //修改內容
            editingText: ''
        }
    },
    props: ['item', 'editing'],//要接外面的資料。

    // 完成，應該通知外面做，所以用$emit
    // 取消，可以在裡面做掉
    // v-model="item.status" 改成  v-model="status"
    template: `
                    <li><template v-if="editing === item">
                            <input type="text" v-model="editingText">
                            <button @click="completeHandler">完成</button>
                            <button @click="cancelHandler">取消</button>
                        </template>
                        <template v-else>
                            <input type="checkbox" v-model="status">
                            {{ item.content }}
                            <button @click="editHanlder(item)">修改</button>
                            <button @click="deleteHandler(item)">刪除</button>
                        </template>
                    </li>
            `,
    computed: {
        // 因不想動到item這個物件的資料，所以用computed重新包裝這個資料，
        // 使用物件型事件，這個原理來自Object.defineProperty()
        // Object.defineProperty() 會直接對一個物件定義、或是修改現有的屬性。執行後會回傳定義完的物件。
        // Object.defineProperty對屬性做get和set的function
        status: { //這是上面v-model綁定的status
            get() {
                console.log(this.item.status)
                return this.item.status
            },
            set(value) {
                // 事件通知出去，我要change狀態
                // $emit可以傳送多個參數
                console.log('this.item:', this.item)
                console.log('value:', value)
                this.$emit('change', this.item, value)

            }
        }
    },
    methods: {
        //下面這三個方法都是打事件去“提醒外部vue“的三個方法做事情
        deleteHandler(item) {
            //提醒外面的deleteHandler做事
            this.$emit('delete', item)
        },
        editHanlder(item) { //原本傳index，現改用item

            //原寫法：用index
            // this.editing = index
            //editing塞進所選中的那筆物件資料

            // 打事件叫外部做事
            this.$emit('edit', item)
            // this.editing = item 這是外部要做的事

            //此時已經可以抓到editing裡的content
            this.editingText = item.content
        },
        completeHandler() {
            //能成功抓到editing.content，是因為在editHanlder時，已經為editing塞進物件資料，
            //所以這裡可以抓到edition裡的content
            console.log('inputComponent - editingText : ', this.editingText)
            this.$emit('complete', this.editingText)
            // this.editing.content = this.editingText 這是外部要做的
            this.cancelHandler()
        },
        cancelHandler() {
            this.editingText = ''
            this.$emit('cancel')
        }
    }

})



new Vue({
    el: '#app',
    data: {
        // 由於模組了input部分。因此原本外層vue的inputText有兩種想法
        // 1.inputText屬於外面這層，直接綁進去input-component(外到內) 範例做這個
        // 2.inputText屬於input-component，應該做在模組裡(內到外)
        inputText: '',
        list: [],
        // 由於模組了input部分，compositionStatus: false屬於input模組裡[事件]的資料，所以要放進模組
        // compositionStatus: false, // 預設false,表示還沒開始輸入法的輸入
        editing: null,
        editingText: '',
        show: 'all'
    },
    computed: {
        filterList() {
            //all全部,open未完成,done完成
            if (this.show === 'all') {
                return this.list
            } else if (this.show === 'open') {
                return this.list.filter((item) => {
                    //filter(item)，item為自訂名稱，自動抓list陣列裡的每筆資料
                    return item.status === false
                })
            } else {
                return this.list.filter((item) => {
                    return item.status === true
                })
            }
        }
    },
    methods: {
        //模組用事件
        filterHandler(value) {
            //這個事件會打一個item.value出來($emit那裡帶上的)
            //所以讓外層vue的show等於帶上的值(all/open/done)
            this.show = value
        },
        //之前的inputHanlder所有的資料都是我們自己掌握，事件我們自己處理
        //而這個inputHanlder前面已經有東西幫我們攔一層了
        //所以這裡要做的事情只有當初的某些部分，資料的處理
        inputHandler() {
            this.list.push({
                timestamp: new Date().getTime(),//作為key使用
                status: false,//預設false,表示事項未完成
                content: this.inputText
            })
            //推進去後input清掉資料
            this.inputText = ''
        },
        //偷懶先用index 
        deleteHandler(item) {

            //這裡改用filter寫
            //filter可以用不同key值、不同內容做篩選條件(timestamp也可以做篩選條件)
            this.list = this.list.filter((target) => {
                //target就是物件其中一筆資料，名稱這邊自取(含content/status/timestamp)
                //target不等於item才留下來(取得不等於index的i資料)
                console.log('target === ', target)
                console.log('item === ', item)
                return target != item //deleteHandler(item)的item，就是被選中的要刪掉的某項item資料
            })

            //這裡不用splice，篩選後用index去對照，刪除資料會刪錯筆資料
            //this.list.splice(index, 1)
        },
        editHanlder(item) { //原本傳index，現改用item

            //原寫法：用index
            // this.editing = index

            //editing塞進所選中的那筆物件資料
            this.editing = item

            //此時已經可以抓到edition裡的content
            this.editingText = this.editing.content
        },
        completeHandler() {
            //能成功抓到edition.content，是因為在editHanlder時，已經為editing塞進物件資料，
            //所以這裡可以抓到edition裡的content
            this.editing.content = this.editingText
            this.cancelHandler() //要清空，上面我自己寫的忘了清空
        },
        //lsit-component模組用的completeHandler
        completeHandler2(value) {
            this.editing.content = value
            this.cancelHandler() //要清空，上面我自己寫的忘了清空
        },
        cancelHandler() {
            this.editingText = ''
            this.editing = null
        },
        //這個模組的資料會打出來，value去接它
        input2Handler(value) {
            this.list.push({
                timestamp: new Date().getTime(),
                status: false,
                //上面的inputHandler是放this.inputText，那是因為他用的input是綁定vue實體的inputText
                //而這裡是模組裡綁定的inputText
                content: value
            })
            //清空值要去模組裡的inputText
        },
        changeHandler(item, value) {
            item.status = value
        }

    }
})

