<!-- 由 python.docx 拆分；原始 Word 檔保留不變。 -->

# NumPy 入門

## 1. 什麼是 NumPy？

NumPy 是 Python 的一個數值運算套件，主要用來處理大量數字、陣列和矩陣。steam.oxxostudio+2  
你可以把它想像成 Python 的「數學加速器」，因為它比普通 list 更適合做大量數據運算。techbridge+2  
很多資料科學、機器學習、pandas、Matplotlib 等工具都和 NumPy 很有關係。runoob+2

## 2. 為什麼要學 NumPy？

普通 Python list 可以存很多資料，但如果要做大量數字計算，就不夠方便，也不夠快。steam.oxxostudio+2  
NumPy 可以讓我們更快做：

加總。

平均。

陣列計算。

矩陣運算。simplelearn+2

如果你之後要學：

pandas。

資料分析。

AI / 機器學習。

那 NumPy 幾乎是必學基礎。youtube+2

## 3. 如何使用 NumPy？

使用 NumPy 前，要先匯入套件：

```python
import numpy as np
```

np 是常見簡寫，這樣打程式會比較方便。simplelearn+1

建立一個 NumPy 陣列：

```python
a = np.array([1, 2, 3, 4])
print(a)
```

這裡的 array 就是 NumPy 的陣列，和普通 list 很像，但更適合數值運算。techbridge+2

## 4. NumPy 和 list 的分別

Python list 可以存很多資料，例如：

```python
numbers = [1, 2, 3, 4]
```

NumPy 陣列則是：

```python
import numpy as np
numbers = np.array([1, 2, 3, 4])
```

list 和 NumPy 的差異

list 比較通用，可以放不同類型資料。

NumPy 陣列通常用來放同類型數字。

NumPy 在大量數字運算時更快。steam.oxxostudio+2

你可以跟學生說：  
list 像一個普通盒子，NumPy 陣列像一部專門計算的機器。

## 5. NumPy 的基本操作

## 5.1 看陣列內容

```python
import numpy as np

a = np.array([10, 20, 30])
print(a)
```

## 5.2 陣列加法

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(a + b)
```

結果會是：

```python
[5 7 9]
```

## 5.3 陣列乘法

```python
print(a * 2)
```

結果：

```python
[2 4 6]
```

## 5.4 計算總和

```python
print(np.sum(a))
```

## 5.5 計算平均

```python
print(np.mean(a))
```

這些都是 NumPy 很常用的基本功能。runoob+2

## 6. 常見屬性

NumPy 陣列有幾個很重要的資訊。

## 6.1 查看型態

```python
print(type(a))
```

## 6.2 查看維度

```python
print(a.ndim)
```

## 6.3 查看形狀

```python
print(a.shape)
```

## 6.4 查看資料型態

```python
print(a.dtype)
```

這些屬性可以幫助我們了解資料長什麼樣。techbridge+2

## 7. 二維陣列

NumPy 不只可以存一排數字，也可以存表格狀資料。

```python
import numpy as np

b = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

print(b)
```

這種形式很像表格，有兩列三欄。runoob+2

你可以這樣講給學生聽：  
一維陣列像一條隊伍，二維陣列像一張表格。

## 8. 二維陣列操作

## 8.1 查看形狀

```python
print(b.shape)
```

## 8.2 取得某個值

```python
print(b[0][1])
```

這表示：

第 1 列

第 2 個位置

## 8.3 取得整列

```python
print(b[1])
```

這些索引概念很重要，因為之後處理表格和矩陣都會用到。simplelearn+2

## 9. 建立常見陣列

## 9.1 全 0 陣列

```python
print(np.zeros(5))
```

## 9.2 全 1 陣列

```python
print(np.ones(5))
```

## 9.3 等差數列

```python
print(np.arange(1, 10, 2))
```

## 9.4 指定範圍的數

```python
print(np.linspace(0, 1, 5))
```

這些工具很方便，可以快速建立測試資料。steam.oxxostudio+2

## 10. NumPy 為什麼重要？

NumPy 是很多資料工具的基礎，像 pandas、SciPy、Matplotlib，甚至很多 AI 工具都和它有關。techbridge+2  
所以學 NumPy，不只是學一個套件，而是在建立資料分析能力的基礎。youtube+1  
如果學生未來要做數據分析、AI、機器學習，NumPy 幾乎一定會用到。vocus+2

## 11. 課堂小結

NumPy 是 Python 中非常重要的數值運算套件，專門處理陣列、矩陣和大量數字運算。runoob+2  
它比普通 list 更適合做科學計算，也更快、更方便。simplelearn+2  
學會 NumPy，之後學 pandas 和 AI 會容易很多。youtube+1

## 12. 一句話版本

NumPy 是 Python 用來處理數字、陣列和大量資料的基礎工具。steam.oxxostudio+2

課後練習

練習 1

建立一個 NumPy 陣列，內容是 [10, 20, 30, 40]，並印出來。

練習 2

建立兩個 NumPy 陣列：

```python
[1, 2, 3]
[4, 5, 6]
```

計算它們相加的結果。

練習 3

建立一個陣列 [5, 10, 15, 20]，計算總和與平均值。

練習 4

建立一個二維陣列：

```python
[
    [1, 2],
    [3, 4]
]
```

印出第一列第二個數字。

練習 5

試一試：

np.zeros(3)

np.ones(4)

np.arange(1, 6)

參考答案

練習 1

```python
import numpy as np
a = np.array([10, 20, 30, 40])
print(a)
```

練習 2

```python
import numpy as np
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(a + b)
```

練習 3

```python
import numpy as np
a = np.array([5, 10, 15, 20])
print(np.sum(a))
print(np.mean(a))
```

練習 4

```python
import numpy as np
b = np.array([[1, 2], [3, 4]])
print(b[0][1])
```

練習 5

```python
import numpy as np
print(np.zeros(3))
print(np.ones(4))
print(np.arange(1, 6))
```
