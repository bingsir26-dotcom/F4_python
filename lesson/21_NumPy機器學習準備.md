# 第 21 課：NumPy——讓一組數字一起計算

> **本課主題：把一組數字放進 NumPy array，然後用一行程式同時計算整組資料。**
>
> 之前的 List 很適合保存多個項目；當資料主要是一大組數字，並且要重複做相同計算時，NumPy 會更方便。這是日後資料分析和機器學習常見的資料形式。

## 今課可以做到甚麼？

- 把一組分數或遊戲金幣放入 NumPy array；
- 一次替整組數字加分、乘倍或比較是否達標；
- 計算平均值，快速讀出整組數字的結果。

## 開始前：想一想

遊戲更新後，三位玩家都獲得 5 枚金幣。若資料放在 List 內，以下程式會得到甚麼？

```python
gold = [10, 20, 30]
print(gold + [5])
```

它會輸出：

```text
[10, 20, 30, 5]
```

這是把另一個 List 接在最後，不是替每位玩家加 5。

那麼，怎樣才可以把「加 5」同時套用到每個數字？

## 新概念

### 1. 一組數字，也可以一起算

```python
import numpy as np

gold = np.array([10, 20, 30])
```

`np.array(...)` 建立 NumPy 的數字陣列（array）。它看起來像 List，但特別擅長處理數字。

![一組數字經過同一運算後得到一組新數字](/images/lesson-21-numpy-array.svg)

### 2. 同一個運算會套用到每一個數字

```python
gold + 5
gold * 2
gold >= 20
```

- `gold + 5`：每個金幣數量都加 5；
- `gold * 2`：每個金幣數量都乘 2；
- `gold >= 20`：逐個檢查是否不少於 20，得到 `True` 或 `False`。

pandas 適合有欄位名稱的表格；NumPy array 適合直接對大量數字計算。它不是 AI，但很多資料分析和機器學習程式都會用到這種數字陣列。

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
import numpy as np
```

載入 NumPy，並把較長的名稱 `numpy` 簡寫成 `np`。

```python
scores = np.array([78, 65, 91])
```

建立一組三人的分數。

```python
new_scores = scores + 5
```

把 array 內的每個數字加 5，結果保存到新的變數 `new_scores`。原本的 `scores` 仍然是 `[78 65 91]`。

```python
print(new_scores)
```

顯示新的整組分數。

## 再試一次：例子 2——找出及格人數和平均分

這是一段**可獨立執行**的程式。留意 `scores >= 60` 會產生一組 True／False，而 `.sum()` 可以把當中的 `True` 數量加起來。

```python
import numpy as np

scores = np.array([78, 52, 91, 60, 45])
passed = scores >= 60
pass_count = passed.sum()
average_score = scores.mean()

print(passed)
print("及格人數：", pass_count)
print("平均分：", average_score)
```

### 預期輸出

```text
[ True False  True  True False]
及格人數： 3
平均分： 65.2
```

`passed` 保存的不是分數，而是一組比較結果。第一、三、四個分數達到 60，所以有三個 `True`。

## 易錯位

### ❌ 忘記載入 NumPy

```python
scores = np.array([78, 65, 91])
```

**原因：** Python 尚未知道 `np` 是甚麼。

**✅ 修正：** 在程式開頭加入：

```python
import numpy as np
```

### ❌ 把 List 當成 NumPy array

```python
scores = [78, 65, 91]
print(scores + 5)
```

**原因：** 普通 List 的 `+` 不是逐個數字相加。

**✅ 修正：**

```python
scores = np.array([78, 65, 91])
print(scores + 5)
```

### ❌ 把 `mean` 寫成沒有括號

```python
print(scores.mean)
```

**原因：** `mean` 是計算平均值的功能；要加上 `()` 才會執行。

**✅ 修正：**

```python
print(scores.mean())
```

## 你來做

### 基礎題：遊戲金幣更新

建立 `gold = np.array([10, 25, 40])`，替所有玩家加上 20 枚金幣。

### 標準題：成績加分

建立至少四個分數的 array，替每個分數加 3 分，然後顯示新平均值。

### 挑戰題：達標統計

建立至少五個數字，設定一個達標線，例如 `scores >= 70`。顯示比較結果和達標數量。

## 本課小結

1. `np.array()` 可以建立適合數字運算的陣列。
2. `array + 5` 會把加法套用到 array 中每一個數字。
3. 比較結果可得到 True／False；`.mean()` 可計算平均值。

## 離堂前 3 分鐘

1. `np.array([1, 2, 3]) * 10` 會得到甚麼？
2. `scores >= 60` 會產生數字還是 True／False？
3. `scores.mean()` 計算的是甚麼？

## 自我檢查

- 我能否分辨 Python List 和 NumPy array？
- 我能否用一行程式更新整組數字？
- 我能否讀出一組 True／False 的意思？
