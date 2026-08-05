# 第 49 課：Python 解難綜合實作——比賽模擬

> **本課主題：在有限時間內讀題、設計測試、完成程式，並把多個 Python 工具用在同一個問題上。**

## 今課可以做到甚麼？

完成這一課後，你可以：

- 按輸入、處理、輸出的順序拆解一條題目；
- 選擇 List、Dictionary、迴圈或檔案工具完成問題；
- 用測試資料和錯誤訊息在交卷前檢查程式。

## 開始前：想一想

比賽題目不會告訴你「這題要用 for」或「這題要用 Dictionary」。讀到一段文字題目時，第一步應該寫程式，還是先找出輸入、規則和輸出？

## 新概念

### 1. 比賽解題的固定節奏

1. 圈出**輸入**是甚麼；
2. 用自己的話重寫規則；
3. 決定要保存甚麼資料；
4. 用小例子手算預期輸出；
5. 才開始寫程式；
6. 最後測試正常、邊界和特殊資料。

### 2. 工具不是越多越好

- 要逐個處理一串資料：`for`；
- 要按名稱保存資料：Dictionary；
- 要累加或計數：設定初始值；
- 要整理真實表格：CSV、pandas；
- 要讀寫結構資料：JSON 或檔案。

選擇剛好足夠的工具，會令程式較容易檢查。

![Python 解難綜合實作——比賽模擬概念圖](/images/lesson-49-contest-simulation.svg)

## 跟著做：例子 1——模擬題：統計合格人數

```python
# 輸入例子：55 72 88 49 60
scores = [int(value) for value in input("輸入分數：").split()]

passed_count = 0
highest_score = 0

for score in scores:
    if score >= 60:
        passed_count = passed_count + 1
    if score > highest_score:
        highest_score = score

print("合格人數：", passed_count)
print("最高分：", highest_score)
```

### 預期輸出／結果

```text
輸入分數：55 72 88 49 60
合格人數： 3
最高分： 88
```

### 逐行解釋

先把一行輸入以空白拆開，再用 `int()` 轉成數字 List。`passed_count` 是計數模式，`highest_score` 是最大值模式。這題的邊界測試包括只有一個分數、全部不及格，以及剛好 60 分。

## 再試一次：例子 2——模擬題：由 JSON 資料找出平均最高的學生

```python
import json

text = '''[
  {"name": "Amy", "scores": [80, 90]},
  {"name": "Ben", "scores": [88, 86]},
  {"name": "Chris", "scores": [70, 95]}
]'''
students = json.loads(text)

best_name = ""
best_average = -1

for student in students:
    average = sum(student["scores"]) / len(student["scores"])
    if average > best_average:
        best_average = average
        best_name = student["name"]

print(best_name)
print(best_average)
```

### 這次改了甚麼？

這題同時使用 JSON、List、Dictionary、迴圈和最大值模式。`best_average = -1` 是刻意選的初始值：正常分數不會低於它。若題目容許空的 `scores`，便要先處理除以 0 的情況。

## 易錯位

### ❌ 一開始便急著寫程式

**原因：** 沒有確認輸入格式和規則時，容易寫出正確的程式但解錯題。

**修正方法：** 先用自己的話寫下輸入、處理、輸出和至少一組手算例子。

### ❌ 忘記邊界情況

**原因：** 例如 60 分、空清單、只有一項、重複資料，最容易暴露條件寫錯。

**修正方法：** 每題交卷前至少測試一個邊界值。

### ❌ 輸出多了題目沒有要求的文字

**原因：** 自動評測通常只比較指定輸出，額外提示可能導致錯誤。

**修正方法：** 比賽版程式移除 `input()` 提示和說明文字，完全跟隨題目格式。

## 你來做

### 基礎題

基礎題：輸入一行整數，輸出偶數的總和。

### 標準題

標準題：輸入多個英文名字，使用 Dictionary 統計每個名字出現次數。

### 挑戰題

挑戰題：用 CSV 或 JSON 設計一題 20 分鐘小題，提供題目、範例輸入輸出、3 組測試資料和自己的答案。

## 本課小結

1. 解題先釐清輸入、規則和輸出，再選資料結構和迴圈。
2. 小例子、邊界值和輸出格式是交卷前的必要檢查。
3. 比賽範圍中的語法、檔案、JSON、CSV、Pandas、NumPy、OOP 和爬蟲，都是為了解決實際問題。

## 離堂前 3 分鐘

1. 讀題後應先確認哪三件事？
2. 為甚麼自動評測時不應加入多餘提示文字？
3. 例子 1 的 60 分在測試甚麼？

## 自我檢查

- 我能否從題目分辨輸入、處理和輸出？
- 我會否用小資料手算答案？
- 交卷前我會否檢查邊界值和輸出格式？
