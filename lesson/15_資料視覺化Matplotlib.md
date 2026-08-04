<!-- 由 python.docx 拆分；原始 Word 檔保留不變。 -->

# 第 3 節：資料視覺化入門（Matplotlib）

這一節讓學生把前兩節處理和分析的資料，轉換成容易閱讀的圖表。圖表能把數字變成視覺資訊，幫助學生比較數據、觀察變化和找出關係；Matplotlib 是 Python 常用的繪圖工具，pyplot 提供了直接建立圖表的方式。

## 1. 學習目標

完成本課後，學生應能：

認識資料視覺化的用途。

匯入 matplotlib.pyplot。

使用 plot() 製作折線圖。

使用 bar() 製作長條圖。

使用 scatter() 製作散點圖。

為圖表加入標題、座標軸名稱和圖例。

根據圖表說出簡單的資料結論。

## 2. 什麼是資料視覺化？

資料視覺化（Data Visualization）就是把數字、表格資料變成圖表。

例如，下面兩種資料其實意思一樣：

| 班級 | 平均分 |
| --- | --- |
| F4A | 81.25 |
| F4B | 73.13 |

變成長條圖後，會更容易一眼看出 F4A 的平均分比較高。

你可以跟學生說：

表格適合看準確數字，圖表適合看差異、趨勢和關係。

## 3. 為什麼需要畫圖？

畫圖可以幫我們回答不同問題：

| 想問的問題 | 適合的圖表 |
| --- | --- |
| 哪一班平均分最高？ | 長條圖 |
| 成績隨時間有沒有進步？ | 折線圖 |
| 數學高的人，英文通常會不會也高？ | 散點圖 |
| 不同分數範圍有多少人？ | 直方圖（下節可教） |

本課先學最常用的三種：

折線圖。

長條圖。

散點圖。

Matplotlib 可建立折線圖、長條圖和散點圖等常見圖表。

## 4. 匯入 Matplotlib

使用 Matplotlib 前，要先匯入：

```python
import matplotlib.pyplot as plt
```

plt 是 pyplot 的常用簡寫。

基本畫圖流程：

```python
import matplotlib.pyplot as plt

# 畫圖程式

plt.show()
plt.show() 的作用是把圖表顯示出來。
```

## 5. 折線圖：觀察變化趨勢

折線圖（Line Chart）適合用來觀察數據隨時間、次數或順序的變化。plot() 會把各個資料點連成線。

## 5.1 基本折線圖

```python
import matplotlib.pyplot as plt

tests = [1, 2, 3, 4, 5]
scores = [60, 68, 72, 80, 85]

plt.plot(tests, scores)

plt.show()
```

這張圖代表一位學生在五次測驗中的成績變化。

X 軸：第幾次測驗。

Y 軸：分數。

折線向上：成績有進步趨勢。

## 5.2 加上標題和座標軸名稱

```python
import matplotlib.pyplot as plt

tests = [1, 2, 3, 4, 5]
scores = [60, 68, 72, 80, 85]

plt.plot(tests, scores)

plt.title("Test Score Trend")
plt.xlabel("Test Number")
plt.ylabel("Score")

plt.show()
```

常用設定：

| 程式 | 作用 |
| --- | --- |
| plt.title() | 設定圖表標題 |
| plt.xlabel() | 設定 X 軸名稱 |
| plt.ylabel() | 設定 Y 軸名稱 |
| plt.show() | 顯示圖表 |

## 5.3 加上資料點和格線

```python
import matplotlib.pyplot as plt

tests = [1, 2, 3, 4, 5]
scores = [60, 68, 72, 80, 85]

plt.plot(tests, scores, marker="o")

plt.title("Test Score Trend")
plt.xlabel("Test Number")
plt.ylabel("Score")
plt.grid()

plt.show()
marker="o"：在每個資料位置加圓點。
plt.grid()：顯示格線，方便閱讀數值。
```

## 6. 長條圖：比較不同類別

長條圖（Bar Chart）適合比較不同班級、不同學生、不同科目或不同類別的數值。

## 6.1 基本長條圖

```python
import matplotlib.pyplot as plt

classes = ["F4A", "F4B", "F4C"]
averages = [81.25, 73.13, 78.50]

plt.bar(classes, averages)

plt.show()
```

這張圖可以直接比較不同班級的平均分。

## 6.2 加上標題與座標軸

```python
import matplotlib.pyplot as plt

classes = ["F4A", "F4B", "F4C"]
averages = [81.25, 73.13, 78.50]

plt.bar(classes, averages)

plt.title("Class Average Score")
plt.xlabel("Class")
plt.ylabel("Average Score")

plt.show()
```

## 6.3 長條圖設定顏色

