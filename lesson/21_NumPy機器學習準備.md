# 第 21 課：NumPy——機器學習前的數字陣列

> **本課主題：認識機器學習常用的數字陣列，為下一課的特徵、模型和預測作準備。**
>
> 你已用 pandas 整理表格、做統計和畫圖。NumPy 是處理數字陣列的重要工具，日後做科學運算和機器學習時會常常遇到它。

## 今課可以做到甚麼？

- 建立一個 NumPy 數字陣列；
- 讓一整組數字一起加、減、乘；
- 計算一組數字的平均值，理解它和之後 AI 工具的關係。

## 開始前：想一想

假設遊戲更新後，所有玩家都得到 5 枚金幣。用 List 時，你可能會寫：

```python
gold = [10, 20, 30]
new_gold = [gold[0] + 5, gold[1] + 5, gold[2] + 5]
```

如果有 1,000 位玩家，逐個寫位置很麻煩。

### 先猜一猜

先看這兩段**都可直接執行**的程式。你猜結果有甚麼分別？

```python
gold = [10, 20, 30]
print(gold + [5])
```

```python
import numpy as np

gold = np.array([10, 20, 30])
print(gold + 5)
```

第一段 List 的 `+` 是把另一個 List 接到最後，輸出 `[10, 20, 30, 5]`；第二段 NumPy array 的 `+ 5` 才會把每個數字都加 5，輸出 `[15 25 35]`。

## 新概念

### 1. `numpy` 與 `array`

```python
import numpy as np

scores = np.array([78, 65, 91])
```

`np.array(...)` 建立一個數字陣列。它看起來像 List，但特別適合進行大量數值計算。

### 2. 整組資料一起運算

```python
scores + 5
scores * 2
scores >= 60
```

這些運算都會套用到陣列中的每一個數字。

### 3. NumPy 與資料分析／AI

pandas 適合處理有欄位名稱的表格；NumPy 適合處理很多數字。日後機器學習模型會把大量數字變成陣列來計算，所以 NumPy 是一個重要基礎。

NumPy **不是 AI 本身**；它是處理數字的基礎工具之一，日後很多 AI 程式會用到相似的數字陣列概念。

![NumPy array 對整組數字進行相同運算](/images/lesson-21-numpy-array.svg)

## 跟著做：例子 1——替所有分數加 5 分

```python
import numpy as np

scores = np.array([78, 65, 91])
new_scores = scores + 5

print(new_scores)
```

### 預期輸出

```text
[83 70 96]
```

### 逐行解釋

```python
scores = np.array([78, 65, 91])
```

建立一個 NumPy array，保存三個數字。

```python
new_scores = scores + 5
```

把 array 中每一個數字都加 5，結果保存到 `new_scores`。原本的 `scores` 不會因此改變。

```python
print(new_scores)
```

顯示更新後的整組分數。

## 再試一次：例子 2——找出及格情況和平均分

```python
passed = scores >= 60
average_score = scores.mean()

print(passed)
print(average_score)
```

### 預期輸出

```text
[ True  True  True]
78.0
```

- `scores >= 60` 逐個比較分數，得到 True／False。
- `scores.mean()` 計算整組數字的平均值。

## 易錯位

### ❌ 忘記載入 NumPy

```python
scores = np.array([78, 65, 91])
```

**✅ 修正：**

```python
import numpy as np
```

### ❌ 把 List 當成 NumPy array

```python
scores = [78, 65, 91]
print(scores + 5)
```

**原因：** 普通 List 不支援「每個元素加 5」這種寫法。

**✅ 修正：**

```python
scores = np.array([78, 65, 91])
print(scores + 5)
```

### ❌ 把 `mean` 寫成沒有括號

```python
print(scores.mean)
```

**✅ 修正：** `mean()` 是要執行的函式。

```python
print(scores.mean())
```

## 你來做

### 基礎題：遊戲金幣更新

建立 `gold = np.array([10, 25, 40])`，替所有玩家加上 20 枚金幣。

### 標準題：成績加分

建立四個分數的 array，替每個分數加 3 分，然後計算新平均值。

### 挑戰題：及格統計

建立一組至少五人的分數，產生 `scores >= 60` 的結果。你能看出有多少個 True 嗎？提示：True 在計算時可當作 1，試試：

```python
(scores >= 60).sum()
```

## 本課小結

1. `np.array()` 建立特別適合數字運算的陣列。
2. `array + 5` 會讓陣列中每個數字都加 5。
3. NumPy 是之後資料分析、科學運算與機器學習常用的數字工具。

## 離堂前 3 分鐘

1. NumPy 的常用簡稱是甚麼？
2. `scores * 2` 對 NumPy array 代表甚麼？
3. `scores.mean()` 計算的是甚麼？

## 自我檢查

- 我能否分辨 Python List 和 NumPy array？
- 我知道 NumPy 為何適合一次處理很多數字嗎？
- 我能否寫出 `import numpy as np` 和 `np.array(...)`？
