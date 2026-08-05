# 第 15 課：讀取 CSV——使用真實資料

> **本課主題：把試算表中的資料交給 Python，開始分析真正的資料集。**
>
> CSV 是一種以逗號分隔欄位的純文字表格格式。Excel、Google Sheets 和不少公開資料網站都可以匯出 CSV。

## 今課可以做到甚麼？

完成這一課後，你可以：

- 把 CSV 檔讀成 pandas DataFrame；
- 先檢查資料表的欄位、大小和前幾筆資料；
- 把處理後的資料另存成新的 CSV 檔。

## 開始前：想一想

上一課中，我們直接在程式中寫出 `student_data`：

```python
student_data = {
    "姓名": ["Alex", "May"],
    "數學": [78, 91]
}
```

如果學校有 500 位學生、每人有十多項資料，手動把全部資料打進程式並不實際。資料本來已經在試算表中時，Python 能否直接讀取？

## 新概念

### 1. CSV：一種簡單的資料表檔案

CSV 的全名是 **Comma-Separated Values**。打開它時，你會看到一行代表一筆資料，欄位之間以逗號分隔：

```text
姓名,班別,數學,英文
Alex,F4A,78,82
Chris,F4A,65,70
```

在實際課堂中，先把 CSV 檔下載或上傳到你的 Jupyter／Colab 工作資料夾。本課示例檔可從網站下載：[scores.csv](/data/scores.csv)。

### 2. `pd.read_csv()`：讀取資料表

```python
import pandas as pd

scores_df = pd.read_csv("scores.csv")
print(scores_df.head())
```

`"scores.csv"` 是檔案名稱。若檔案不在目前工作資料夾，Python 找不到它，就會出現 `FileNotFoundError`。

![CSV 檔以欄位名稱和資料列組成；讀取後變成 pandas DataFrame](/images/lesson-15-csv-reading.svg)

### 3. 先檢查，再分析

讀取陌生資料後，不要馬上作結論。先用以下三個方法確認：

```python
print(scores_df.head())
print(scores_df.columns)
print(scores_df.shape)
```

- `head()`：前幾列大概長甚麼樣；
- `columns`：欄位名稱是否正確；
- `shape`：有多少列、多少欄。

## 跟著做：例子 1——讀取成績 CSV

先下載並放好 [scores.csv](/data/scores.csv)，再執行：

```python
import pandas as pd

scores_df = pd.read_csv("scores.csv")

print(scores_df.head())
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
(8, 4)
```

### 逐行解釋

```python
import pandas as pd
```

載入 pandas，並以較短的 `pd` 作名稱。每次獨立開一個新 notebook 時，都要先執行這一行。

```python
scores_df = pd.read_csv("scores.csv")
```

把 CSV 檔讀成 DataFrame，保存到 `scores_df`。變數名稱中的 `_df` 是提醒自己：這是一張資料表。

```python
print(scores_df.head())
```

先看資料開頭，確認第一列不是錯誤地變成資料、欄位名稱也沒有亂碼。

## 再試一次：例子 2——只看需要的欄位，再另存結果

```python
import pandas as pd

scores_df = pd.read_csv("scores.csv")
math_scores = scores_df[["姓名", "數學"]]

print(math_scores)
math_scores.to_csv("math_scores.csv", index=False)
```

### 預期結果

畫面會顯示姓名和數學兩欄；執行完成後，工作資料夾會多出 `math_scores.csv`。

`index=False` 的意思是不要把 pandas 左邊自動產生的列號寫進 CSV。打開新檔時，表格會較乾淨。

## 易錯位

### ❌ 檔案名稱或位置不正確

```python
pd.read_csv("score.csv")
```

**原因：** 範例檔其實叫 `scores.csv`。檔名、大小寫和副檔名都要完全相同。

**✅ 修正：** 先確認檔案已上傳到 notebook 的工作資料夾，再使用正確名稱。

```python
pd.read_csv("scores.csv")
```

### ❌ 忘記先載入 pandas

```python
scores_df = pd.read_csv("scores.csv")
```

**原因：** 如果本次 notebook 還未執行 `import pandas as pd`，`pd` 不存在。

**✅ 修正：**

```python
import pandas as pd
```

### ❌ 欄位名稱打錯

```python
print(scores_df["数学"])
```

**原因：** CSV 中的欄位是 `"數學"`；少一個字或使用不同字形都不是同一個名稱。

**✅ 修正：**

```python
print(scores_df.columns)
```

然後複製或完全照著欄位名稱輸入。

### ❌ 以為 `to_csv()` 會自動顯示資料

`to_csv()` 是寫出檔案，不是顯示資料。要在畫面查看，仍然使用 `print()` 或直接寫 `scores_df.head()`。

## 你來做

### 基礎題：查看資料概況

讀取 `scores.csv`，顯示它的 `columns` 和 `shape`，並用一句話說明它有多少位學生、多少項資料。

### 標準題：找出英文欄

從資料表選出 `姓名` 和 `英文` 兩欄，顯示結果並另存成 `english_scores.csv`。

### 挑戰題：讀取你的資料

把一個自己的試算表另存 CSV（最少三欄、五列資料），讀進 pandas，然後用 `head()`、`columns`、`shape` 檢查它是否正確。

## 本課小結

1. CSV 是常見的試算表資料格式，pandas 可以用 `pd.read_csv()` 讀取它。
2. 讀取後先用 `head()`、`columns`、`shape` 檢查資料。
3. `to_csv(..., index=False)` 可以把選出的或清理後的資料另存成新的 CSV。

## 離堂前 3 分鐘

1. `FileNotFoundError` 通常表示甚麼問題？
2. 為甚麼讀取 CSV 後要先看 `head()`？
3. `index=False` 的用途是甚麼？

## 自我檢查

- 我能否把 CSV 檔放到正確位置並讀進 pandas？
- 我會否先檢查欄位和資料表大小？
- 我能否另存自己選出的資料欄位？
