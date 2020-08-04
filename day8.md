# day8 - 第一季總回顧 - 用CRUD實作todolist

#### 1.CRUD
    * Create / Read / Delete / Update

#### 2.@keyup.enter
    * 在mac版會發生輸入法的enter也會觸發key，所以暫用按鈕做輸入，不用enter輸入

#### 3.不該使用index作為key對照資料的情境
    * index是佔位排序，所以當有做到篩選或排序(重新排序)的功能，會有動錯資料的風險，例如：想修改或刪除第二筆資料卻是修改/刪除了第一筆