# 第 3 課：`input()` 與計算

> **本課主題：讓程式不再只用固定資料，而是可以接收使用者輸入。**
>
> 有了 `input()`，同一個程式可以讓不同同學輸入自己的資料，再立即算出屬於自己的答案。

## 今課可以做到甚麼？

完成這一課後，你可以：

- 讓程式向使用者提問並接收答案；
- 把輸入的數字轉換後進行計算；
- 做出「兩數相加」和「三科平均分」小工具。

## 開始前：想一想

第 2 課的計算式中，數字都是預先寫好的：

```python
print(80 + 90)
```

但如果每位同學的分數不同，是否要每次都打開程式改數字？

你猜以下程式執行時，畫面會發生甚麼？

```python
name = input("請輸入名字：")
print(name)
```

## 新概念

### 1. `input()`：把答案交給程式

`input()` 會在畫面顯示提示，停下來等待使用者輸入。當使用者按 Enter，輸入的內容就會保存到變數中。

```python
player_name = input("請輸入玩家名稱：")
print("歡迎", player_name)
```

![input 的資料流程：提示、輸入、保存、輸出](/images/lesson-03-input-flow.svg)

如果輸入 `Alex`，輸出會是：

```text
歡迎 Alex
```

### 2. `input()` 得到的是文字

即使使用者輸入 `15`，`input()` 得到的仍然是文字（`str`）。

```python
age = input("請輸入年齡：")
print(type(age))
```

輸出會顯示：

```text
<class 'str'>
```

所以以下程式看似在相加，其實是在接文字：

```python
first_number = input("第一個數字：")
second_number = input("第二個數字：")
print(first_number + second_number)
```

如果輸入 `10` 和 `20`，結果是 `1020`，不是 `30`。

### 3. `int()`：把輸入轉為整數

要做整數計算，直接把 `input()` 放進 `int()`：

```python
first_number = int(input("第一個數字："))
second_number = int(input("第二個數字："))
print(first_number + second_number)
```

執行次序是：

1. `input()` 等待使用者輸入；
2. `int()` 把輸入的文字轉成整數；
3. 整數保存到變數；
4. Python 進行計算並輸出答案。

### 4. 小數可用 `float()`

如果要處理價錢、身高或平均分等有小數的資料，可用 `float()`：

```python
price = float(input("請輸入價錢："))
print(price * 0.8)
```

## 跟著做：例子 1——兩個數字相加器

```python
first_number = int(input("請輸入第一個數字："))
second_number = int(input("請輸入第二個數字："))

total = first_number + second_number
print("總和：", total)
```

### 一次示範

```text
請輸入第一個數字：12
請輸入第二個數字：8
總和： 20
```

### 逐行解釋

```python
first_number = int(input("請輸入第一個數字："))
```

先提問，再把輸入的文字轉成整數，最後保存到 `first_number`。

```python
total = first_number + second_number
```

這時兩個變數都是整數，所以 `+` 是真正的加法。

```python
print("總和：", total)
```

`print()` 可以同時顯示文字和變數內容；中間用逗號分開。

## 再試一次：例子 2——三科平均分

把「兩個數字」改成三科分數，並算出平均：

```python
math_score = int(input("數學分數："))
english_score = int(input("英文分數："))
science_score = int(input("科學分數："))

average = (math_score + english_score + science_score) / 3
print("平均分：", average)
```

只要每次輸入不同分數，就能得到不同人的平均分，不用改程式本身。

## 易錯位

### ❌ 忘記轉成數字

**錯誤寫法**

```python
age = input("年齡：")
print(age + 1)
```

`age` 是文字，不能直接和數字 `1` 相加。

**✅ 改成這樣**

```python
age = int(input("年齡："))
print(age + 1)
```

### ❌ 輸入了不是數字的內容

```python
score = int(input("分數："))
```

這一行要求輸入整數。如果輸入 `八十` 或 `80分`，Python 無法轉換而會出錯。第一次練習時，先輸入純數字，例如 `80`。

### ❌ 計算式少了括號

**錯誤寫法**

```python
average = math_score + english_score + science_score / 3
```

Python 會先做除法，答案不是三科總和再平均。

**✅ 改成這樣**

```python
average = (math_score + english_score + science_score) / 3
```

## 你來做

### 基礎題：明年幾歲？

詢問使用者的年齡，輸出他明年的年齡。

### 標準題：購物總額

詢問三件物品的價錢，計算並輸出總額。

### 挑戰題：折扣計算機

詢問原價和折扣率（例如輸入 `0.8`），計算折扣後價錢。提示：價錢可用 `float()`。

## 本課小結

1. `input()` 讓程式可以接收使用者輸入。
2. `input()` 的結果預設是文字；要計算整數可用 `int()`，小數可用 `float()`。
3. 把輸入、計算和輸出分成不同變數，程式會更清楚。

## 離堂前 3 分鐘

1. 使用者輸入 `10` 和 `20` 後，沒有 `int()` 的 `a + b` 會得到甚麼？
2. `int(input("分數："))` 做了哪兩件事？
3. 三科平均分的括號為甚麼不能省略？

## 自我檢查

- 我能否寫出一行讓使用者輸入整數的程式？
- 我知道 `input()` 和 `int(input())` 的差別嗎？
- 我能否把三個輸入值計算成一個答案？
