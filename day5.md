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
    * 一開始的量很大的話用v-if，但是切換頻率要小
    * v-if為不立即做，因為他還得先經過true/false的判斷
    * 不立即做的話，在切換機率不高的地方，就可以省資源

    [v-show]
    * v-show則是控制style，元素還留在dom上(打開f12在html可看到被display:none的元素)
    * 切換頻率高用v-show
    

#### 5.v-show 不支援使用 template

#### 6.List rendering
    * 可依照陣列、物件、數量render
    * 數量多用陣列包裝資料；用物件的話，有時候後端傳過來資料，key比較不容易掌控

#### 7.綁定key
    * v-for有切換行為時建議設key值
    * key必須設置為專屬於這筆資料的內容，不要設index為key，index只是順序
    * 兩筆資料可能因為順序不同所以資料不同。用內容去當key，去做比對判斷比較準
    * 後端若資料回有id(或primary)，要請後端帶上這個值，讓我們在v-for時可以以這個值設key

#### 8.想改變array需用以下方法(這個在vue 2才有的問題,vue3沒有)
    push()
    pop()
    shift()
    unshift()
    splice()
    sort()
    reverse()

#### 9.陣列無法透過操作index去修改資料
    例如：array[0] = {name:ruru}

#### 10.一個tag上不要同時做v-for和v-if，這會耗費資源
    * 如果需要全部列出來，再去做隱藏，用v-for配v-show
      v-for跑全部資料，v-show控制顯示隱藏
    * 不要用v-for，再用v-if做篩選顯示隱藏
    * 但不同層級是可以的，不要做在同一層就好
    * v-for搭配v-show太麻煩的話，直接做computed去做篩選

    <h4 v-for="value of getUserGender">{{ value.name }}</h4>

    //data
    serListArray: [
          {
            name: 'Ruru',
            gender: 'female'
          },
          {
            name: 'Brain',
            gender: 'male'
          },
          {
            name: 'Jack',
            gender: 'male'
          }
    ],

    //computed
    //要做出只顯示性別為男生的資料
    getUserGender() {
        return this.userListArray.filter((user) => {
            return user.gender === 'male'
        })
    }
    