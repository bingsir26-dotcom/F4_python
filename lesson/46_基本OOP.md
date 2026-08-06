# 第 46 課：基本 OOP——把資料和動作放進同一個角色

> **本課主題：用 class 建立可重複使用的物件，讓每個角色各自保存資料並執行自己的動作。**
>
> class 不是所有程式都必須使用。當「一件事物」有多項資料和多個相關動作，例如遊戲角色、書籍或感測器時，它能令結構更清楚。

## 今課可以做到甚麼？

- 建立一個最小的 class 和 object；
- 讓每個 object 保存自己的名稱、血量或金幣；
- 呼叫方法更新目前 object 的資料。

## 開始前：想一想

遊戲有兩個角色：Ava 和 Ben。兩人各有自己的名字、血量和金幣。如果所有資料都分散在很多變數，例如 `ava_hp`、`ben_hp`、`ava_gold`，角色愈多時會變得怎樣？

## 新概念

### 1. class 是建立物件的藍圖

`class Player:` 描述一類角色應有甚麼資料和動作。`Player("Ava", 100)` 則按這個藍圖建立一個實際 object。

### 2. self 是目前這個 object

在 class 內，`self.name` 表示「這個角色的名字」，`self.gold` 表示「這個角色的金幣」。不同 object 有各自的 `self` 資料，不會混在一起。

![Player 藍圖包含 name、hp、gold；Ava 和 Ben 是各自擁有不同數值的兩個 object](/images/lesson-46-basic-oop.svg)

## 跟著做：例子 1——建立一個遊戲角色

```python
class Player:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp
        self.gold = 0

    def show_status(self):
        print(f"{self.name}：HP {self.hp}，金幣 {self.gold}")

ava = Player("Ava", 100)
ava.show_status()
```

### 預期輸出

```text
Ava：HP 100，金幣 0
```

### 逐行解釋

`__init__` 在建立 object 時執行。`name` 和 `hp` 是建立時提供的資料；`self.name = name` 把它們保存到這個角色身上。每個新角色都由金幣 `0` 開始。

`ava.show_status()` 呼叫 Ava 這個 object 的方法，因此方法中的 `self` 代表 Ava。

## 再試一次：例子 2——讓不同角色各自賺取金幣

```python
class Player:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp
        self.gold = 0

    def earn_gold(self, amount):
        self.gold = self.gold + amount

    def show_status(self):
        print(f"{self.name}：HP {self.hp}，金幣 {self.gold}")

ava = Player("Ava", 100)
ben = Player("Ben", 80)
ava.earn_gold(20)
ben.earn_gold(5)
ava.show_status()
ben.show_status()
```

### 預期輸出

```text
Ava：HP 100，金幣 20
Ben：HP 80，金幣 5
```

`earn_gold()` 只改變呼叫它的 object。Ava 取得 20 金幣不會令 Ben 的金幣改變。

## 易錯位

### ❌ 忘記在方法第一個位置寫 self

```python
# def earn_gold(amount):
```

**原因：** Python 呼叫 object 方法時，會自動把目前 object 傳進第一個位置。

**✅ 修正：** 寫成 `def earn_gold(self, amount):`。

### ❌ 把 object 資料寫成普通變數

`gold = 0` 只是一個方法內的暫時變數，不能代表每個角色各自的金幣。

**✅ 修正：** 寫 `self.gold = 0` 保存到 object。

### ❌ 為很小的一次性資料硬用 class

只有兩三個臨時數字時，Dictionary 或 List 可能更直接。

**✅ 修正：** 當資料和一組動作真的屬於同一件事時才考慮 class。

## 你來做

### 基礎題：加入 heal 方法

為 `Player` 加入 `heal(self, amount)`，令角色 HP 增加指定數字。

### 標準題：建立 Book class

建立 `Book(title, pages)`，再寫 `show_info()` 顯示書名和頁數。

### 挑戰題：限制血量

加入 `max_hp`，令 `heal()` 後的 HP 不會超過最大血量。提示：可使用 `min()`。

## 本課小結

1. class 是建立一類 object 的藍圖。
2. 每個 object 保存自己的資料，例如 Ava 和 Ben 的金幣。
3. `self` 指向目前正在執行方法的 object。

## 離堂前 3 分鐘

1. `class Player` 和 `ava = Player(...)` 有甚麼分別？
2. 為甚麼兩個 Player 可以有不同金幣？
3. `self.gold` 中的 `self` 指甚麼？

## 自我檢查

- 我能否建立一個有資料和方法的最小 class？
- 我能否解釋 object 為甚麼有各自的資料？
- 我會否先判斷 class 是否真的令程式更清楚？
