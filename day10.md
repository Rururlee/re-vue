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