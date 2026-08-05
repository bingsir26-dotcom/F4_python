# 第 12 課：pandas 入門——看懂一張資料表

> **本課主題：先看清楚資料，再開始分析。**
>
> 真實資料表可能有幾十甚至幾千列。這一課會學習先看前幾筆、看欄位和選出需要的資料，而不是一開始把整張表印得滿畫面都是。

## 今課可以做到甚麼？

- 看出 DataFrame 有哪些欄位、多少列資料；
- 選出一欄資料，例如所有人的數學成績；
- 用 `head()` 快速檢查資料表的開頭內容。

## 開始前：想一想

如果老師給你一份有 500 位學生的資料表，直接全部印出來，真的容易找到錯誤嗎？

### 先猜一猜

以下哪一行最適合回答「這張表有甚麼欄位？」

```python
print(scores_df.head())
print(scores_df.columns)
print(scores_df["數學"])
```

答案是 `scores_df.columns`。它會顯示欄位名稱；三句程式都能看資料，但回答的是不同問題。

## 新概念

### 本課起始 cell：先執行一次

每次開啟新的 Notebook／Colab，或重新啟動 Kernel 後，先執行這一格。後面的例子會使用 `scores_df`。

```python
import pandas as pd

student_data = {
    "姓名": ["Alex", "Chris", "May", "Sam", "Lily"],
    "班別": ["F4A", "F4A", "F4B", "F4B", "F4A"],
    "數學": [78, 65, 91, 72, 84],
    "英文": [82, 70, 88, 69, 90]
}

scores_df = pd.DataFrame(student_data)
```

本課沿用一份虛構班級資料：

```python
import pandas as pd

student_data = {
    "姓名": ["Alex", "Chris", "May", "Sam", "Lily"],
    "班別": ["F4A", "F4A", "F4B", "F4B", "F4A"],
    "數學": [78, 65, 91, 72, 84],
    "英文": [82, 70, 88, 69, 90]
}

scores_df = pd.DataFrame(student_data)
```

### 1. `head()`：先看前幾筆

```python
print(scores_df.head())
```

`head()` 預設顯示前五列。資料很多時，這是很好的第一步：先確認欄位、資料格式和開頭內容有沒有明顯問題。

### 2. `columns` 和 `shape`

```python
print(scores_df.columns)
print(scores_df.shape)
```

- `columns` 顯示欄位名稱。
- `shape` 顯示資料表的大小，格式是 `(列數, 欄數)`。

如果輸出是 `(5, 4)`，意思是 5 列資料、4 個欄位。

### 3. 選出一欄資料

```python
print(scores_df["數學"])
```

方括號內寫欄位名稱，就能選出該欄資料。這裡的 `"數學"` 是欄位名稱，所以一定要加引號。

![DataFrame 的欄位、資料列、索引與常用查看方法](/images/lesson-12-dataframe-reading.svg)

## 跟著做：例子 1——先了解這張成績表

```python
print(scores_df.head())
print(scores_df.columns)
print(scores_df.shape)
```

### 預期輸出

```text
      姓名  班別  數學  英文
0   Alex  F4A  78  82
1  Chris  F4A  65  70
2    May  F4B  91  88
3    Sam  F4B  72  69
4   Lily  F4A  84  90

Index(['姓名', '班別', '數學', '英文'], dtype='object')
(5, 4)
```

### 逐行解釋

```python
print(scores_df.head())
```

先看前五列資料。這裡剛好只有五位同學，所以全部都顯示。

```python
print(scores_df.columns)
```

查看欄位名稱，避免之後把欄位拼錯。

```python
print(scores_df.shape)
```

查看資料表大小。輸出 `(5, 4)`，即 5 位學生和 4 個欄位。

## 再試一次：例子 2——只看數學成績

```python
print(scores_df["數學"])
```

### 預期輸出

```text
0    78
1    65
2    91
3    72
4    84
Name: 數學, dtype: int64
```

把 `"數學"` 改成 `"英文"` 再執行。你得到的是同一批學生的另一組分數。

如果想同時看姓名和數學，可使用雙層方括號：

```python
print(scores_df[["姓名", "數學"]])
```

## 易錯位

### ❌ 把欄位名稱當成變數

```python
print(scores_df[數學])
```

**原因：** Python 會以為 `數學` 是一個變數名稱。

**✅ 修正：** 欄位名稱是文字。

```python
print(scores_df["數學"])
```

### ❌ 欄位名稱打錯

```python
print(scores_df["數学"])
```

**原因：** `數学` 和 `數學` 是不同文字。

**✅ 修正：** 先執行 `print(scores_df.columns)`，再完全照著欄位名稱輸入。

### ❌ 把 `shape` 寫成函式

```python
print(scores_df.shape())
```

**原因：** `shape` 是資料表的屬性，不需要括號。

**✅ 修正：**

```python
print(scores_df.shape)
```

## 你來做

### 基礎題：看資料表大小

在第 11 課建立的資料表中，顯示欄位名稱和 `shape`。它有多少列、多少欄？

### 標準題：選出兩欄

同時顯示 `姓名` 和 `英文` 欄，並說出哪位學生英文最高分。

### 挑戰題：增加資料後再檢查

回到 `student_data`，在**每一欄最後**加入同一位新同學的資料，然後重新執行 `scores_df = pd.DataFrame(student_data)`、`head()` 和 `shape`。輸出有甚麼改變？

## 本課小結

1. `head()` 用來快速查看資料表開頭。
2. `columns` 顯示欄位名稱；`shape` 顯示 `(列數, 欄數)`。
3. `scores_df["數學"]` 可以選出一欄；欄位名稱必須完全正確。

## 離堂前 3 分鐘

1. `scores_df.shape` 顯示 `(20, 4)`，代表甚麼？
2. 要查看欄位名稱，應使用 `head()`、`columns` 還是 `shape`？
3. 為甚麼 `scores_df[數學]` 會出錯？

## 自我檢查

- 我能否說出 `head()`、`columns`、`shape` 分別回答甚麼問題？
- 我能否選出一欄和兩欄資料？
- 我遇到欄位錯誤時，知道先檢查 `columns` 嗎？
