# 第 6 課：`for` 迴圈與重複工作

> **本課主題：讓 Python 幫你重複做同一件事，而不是把同一行程式寫很多次。**
>
> 有 3 個分數可以逐個相加；有 30 個分數時，`for` 迴圈可以替你逐個處理。

## 今課可以做到甚麼？

完成這一課後，你可以：

- 用 `for` 逐一讀取列表中的每一份資料；
- 用迴圈計算總分和平均分；
- 用 `range()` 重複執行指定次數。

## 開始前：想一想

如果有三個分數，你可以這樣顯示：

```python
print(scores[0])
print(scores[1])
print(scores[2])
```

但如果有 40 個分數，要寫多少行？如果明天又多一位同學，程式又要改多少次？

## 新概念

### 1. `for`：對列表中的每一項重複做事

```python
scores = [80, 90, 70]

for score in scores:
    print(score)
```

可以讀成：「對 `scores` 裡的每一個 `score`，顯示它。」

![for 迴圈逐一讀取列表元素並重複執行](/images/lesson-06-for-loop.svg)

輸出是：

```text
80
90
70
```

`score` 是我們替「目前正在處理的其中一個分數」取的暫時名字。

### 2. 縮排的程式會重複執行

```python
for item in ["藥水", "地圖", "鑰匙"]:
    print("背包物品：", item)
```

`print()` 有縮排，因此列表中每一個物品都會執行一次。

### 3. 累積總和：先從 `0` 開始

```python
scores = [80, 90, 70]
total = 0

for score in scores:
    total = total + score

print(total)
```

每次迴圈都把目前的 `score` 加到 `total`。最後輸出 `240`。

### 4. `range()`：重複指定次數

```python
for number in range(5):
    print(number)
```

輸出是：

```text
0
1
2
3
4
```

`range(5)` 產生 5 個數字，從 `0` 到 `4`。要顯示 1 至 5，可以寫：

```python
for number in range(1, 6):
    print(number)
```

### 5. 四種常見的逐一處理方式

看到 `for` 時，可以先問自己：我想對每一筆資料做甚麼？常見答案有四種。

| 想得到的結果 | 做法提示 |
| --- | --- |
| 總和 | 準備 `total = 0`，每次加上目前資料 |
| 數量 | 準備 `count = 0`，符合條件時加 1 |
| 最大／最小 | 準備一個目前最佳答案，再逐個比較 |
| 篩選結果 | 準備空 List，符合條件時用 `append()` 加入 |

例如只收集及格分數：

```python
scores = [55, 72, 88, 49]
passed_scores = []

for score in scores:
    if score >= 60:
        passed_scores.append(score)

print(passed_scores)
```

輸出是 `[72, 88]`。現在先認識這些思路；之後遇到資料題時，可用同樣方式處理更多資料。

## 跟著做：例子 1——計算小隊總分

```python
scores = [80, 90, 70]
total = 0

for score in scores:
    total = total + score

print("總分：", total)
```

### 預期輸出

```text
總分： 240
```

### 逐行解釋

```python
total = 0
```

先準備一個總分盒子，初始值是 `0`。

```python
for score in scores:
```

依序把 `80`、`90`、`70` 放到暫時變數 `score`。

```python
total = total + score
```

第一次得到 `80`，第二次得到 `170`，第三次得到 `240`。

## 再試一次：例子 2——計算平均分

只在上一個程式最後加入兩行：

```python
average = total / len(scores)
print("平均分：", average)
```

`len(scores)` 告訴 Python 有幾個分數，因此不需要自己寫死除以 `3`。

## 易錯位

### ❌ 忘記縮排

**錯誤寫法**

```python
for score in scores:
print(score)
```

**✅ 改成這樣**

```python
for score in scores:
    print(score)
```

### ❌ 把 `total = 0` 放進迴圈內

**錯誤寫法**

```python
for score in scores:
    total = 0
    total = total + score
```

每次重複時總分都被重設為 `0`，最後只會留下最後一個分數。

**✅ 改成這樣**

```python
total = 0
for score in scores:
    total = total + score
```

### ❌ 以為 `range(5)` 包含 5

`range(5)` 的最後一個數字是 `4`。如果想要 `1` 到 `5`，請寫 `range(1, 6)`。

## 你來做

### 基礎題：逐個顯示物品

建立一個有三個遊戲物品的列表，用 `for` 逐個顯示物品名稱。

### 標準題：計算金幣總數

建立 `[5, 10, 20, 50]` 的金幣列表，用 `for` 計算總數。

### 挑戰題：找出及格者

建立一個分數列表，用 `for` 和 `if` 把大於或等於 60 的分數加入新的 `passed_scores` 列表，最後顯示它。再挑戰計算有多少人及格。

## 本課小結

1. `for variable in list:` 會逐一處理列表中的元素。
2. 迴圈內要重複執行的程式必須縮排。
3. 累加時在迴圈外先設 `total = 0`；`range()` 可控制重複次數。
4. `for` 常用於加總、計數、找最大最小值或篩選資料。

## 離堂前 3 分鐘

1. `for name in names:` 中，`name` 代表甚麼？
2. 為甚麼 `total = 0` 不應放在迴圈內？
3. `range(1, 4)` 會產生哪三個數字？

## 自我檢查

- 我能否用 `for` 顯示列表內全部資料？
- 我能否用 `for` 計算列表總和？
- 我知道 `range(1, 6)` 為甚麼會到 5 嗎？
