# 第 10 課：從 List 到資料表

> **本課主題：把零散的資料整理成一張可以閱讀、提問和分析的表格。**
>
> 你已經會用 List 保存一串資料。這一課會把「一串分數」升級成「有姓名、有班別、有分數」的資料表，正式開始資料分析。

## 今課可以做到甚麼？

完成這一課後，你可以：

- 把一串分數整理成有欄位名稱的成績表；
- 看懂 DataFrame 的列、欄和欄位名稱；
- 用 pandas 建立一張小型資料表，回答「誰的分數最高？」這類問題。

## 開始前：想一想

下面的 List 能保存三位同學的數學分數：

```python
math_scores = [78, 65, 91]
```

但如果老師問：「91 分的是誰？他在哪一班？英文考多少分？」你還能只靠這一個 List 回答嗎？

### 先猜一猜

哪一種寫法較容易讓人看懂資料代表甚麼？為甚麼？

```python
["Alex", 78, 82, "F4A"]
```

```text
姓名：Alex
數學：78
英文：82
班別：F4A
```

第二種把每份資料的名字也寫出來，所以人較容易閱讀。資料分析常常就是把大量資料整理到「人和電腦都看得懂」的樣子。

## 新概念

### 1. 一張資料表可以回答更多問題

List 很適合保存一串同類資料，例如一組分數：

```python
math_scores = [78, 65, 91]
```

當每位同學都有多種資料時，表格會更清楚：

| 姓名 | 班別 | 數學 | 英文 |
|---|---|---:|---:|
| Alex | F4A | 78 | 82 |
| Chris | F4A | 65 | 70 |
| May | F4B | 91 | 88 |

- 一個**欄位**保存同一種類的資料，例如「數學」。
- 一個**資料列**保存同一位同學的一整份資料。
- 這類有列、有欄的資料表，在 pandas 中叫做 **DataFrame**。

![由 List 過渡至有列和欄的 DataFrame 資料表](/images/lesson-10-list-to-table.svg)

### 2. `import`：把額外工具拿進來

Python 本身已經有 `print()`、List、`if` 和迴圈等工具。處理資料表時，我們會使用 pandas 這個額外工具。

```python
import pandas as pd
```

可以先讀成：

```text
把 pandas 這個資料表工具拿進來，並簡稱為 pd。
```

之後看到 `pd.DataFrame(...)`，就是在使用 pandas 的 DataFrame 工具。

### 3. 用字典建立 DataFrame

下面的字典把每個欄位名稱，配對到一串資料：

```python
student_data = {
    "姓名": ["Alex", "Chris", "May"],
    "班別": ["F4A", "F4A", "F4B"],
    "數學": [78, 65, 91]
}
```

每一欄都必須有同樣數量的資料，這樣 pandas 才知道哪一個姓名、班別和分數屬於同一位同學。

> **課堂環境提醒：** 本單元的程式可在 Jupyter Notebook 或 Google Colab 的 Code cell 執行。第一次使用 pandas 時，如果電腦顯示 `ModuleNotFoundError`，代表目前的 Python 環境尚未安裝 pandas；不要自行亂改程式碼，先告訴老師或使用課堂指定的環境。

## 跟著做：例子 1——建立第一張成績表

```python
import pandas as pd

student_data = {
    "姓名": ["Alex", "Chris", "May"],
    "班別": ["F4A", "F4A", "F4B"],
    "數學": [78, 65, 91]
}

scores_df = pd.DataFrame(student_data)
print(scores_df)
```

### 預期輸出

```text
      姓名  班別  數學
0   Alex  F4A  78
1  Chris  F4A  65
2    May  F4B  91
```

### 逐行解釋

```python
import pandas as pd
```

把 pandas 載入，並用 `pd` 作簡稱。

```python
student_data = {
    "姓名": ["Alex", "Chris", "May"],
    "班別": ["F4A", "F4A", "F4B"],
    "數學": [78, 65, 91]
}
```

建立字典。`"姓名"`、`"班別"`、`"數學"` 是欄位名稱；右邊的 List 是該欄的資料。

```python
scores_df = pd.DataFrame(student_data)
```

把字典變成 DataFrame，並保存到 `scores_df`。`df` 常被用作 DataFrame 的簡稱。

```python
print(scores_df)
```

顯示整張表格。最左邊的 `0`、`1`、`2` 是 pandas 自動加入的列索引。

## 再試一次：例子 2——只改一欄資料

在原本資料中加上英文成績，其他程式保持不變：

```python
student_data = {
    "姓名": ["Alex", "Chris", "May"],
    "班別": ["F4A", "F4A", "F4B"],
    "數學": [78, 65, 91],
    "英文": [82, 70, 88]
}

scores_df = pd.DataFrame(student_data)
print(scores_df)
```

現在表格多了一欄「英文」。只要欄位內同樣有三筆資料，pandas 便能把它排進同一張表。

## 易錯位

### ❌ 各欄資料數量不同

```python
student_data = {
    "姓名": ["Alex", "Chris", "May"],
    "數學": [78, 65]
}
```

**原因：** 有三個姓名，卻只有兩個數學分數，pandas 無法配對資料。

**✅ 修正：** 每一欄都放三筆資料。

```python
"數學": [78, 65, 91]
```

### ❌ 忘記載入 pandas

```python
scores_df = pd.DataFrame(student_data)
```

**原因：** Python 還不知道 `pd` 是甚麼。

**✅ 修正：** 在前面加入：

```python
import pandas as pd
```

### ❌ 把欄位名稱寫成沒有引號的中文

```python
姓名: ["Alex", "Chris", "May"]
```

**✅ 修正：** 欄位名稱是文字，要放在引號中。

```python
"姓名": ["Alex", "Chris", "May"]
```

## 你來做

### 基礎題：建立小隊資料表

建立一張有三位遊戲角色的資料表，欄位包括：`角色`、`等級`、`金幣`。

### 標準題：建立四位同學的成績表

建立 `姓名`、`班別`、`數學`、`英文` 四欄，每欄放四筆資料，然後顯示整張表。

### 挑戰題：想問題

在你建立的成績表中，寫出三條你想用資料回答的問題。例如：「哪一班的平均英文分較高？」暫時未必懂得寫程式回答，但問題要清楚。

## 本課小結

1. List 適合保存一串資料；有多個欄位時，DataFrame 會更清楚。
2. `import pandas as pd` 是把 pandas 的表格工具載入程式。
3. DataFrame 由列和欄組成；每個欄位的資料數量必須一致。

## 離堂前 3 分鐘

1. 表格中「數學」通常是列還是欄？
2. `pd` 是甚麼的簡稱？
3. 為甚麼下列資料不能建立成一張正常的表？

   ```python
   "姓名": ["Alex", "Chris", "May"]
   "數學": [78, 65]
   ```

## 自我檢查

- 我知道 List 和 DataFrame 分別適合保存甚麼資料嗎？
- 我能否指出表格中的一列和一欄？
- 我知道 `import pandas as pd` 的作用嗎？
