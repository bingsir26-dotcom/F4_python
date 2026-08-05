# 第 46 課：基本 OOP——用物件描述角色與事物

> **本課主題：認識 class、object、attribute 和 method，將相關資料和行為放在一起。**

## 今課可以做到甚麼？

完成這一課後，你可以：

- 建立一個有屬性和方法的簡單 class；
- 由同一個 class 建立多個不同 object；
- 看懂 `self` 在方法中的作用。

## 開始前：想一想

遊戲中每個角色都有名稱、HP 和金幣，也都可以顯示狀態或取得金幣。如果每個角色都用很多個獨立變數表示，角色多了會怎樣？

## 新概念

### 1. Class 是藍圖，object 是按藍圖建立的個體

`Player` 可以是角色的藍圖；`amy` 和 `ben` 是根據這個藍圖建立的兩個 object。每個 object 有自己的資料。

### 2. Attribute 與 method

- **attribute**：物件保存的資料，例如 `name`、`hp`；
- **method**：物件可以做的事，例如 `show_status()`、`earn_gold()`；
- `self` 代表「目前正在使用這個方法的 object」。

這一課只學基本結構；class 不一定比 List 或 Dictionary 更好，當資料和動作本來就屬於同一件事時才值得使用。

![基本 OOP——用物件描述角色與事物概念圖](/images/lesson-46-basic-oop.svg)

## 跟著做：例子 1——建立遊戲角色

```python
class Player:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp
        self.gold = 0

    def show_status(self):
        print(f"{self.name}：HP {self.hp}，Gold {self.gold}")

    def earn_gold(self, amount):
        self.gold = self.gold + amount

amy = Player("Amy", 100)
amy.earn_gold(30)
amy.show_status()
```

### 預期輸出／結果

```text
Amy：HP 100，Gold 30
```

### 逐行解釋

`class Player:` 建立藍圖。`__init__()` 在建立 object 時自動執行，替角色設定初始資料。呼叫 `amy.earn_gold(30)` 時，`self` 就是 `amy`，所以只有 Amy 的金幣會更新。

## 再試一次：例子 2——同一藍圖建立兩位角色

```python
ben = Player("Ben", 80)
ben.earn_gold(10)

amy.show_status()
ben.show_status()
```

### 這次改了甚麼？

`amy` 和 `ben` 都來自 `Player`，但它們保存自己的 `hp` 和 `gold`。同一 class 可以建立很多 object，避免重複寫相同的功能。這段程式需在例子 1 的 class 定義後執行。

## 易錯位

### ❌ 忘記在方法第一個參數寫 `self`

**原因：** Python 呼叫 object 的方法時，會自動把目前 object 傳進來。

**修正方法：** 所有 instance method 的第一個參數先寫 `self`。

### ❌ 寫成 `gold = gold + amount`

**原因：** 這會找不到目前 object 的金幣資料。

**修正方法：** 使用 `self.gold = self.gold + amount`。

### ❌ 每個 object 共用同一份資料

**原因：** 若把可變 List 放成 class 層級資料，所有 object 可能互相影響。

**修正方法：** 初學階段先在 `__init__()` 內建立每個 object 自己的資料。

## 你來做

### 基礎題

建立 `Book` class，保存書名和是否已借出，並寫一個顯示狀態的方法。

### 標準題

建立兩個 `Pet` object，各自有名字和飢餓值；寫方法讓飢餓值增加。

### 挑戰題

把第 11 課的一筆遊戲角色 Dictionary 改寫成 class；比較兩種寫法各自較適合甚麼情況。

## 本課小結

1. class 是藍圖，object 是按藍圖建立的個體。
2. attribute 保存資料，method 定義物件能做的事。
3. `self` 讓方法操作目前這一個 object 的資料。

## 離堂前 3 分鐘

1. `Player`、`amy`、`amy.gold` 分別是 class、object 還是 attribute？
2. 為甚麼 `earn_gold()` 要使用 `self.gold`？
3. `__init__()` 通常在甚麼時候執行？

## 自我檢查

- 我能否分辨 class 和 object？
- 我能否在 `__init__()` 設定初始 attribute？
- 我能否寫一個更新 object 資料的方法？
