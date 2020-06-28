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

#### 4.要讓後端控制樣式用 class，選取的方式

#### 5.用物件綁定 class 比較好控管