```python
import matplotlib.pyplot as plt

classes = ["F4A", "F4B", "F4C"]
averages = [81.25, 73.13, 78.50]

plt.bar(classes, averages, color="skyblue")

plt.title("Class Average Score")
plt.xlabel("Class")
plt.ylabel("Average Score")

plt.show()
```

初學時可讓學生改變不同顏色，增加興趣：

```python
color="red"
color="green"
color="orange"
```

## 6.4 用 pandas 的 groupby() 結果畫長條圖

這部分是與上一節最重要的銜接。

```python
import pandas as pd
import matplotlib.pyplot as plt

data = {
    "姓名": ["Tom", "Mary", "John", "Alice", "Ben", "Cindy"],
    "班級": ["F4A", "F4A", "F4A", "F4B", "F4B", "F4B"],
    "平均分": [77.5, 89, 71, 87.5, 62.5, 80]
}

df = pd.DataFrame(data)

class_average = df.groupby("班級")["平均分"].mean()

plt.bar(class_average.index, class_average.values)

plt.title("Class Average Score")
plt.xlabel("Class")
plt.ylabel("Average Score")

plt.show()
```

程式分解：

```python
class_average.index
```

取得班級名稱，例如 F4A、F4B。

```python
class_average.values
```

取得各班平均分數。

## 7. 散點圖：觀察兩組數字的關係

散點圖（Scatter Plot）適合用來觀察兩個數值欄位之間有沒有關係。每一個點代表一筆資料，例如一位學生的數學與英文成績。

## 7.1 基本散點圖

```python
import matplotlib.pyplot as plt

math_scores = [80, 90, 72, 85, 60, 78, 55, 92]
english_scores = [75, 88, 70, 90, 65, 82, 58, 95]

plt.scatter(math_scores, english_scores)

plt.show()
```

這張圖中：

X 軸：數學分數。

Y 軸：英文分數。

每個點：一位學生。

## 7.2 加上標題和座標軸

```python
import matplotlib.pyplot as plt

math_scores = [80, 90, 72, 85, 60, 78, 55, 92]
english_scores = [75, 88, 70, 90, 65, 82, 58, 95]

plt.scatter(math_scores, english_scores)

plt.title("Math vs English Scores")
plt.xlabel("Math Score")
plt.ylabel("English Score")

plt.grid()

plt.show()
```

學生可以觀察：

點大致由左下向右上分布：兩科可能有正向關係。

點很分散：兩科關係可能不明顯。

出現很遠的點：可能是特別案例或異常資料。

散點圖可顯示兩個數值變量的關係、分布或群集情況。

## 7.3 用 DataFrame 畫散點圖

```python
import pandas as pd
import matplotlib.pyplot as plt

data = {
    "姓名": ["Tom", "Mary", "John", "Alice", "Ben", "Cindy"],
    "數學": [80, 90, 72, 85, 60, 78],
    "英文": [75, 88, 70, 90, 65, 82]
}

df = pd.DataFrame(data)

plt.scatter(df["數學"], df["英文"])

plt.title("Math vs English Scores")
plt.xlabel("Math Score")
plt.ylabel("English Score")

plt.show()
```

這個例子是從 pandas DataFrame 直接取欄位畫圖，最貼近真正數據分析流程。

## 8. 中文顯示問題

Matplotlib 的預設字型在部分環境中可能不能正確顯示中文，因此圖表的中文標題或中文座標軸有機會出現方框或亂碼。

如果學校電腦已安裝適合字型，可嘗試：

```python
import matplotlib.pyplot as plt

plt.rcParams["font.sans-serif"] = ["Microsoft JhengHei"]
plt.rcParams["axes.unicode_minus"] = False
```

如果仍不能正確顯示，初學階段建議暫時使用英文標題與欄名，例如：

```python
plt.title("Class Average Score")
plt.xlabel("Class")
plt.ylabel("Score")
```

## 9. 完整示範：班級成績分析圖

下面的程式會：

建立成績表。

計算每班平均分。

畫出班級平均分長條圖。

畫出數學與英文成績散點圖。

```python
import pandas as pd
import matplotlib.pyplot as plt

data = {
    "姓名": ["Tom", "Mary", "John", "Alice", "Ben", "Cindy", "David", "Eva"],
    "班級": ["F4A", "F4A", "F4A", "F4A", "F4B", "F4B", "F4B", "F4B"],
    "數學": [80, 90, 72, 85, 60, 78, 55, 92],
    "英文": [75, 88, 70, 90, 65, 82, 58, 95]
}

df = pd.DataFrame(data)

df["平均分"] = (df["數學"] + df["英文"]) / 2

# 第一張圖：各班平均分
class_average = df.groupby("班級")["平均分"].mean()

plt.bar(class_average.index, class_average.values, color="skyblue")
plt.title("Class Average Score")
plt.xlabel("Class")
plt.ylabel("Average Score")
plt.ylim(0, 100)
plt.show()

# 第二張圖：數學和英文的關係
plt.scatter(df["數學"], df["英文"], color="orange")
plt.title("Math vs English Scores")
plt.xlabel("Math Score")
plt.ylabel("English Score")
plt.grid()
plt.show()
```

