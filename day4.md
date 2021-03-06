# day4 - 屬性綁定

#### 1.從前是畫面驅動畫面，現在前端則是資料驅動畫面

    | 綁定屬性可透過資料驅動畫面，而資料可從後端資料庫傳來
    | 形成讓資料庫去改變畫面，讓非工程師人員可透過後台設定以驅動畫面

#### 2.綁定可用物件或是陣列

    | 單筆資料:假設一段a tag
    * <a href="" target=""> content </a>
    * 物件裡可有 href、target、content
    link{
        href:'https://google.com',
        target:'_blank',
        content:'google'
    }

    | 多筆資料則可用陣列

#### 3.任何 tag 上的屬性都能綁定 v-bind

    | e.g. href、target、input 的 type 等等
    | 在屬性前綁上v-bind即可 (v-bind:href)
    | v-bind縮寫為冒號: (:href)
    ｜有冒號就是綁定、連動資料的意思

#### 4.要讓後端控制樣式用 class，選取的方式

#### 5.可用物件、陣列綁定 class

    | 物件綁定:
        * 最推薦做法
        * 給個key，後面的value可表示要或不要添加這個class(true/false)
        * 新增key比較麻煩
        * 比陣列型靈活一點

    | 陣列綁定:
        * 陣列則是可以表示有哪些class，但不能控制要或不要
        * 不要某個class時，只能刪掉，被刪掉的class要加回來比較麻煩
        * 任意加class很方便

#### 6.可用 computed 控制 class

#### 7.如果有個常駐的 class，不要寫在 vue，直接寫在 class 上就好

    * 假設一個永遠在的class -> d-flex，直接寫死在class就好
    * <p class="d-flex" :class="classItem"></p>

#### 8.綁定 style

    * 若:style與普通style同在一個tag
        (1)style在前，v-bind:style在後，v-bind會覆蓋普通style
        (2)v-bind:style在前，style在後，兩個style會保留(但是同樣的style時，優先保留綁定的style)


#### 9.fontSize 做成資料時不要帶 px，render 再帶

    <div :style=""{ color:activeColor,fontSize:fontSize + 'px'}>
        data:{
            activeColor:'red'
            fontSize:30 //這部分才可以做運算
        }

#### 10.物件型 style

    <div v-bind:style="styleObject"></div>
    data: {
        styleObject: {
            color: 'red',
            fontSize: '13px'
        }
    }

#### 11.陣列型 style

    <div :style="[styleArr1,styleArr2]"></div>
    * 若有相同style，後者會覆蓋前者
