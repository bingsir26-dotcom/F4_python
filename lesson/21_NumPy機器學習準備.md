# 第 21 課：NumPy——讓一組數字一起計算

> **本課主題：把一組數字放進 NumPy array，然後用一行程式同時計算整組資料。**
>
> 之前的 List 很適合保存多個項目；當資料主要是一大組數字，並且要重複做相同計算時，NumPy 會更方便。這是日後資料分析和機器學習常見的資料形式。

## 今課可以做到甚麼？

- 把一組遊戲金幣放入 NumPy array；
- 一次替整組數字加上獎勵、乘倍或比較是否達標；
- 計算平均值，快速讀出整組數字的結果。

## 開始前：想一想

遊戲更新後，三個角色都獲得 5 枚金幣。若資料放在 List 內，以下程式會得到甚麼？

```python
gold = [10, 20, 30]
print(gold + [5])
```

它會輸出：

```text
[10, 20, 30, 5]
```

這是把另一個 List 接在最後，不是替每個角色加 5。

那麼，怎樣才可以把「加 5」同時套用到每個數字？

## 新概念

### 1. 一組數字，也可以一起算

```python
import numpy as np

gold = np.array([10, 20, 30])
```

`np.array(...)` 建立 NumPy 的數字陣列（array）。它看起來像 List，但特別擅長處理數字。

![一組金幣數字經過同一運算後得到一組新數字](/images/lesson-21-numpy-array.svg)

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

## 跟著做：例子 1——替所有金幣加上獎勵

```python
import numpy as np

gold = np.array([78, 65, 91])
bonus_gold = gold + 5

print(bonus_gold)
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
gold = np.array([78, 65, 91])
```

建立一組三個角色獲得的金幣。

```python
bonus_gold = gold + 5
```

把 array 內的每個數字加 5，結果保存到新的變數 `bonus_gold`。原本的 `gold` 仍然是 `[78 65 91]`。

```python
print(bonus_gold)
```

顯示新的整組金幣。

## 再試一次：例子 2——找出達標回合數和平均金幣

這是一段**可獨立執行**的程式。留意 `gold >= 60` 會產生一組 True／False，而 `.sum()` 可以把當中的 `True` 數量加起來。

```python
import numpy as np

gold = np.array([78, 52, 91, 60, 45])
reached_target = gold >= 60
target_count = reached_target.sum()
average_gold = gold.mean()

print(reached_target)
print("達標回合數：", target_count)
print("平均金幣：", average_gold)
```

### 預期輸出

```text
[ True False  True  True False]
達標回合數： 3
平均金幣： 65.2
```

`reached_target` 保存的不是金幣，而是一組比較結果。第一、三、四個數字達到 60，所以有三個 `True`。

## 易錯位

### ❌ 忘記載入 NumPy

```python
gold = np.array([78, 65, 91])
```

**原因：** Python 尚未知道 `np` 是甚麼。

**✅ 修正：** 在程式開頭加入：

```python
import numpy as np
```

### ❌ 把 List 當成 NumPy array

```python
gold = [78, 65, 91]
print(gold + 5)
```

**原因：** 普通 List 的 `+` 不是逐個數字相加。

**✅ 修正：**

```python
gold = np.array([78, 65, 91])
print(gold + 5)
```

### ❌ 把 `mean` 寫成沒有括號

```python
print(gold.mean)
```

**原因：** `mean` 是計算平均值的功能；要加上 `()` 才會執行。

**✅ 修正：**

```python
print(gold.mean())
```

## 你來做

### 基礎題：遊戲金幣更新

建立 `gold = np.array([10, 25, 40])`，替所有角色加上 20 枚金幣。

### 標準題：金幣獎勵

建立至少四個金幣數字的 array，替每個數字加 3，然後顯示新平均值。

### 挑戰題：達標統計

建立至少五個數字，設定一個達標線，例如 `gold >= 70`。顯示比較結果和達標數量。

## 本課小結

1. `np.array()` 可以建立適合數字運算的陣列。
2. `array + 5` 會把加法套用到 array 中每一個數字。
3. 比較結果可得到 True／False；`.mean()` 可計算平均值。

## 離堂前 3 分鐘

1. `np.array([1, 2, 3]) * 10` 會得到甚麼？
2. `gold >= 60` 會產生數字還是 True／False？
3. `gold.mean()` 計算的是甚麼？

## 自我檢查

- 我能否分辨 Python List 和 NumPy array？
- 我能否用一行程式更新整組數字？
- 我能否讀出一組 True／False 的意思？
