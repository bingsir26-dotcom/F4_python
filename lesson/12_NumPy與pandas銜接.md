<!-- 由 python.docx 拆分；原始 Word 檔保留不變。 -->

# NumPy + pandas 的銜接課

## 1. 為什麼要先學 NumPy，再學 pandas？

NumPy 是處理數字和陣列的工具，pandas 是處理表格資料的工具。  
很多資料分析工作，都是先把數字整理好，再放進表格中分析，所以這兩個工具常常一起使用。

你可以跟學生說：

NumPy 負責處理數字，pandas 負責整理表格。

## 2. 兩者的分工

NumPy

NumPy 主要處理：

數字

陣列

平均

總和

矩陣

pandas

pandas 主要處理：

表格

欄位

列資料

CSV / Excel

資料整理

## 3. NumPy 和 pandas 的關係

可以這樣理解：

NumPy 像一個數學工具箱

pandas 像一個表格整理箱

pandas 底層很多時候也會用到 NumPy，所以兩者關係很密切。  
學會 NumPy，之後學 pandas 會更容易。

## 4. 由 NumPy 轉到 pandas 的例子

NumPy：先處理數字

```python
import numpy as np

scores = np.array([80, 90, 75, 60])
print(scores)
print(np.mean(scores))
```

這裡我們先用 NumPy 把分數存成陣列，並計算平均。

pandas：把資料整理成表格

```python
import pandas as pd

data = {
    "姓名": ["Tom", "Mary", "John", "Alice"],
    "分數": [80, 90, 75, 60]
}

df = pd.DataFrame(data)
print(df)
```

這裡把數據變成表格，方便查看和分析。

## 5. 用 NumPy 幫 pandas 建資料

```python
import numpy as np
import pandas as pd

scores = np.array([80, 90, 75, 60])

df = pd.DataFrame({
    "分數": scores
})

print(df)
```

這裡先用 NumPy 建立數字，再交給 pandas 做表格。

## 6. pandas 裡也可以使用 NumPy 的結果

```python
import numpy as np
import pandas as pd

scores = np.array([80, 90, 75, 60])

df = pd.DataFrame({
    "分數": scores,
    "是否及格": scores >= 60
})

print(df)
```

這個例子很適合上課講解，因為學生可以看到：

NumPy 做數字比較

pandas 顯示成表格

## 7. 為什麼這樣搭配很好？

這樣搭配的好處是：

NumPy 處理數字快

pandas 顯示資料清楚

很適合做成績分析

很適合做學生資料整理

很適合之後學資料分析和 AI

## 8. 教學示範：成績表

```python
import numpy as np
import pandas as pd

names = ["Tom", "Mary", "John", "Alice"]
scores = np.array([80, 90, 75, 60])

df = pd.DataFrame({
    "姓名": names,
    "分數": scores,
    "是否及格": scores >= 60
})

print(df)
```

這個例子很完整，可以讓學生一次看到：

list

NumPy array

DataFrame

比較運算

表格輸出

## 9. 再進一步：計算平均和最高分

```python
import numpy as np
import pandas as pd

scores = np.array([80, 90, 75, 60])

df = pd.DataFrame({
    "分數": scores
})

print("平均分數：", np.mean(scores))
print("最高分數：", np.max(scores))
print("最低分數：", np.min(scores))
```

學生會明白：

NumPy 負責計算

pandas 負責整理顯示

## 10. 課堂活動建議

活動 1：分數表

請學生輸入 3 到 5 個分數，先用 NumPy 存資料，再用 pandas 顯示成表格。

活動 2：及格判斷

把分數資料做成一欄「是否及格」，讓學生觀察真假值。

活動 3：找統計數字

用 NumPy 計算：

平均

最高

最低  
再用 pandas 顯示結果。

## 11. 課堂小結

NumPy 和 pandas 是資料處理最常一起使用的兩個工具。  
NumPy 擅長處理數字和陣列，pandas 擅長處理表格和資料分析。  
學會兩者的配合，學生就可以開始做真正的資料處理工作。

## 12. 一句話版本

NumPy 負責算數字，pandas 負責整理表格，兩者一起用最適合做資料分析。

課後練習

練習 1

用 NumPy 建立一個分數陣列：

```python
[70, 85, 90, 60, 75]
```

並計算平均分數。

練習 2

把上面的分數放進 pandas 的 DataFrame，欄位名稱叫「分數」。

練習 3

再加一欄「是否及格」，條件是分數大於或等於 60。

練習 4

用 NumPy 計算最高分和最低分。

練習 5

建立一個學生姓名列表，再和分數一起放入 DataFrame。

練習參考答案

答案 1

```python
import numpy as np

scores = np.array([70, 85, 90, 60, 75])
print(np.mean(scores))
```

答案 2

```python
import numpy as np
import pandas as pd

scores = np.array([70, 85, 90, 60, 75])

df = pd.DataFrame({
    "分數": scores
})

print(df)
```

答案 3

```python
import numpy as np
import pandas as pd

scores = np.array([70, 85, 90, 60, 75])

df = pd.DataFrame({
    "分數": scores,
    "是否及格": scores >= 60
})

print(df)
```

答案 4

```python
import numpy as np

scores = np.array([70, 85, 90, 60, 75])

print(np.max(scores))
print(np.min(scores))
```

答案 5

```python
import numpy as np
import pandas as pd

names = ["Tom", "Mary", "John", "Alice", "Ben"]
scores = np.array([70, 85, 90, 60, 75])

df = pd.DataFrame({
    "姓名": names,
    "分數": scores
})

print(df)
```