## 10. 如何選擇圖表？

| 資料情況 | 適合圖表 | 例子 |
| --- | --- | --- |
| 想看數字隨時間的變化 | 折線圖 | 五次測驗成績 |
| 想比較不同類別 | 長條圖 | 各班平均分 |
| 想看兩個數字是否有關係 | 散點圖 | 數學與英文成績 |
| 想看分數集中在哪些範圍 | 直方圖 | 全班成績分布 |

## 11. 常見錯誤

錯誤 1：忘記 plt.show()

```python
plt.bar(classes, averages)
```

在部分環境中，沒有 plt.show() 可能不會顯示圖表。

正確：

```python
plt.bar(classes, averages)
plt.show()
```

錯誤 2：X 軸和 Y 軸資料數量不同

```python
x = [1, 2, 3]
y = [70, 80]
plt.plot(x, y)
```

X 軸和 Y 軸資料必須一一對應，所以數量要相同。

錯誤 3：散點圖把文字放到數值軸

```python
plt.scatter(df["姓名"], df["英文"])
```

散點圖通常適合兩組數字資料。  
如果 X 軸是姓名這類文字分類，通常較適合用長條圖。

錯誤 4：圖表沒有標題或軸名稱

沒有標題和座標軸名稱，其他人很難理解圖表在表達什麼。

建議至少加入：

```python
plt.title("...")
plt.xlabel("...")
plt.ylabel("...")
```

## 12. 課堂活動設計

活動一：圖表配對

老師展示問題，學生選擇最合適圖表：

| 問題 | 學生選擇 |
| --- | --- |
| 哪一班平均分最高？ | 長條圖 |
| 小明五次測驗有沒有進步？ | 折線圖 |
| 數學高分的學生英文是否也高？ | 散點圖 |

活動二：數據圖表偵探

給學生一張圖，請他們回答：

圖表標題是什麼？

X 軸代表什麼？

Y 軸代表什麼？

可以看出什麼趨勢？

有沒有特別高、特別低或奇怪的資料？

活動三：班級成績圖表挑戰

學生使用上一節的成績 DataFrame，完成：

畫出各班平均分長條圖。

畫出數學和英文散點圖。

根據兩張圖，各寫一句結論。

例如：

F4A 的平均分高於 F4B。

數學和英文成績大致呈正向關係，但仍要更多資料才能判斷。

## 13. 課後練習

使用以下資料：

```python
import pandas as pd
import matplotlib.pyplot as plt

data = {
    "姓名": ["Amy", "Bob", "Chris", "Daisy", "Eric", "Fiona", "Gary", "Helen"],
    "班級": ["F4A", "F4A", "F4A", "F4A", "F4B", "F4B", "F4B", "F4B"],
    "數學": [85, 70, 65, 92, 58, 88, 75, 95],
    "英文": [80, 68, 72, 90, 60, 85, 70, 98]
}

df = pd.DataFrame(data)

df["平均分"] = (df["數學"] + df["英文"]) / 2
```

基礎題

使用折線圖畫出以下五次測驗成績：

```python
tests = [1, 2, 3, 4, 5]
scores = [65, 70, 68, 78, 85]
```

為折線圖加入標題、X 軸名稱、Y 軸名稱和格線。

按班級計算平均分，畫出長條圖。

為長條圖加入適當標題和座標軸名稱。

進階題

畫出數學與英文成績散點圖。

根據散點圖，用一句話描述兩科成績是否看起來有關係。

修改長條圖顏色。

將長條圖 Y 軸範圍設定為 0 到 100：

```python
plt.ylim(0, 100)
```

挑戰題

製作一張圖，比較 F4A 和 F4B 的數學平均分與英文平均分。

為圖表加上圖例 plt.legend()。

## 14. 課堂小結

資料視覺化的目的不是讓圖表變漂亮，而是讓數據更容易理解。

學生本課應記住：

折線圖看趨勢，長條圖作比較，散點圖看關係。

學完本節後，學生已完成一個基本數據分析流程：

讀取資料 → 清洗資料 → 統計與分組 → 畫圖 → 解讀結果

下一節可接：

完整數據分析小專題：從 CSV 資料到分析報告。
