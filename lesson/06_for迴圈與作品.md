<!-- 由 python.docx 拆分；原始 Word 檔保留不變。 -->

# 第 6 課：for 迴圈（Loop）與作品

## 6.1 為什麼需要迴圈？

先用問題引入：

👉 如果有 100 個分數，你還要這樣寫嗎？

```python
total = scores[0] + scores[1] + scores[2] ...
```

👉 太麻煩！

✅ 解決方法：for 迴圈（自動重複做）

## 6.2 for 迴圈基本語法

```python
for 變量 in 列表:
```

要做的事

## 6.3 基本例子

```python
scores = [80, 90, 70]

for s in scores:
    print(s)
```

👉 會一個一個印出來

## 6.4 加入計算（重點）

```python
scores = [80, 90, 70]

total = 0

for s in scores:
    total = total + s

print("總分：", total)
```

## 6.5 計算平均（完整）

```python
scores = [80, 90, 70]

total = 0

for s in scores:
    total = total + s

avg = total / len(scores)

print("平均：", avg)
```

## 6.6 range()（進階一點）

```python
for i in range(5):
    print(i)
```

👉 輸出：  
0 1 2 3 4

## 6.7 常見錯誤

❌ 忘記縮排  
❌ 變量寫錯  
❌ 不理解「每次跑一個」

🎮 第 6 課作品：成績管理系統（簡單版）

👉 結合：input + list + for + if

功能：

輸入多個成績

顯示所有成績

計算平均

判斷及格人數

範例程式（學生可完成）

```python
scores = []

# 輸入 3 個成績
for i in range(3):
    s = int(input("輸入成績："))
    scores.append(s)

print("所有成績：", scores)

# 計算平均
total = 0
for s in scores:
    total = total + s

avg = total / len(scores)
print("平均：", avg)

# 計算及格人數
count = 0
for s in scores:
    if s >= 60:
        count = count + 1

print("及格人數：", count)
```

🧠 可升級（給強一點學生）

👉 加等級：

```python
for s in scores:
    if s >= 90:
        print("A")
    elif s >= 80:
        print("B")
    elif s >= 60:
        print("C")
    else:
        print("F")
```

🎯 課堂任務設計（建議你用）

基礎任務

印出列表所有數字

計算總和

進階任務

計算平均

數及格人數

挑戰任務（加分）

顯示最高分（提示：自己想）

加等級系統

🔥 教學建議（這課超重要）

這一課你可以這樣帶：

用「100 個數據」問題引爆

先只做 print（超簡單）

再加 total（學生會驚訝）

最後做完整作品

👉 重點不是語法，是「重複的概念」
