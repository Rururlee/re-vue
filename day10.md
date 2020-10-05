# day10 - 組件封裝與資料傳遞

#### 1.component的命名
    * cli時可用PascalCase首字大寫的駝峰式
    * 一般html時用Kebab-case(單字與單字間使用連接符號)

#### 2.component一定要在new Vue前註冊

#### 3.vue提供兩種component註冊方式的原因
    * 主要在控管最後bundle出來的容量大小
    * 若都用全域，容量會太大。所以要依情況去註冊component
    * 全域註冊：泛用的模組(客製input、客製form表)，使用全域
    * 區域註冊：某些頁面特定的元件

#### 4.模組分級
    * 基礎模組
    * 進階模組
    * vue提供使用require.context來全局導入基礎組件(官方文件有程式碼)

#### 5.tag上的資料不使用v-bind，資料會被視為字串
    * 即使是放物件或陣列，也被視為字串

#### 6.props的資料不建議是物件或陣列
    * 因為會輕易可控制這個傳進來的資料，進而影響到外面的資料。顧名思義不建議修改傳進來的資料

#### 7.component props資料寫法有多種
    * props: {
        // 1.基礎的類型檢查 (`null` 和 `undefined` 會通過任何類型驗證)
        propA: Number,
        // 2.多個可能的類型
        propB: [String, Number],
        // 3.必填的字符串
        propC: {
        type: String,
        required: true // 必填
        default: undefined // default 和 required要擇一，因為必填的話不需要預設值
      },
    * 傾向第三種，將資料包在一塊的方式
    * default預設一般放undefined，除非特殊需求，例如：輪播的話，預設為0(起始圖片為第一張)
    * 預設值若為陣列或物件，那default要放function
    propE: {
        type: Object,
        default: function () {
            return { message: 'hello' }
        }
    },

#### 8.validator可作傳入資料的驗證
     str: {
        type: String,
        default: undefined,
        validator: function (value) {
            // 這個值必須匹配二級字符串中的一個
            return ['success', 'warning', 'danger'].indexOf(value) !== -1
        }
    }

#### 9.prop會在組件創立之前進行驗證
    * default和validator無法操作到data或computed這些在created之後產生的東西

#### 10.template若沒宣告props時
    <input-component checked></input-component>
     const InputComponent = {
            template: `<input type="checkbox">`,
    }
    * 若給component的tag綁定屬性checked，會讓這個checked傳進第一層的地方(input)

#### 11.component綁定class很聰明
    <input-component checked class="AAA"></input-component>
     const InputComponent = {
            template: `<input type="checkbox" class="BBB">`,
    }
    * 兩個class會合併
    * dom會顯示<input type="checkbox" class="BBB AAA" checked="checked">

#### 12.input若包上label的情況處理
    const InputComponent = {
            template: `<label>
                <input type="checkbox" class="BBB">
            </label>`,
            inheritAttrs: false // 不繼承
    },
    * 加上inheritAttrs: false，這樣就不會讓外層label的屬性(class=AAA)降到下一層
    * 但此時checked會變空值，解決方法在第13

#### 13.加上inheritAttrs: false，checked變空值的解決方法
    * template加上$attrs
      template: `<label>｀                                    
          <input type="checkbox" v-bind="$attrs" class="BBB">
      </label>`,                                             
    * tag上checked要賦予值，<input-component checked="checked" class="AAA"></input-component>

#### 14.$refs可以抓取vue生成的dom