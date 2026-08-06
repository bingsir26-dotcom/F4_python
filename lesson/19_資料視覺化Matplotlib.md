# 第 19 課：資料視覺化——用圖表說故事

> **本課主題：選對圖表，讓別人一眼看見資料想說的事。**
>
> 表格適合查找精確數字；圖表適合比較、觀察變化和發現關係。這一課會由一個清楚問題開始，再選擇合適的圖表回答它。

## 今課可以做到甚麼？

- 分辨長條圖、折線圖和散點圖適合回答甚麼問題；
- 畫出一張有標題和座標軸名稱的圖；
- 用一至兩句話說出圖表顯示的發現。

## 開始前：想一想

如果要比較 F4A 和 F4B 的平均數學分，下面哪種呈現最容易看出高低？

```text
F4A：75.7
F4B：74.3
```

還是兩根高度不同的長條？兩種方法都有用；但要快速比較類別，長條圖通常更直觀。

### 先猜一猜

把問題和圖表配對：

1. 「本星期每日閱讀分鐘有何變化？」
2. 「兩班平均分誰較高？」
3. 「閱讀時間較長的學生，英文分數是否也較高？」

答案：1 用折線圖、2 用長條圖、3 用散點圖。

## 新概念

### 1. 先問問題，再選圖

| 想回答的問題 | 較合適的圖 |
|---|---|
| 比較不同類別的高低 | 長條圖 |
| 觀察按時間的變化 | 折線圖 |
| 觀察兩組數字是否有關係 | 散點圖 |

### 2. Matplotlib 是畫圖工具

```python
import matplotlib.pyplot as plt
```

`plt` 是 `matplotlib.pyplot` 的常用簡稱。畫圖後使用：

```python
plt.show()
```

才會把圖顯示在畫面。

### 3. 圖表要能讓人讀懂

最少要有：

- 清楚標題；
- x 軸和 y 軸代表甚麼；
- 與問題相符的圖表種類。

![三種圖表和它們適合回答的問題](/images/lesson-19-chart-choice.svg)

## 跟著做：例子 1——畫出兩班平均數學分

```python
import matplotlib.pyplot as plt

class_names = ["F4A", "F4B"]
math_means = [75.7, 74.3]

plt.bar(class_names, math_means, color=["#4f9f8b", "#7aa7d9"])
plt.title("Class Average Math Score")
plt.xlabel("Class")
plt.ylabel("Average score")
plt.ylim(0, 100)
plt.show()
```

### 預期結果

畫面會出現兩根長條，F4A 略高於 F4B。y 軸由 0 開始，方便公平比較高度。

### 逐行解釋

```python
class_names = ["F4A", "F4B"]
math_means = [75.7, 74.3]
```

準備兩組同樣長度的 List：班別名稱對應各班平均分。

```python
plt.bar(class_names, math_means)
```

畫出長條圖。第一個 List 放在 x 軸，第二個 List 決定長條高度。

```python
plt.title(...)
plt.xlabel(...)
plt.ylabel(...)
```

加入標題和座標軸名稱，令讀圖的人知道資料代表甚麼。

```python
plt.show()
```

顯示圖表。忘記這一行時，某些環境不會出現圖。

## 再試一次：例子 2——改成觀察每天的變化

只把圖表函式和資料意義改掉。以下版本包含載入畫圖工具，可由第一行單獨執行：

```python
import matplotlib.pyplot as plt

days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
reading_minutes = [20, 35, 30, 50, 45]

plt.plot(days, reading_minutes, marker="o", color="#4f9f8b")
plt.title("Daily Reading Time")
plt.xlabel("Day")
plt.ylabel("Minutes")
plt.ylim(0, 60)
plt.show()
```

`plt.plot()` 會把資料點連起來，較適合看隨日子變化的趨勢。

## 易錯位

### ❌ x 軸和 y 軸資料數量不同

```python
class_names = ["F4A", "F4B"]
math_means = [75.7, 74.3, 80.0]
plt.bar(class_names, math_means)
```

**原因：** 兩個 List 無法一一對應。

**✅ 修正：** 兩邊都放兩筆，或兩邊都放三筆資料。

### ❌ 忘記 `plt.show()`

```python
plt.bar(class_names, math_means)
```

**✅ 修正：** 畫圖後補上：

```python
plt.show()
```

### ❌ 圖表和問題不相符

要比較班別平均分時，折線圖容易讓人誤以為 F4A 和 F4B 是連續時間；長條圖通常較清楚。

## 你來做

### 本課可獨立執行：先準備資料

如果你是新開一個 Notebook，先執行以下完整 cell；它會建立本課畫圖會用到的班別平均分：

```python
import pandas as pd
import matplotlib.pyplot as plt

student_data = {
    "姓名": ["Alex", "Chris", "May", "Sam", "Lily", "Ken"],
    "班別": ["F4A", "F4A", "F4B", "F4B", "F4A", "F4B"],
    "數學": [78, 65, 91, 72, 84, 60],
    "英文": [82, 70, 88, 69, 90, 74]
}

scores_df = pd.DataFrame(student_data)
class_math_mean = scores_df.groupby("班別")["數學"].mean()
```

每次獨立開新 Notebook 時，都請先執行本課上方的完整資料建立程式，再使用 `class_math_mean`。不要假設上一課的變數仍然存在。

### 基礎題：畫三人的分數比較圖

用長條圖畫出三位同學的數學分數，圖表要有標題和 y 軸名稱。

### 標準題：從 DataFrame 分組結果畫圖

使用上方已準備的 `class_math_mean`，把各班數學平均分畫成長條圖。提示：可使用：

```python
plt.bar(class_math_mean.index, class_math_mean.values)
```

### 挑戰題：用圖表說一句話

自行選擇長條圖、折線圖或散點圖，畫出一個你想問的問題，並在圖下寫出：

1. 這張圖回答甚麼問題？
2. 你從圖中發現甚麼？

如果想觀察兩組數字是否有關係，可先試這個延伸骨架：

```python
reading_minutes = [20, 35, 30, 50, 45]
english_scores = [65, 74, 70, 88, 82]

plt.scatter(reading_minutes, english_scores, color="#4f9f8b")
plt.xlabel("Reading minutes")
plt.ylabel("English score")
plt.ylim(0, 100)
plt.show()
```

## 本課小結

1. 長條圖適合比較類別；折線圖適合觀察時間變化；散點圖適合看兩組數字的關係。
2. Matplotlib 常用 `import matplotlib.pyplot as plt` 載入。
3. 好圖表要有清楚問題、標題和座標軸名稱。

## 離堂前 3 分鐘

1. 要比較兩班平均分，較適合使用甚麼圖？
2. `plt.show()` 的作用是甚麼？
3. 折線圖通常適合觀察哪一類資料？

## 自我檢查

- 我會否先想清楚問題，再選擇圖表？
- 我能否讀懂 `plt.bar(x, y)` 的 x 和 y 分別代表甚麼？
- 我的圖表有沒有標題和座標軸名稱？
