<!-- 由 python.docx 拆分；原始 Word 檔保留不變。 -->

# 第 7 課：while 迴圈與進階遊戲

## 7.1 什麼是 while？

while 是「只要條件成立，就一直重複執行」。

👉 和 for 的差別：

for：跑固定次數

while：條件控制（不一定幾次）

## 7.2 基本語法

```python
while 條件:
```

要做的事

## 7.3 基本例子

```python
i = 0

while i < 5:
    print(i)
    i = i + 1
```

👉 如果沒有 i = i + 1 會怎樣？  
✅ 會變「無限迴圈」（電腦一直跑）

## 7.4 無限迴圈（概念）

```python
while True:
    print("一直跑")
```

👉 通常要搭配「停止條件」

## 7.5 break（中止迴圈）

```python
while True:
    x = input("輸入 exit 離開：")

    if x == "exit":
        break
```

👉 break = 強制停止

🎮 小遊戲：無限猜數字（升級版）

👉 比第 4 課更好玩（可以一直猜）

基本版

```python
answer = 7

while True:
    guess = int(input("猜數字："))

    if guess == answer:
        print("答對了！")
        break
    elif guess > answer:
        print("太大了")
    else:
        print("太小了")
```

升級版（計算次數）

```python
answer = 7
count = 0

while True:
    guess = int(input("猜數字："))
    count = count + 1

    if guess == answer:
        print("答對了！")
        print("你猜了", count, "次")
        break
    elif guess > answer:
        print("太大了")
    else:
        print("太小了")
```

## 7.6 加入隨機（進階，超有趣🔥）

```python
import random

answer = random.randint(1, 10)
```

👉 每次答案不同（學生會很有感）

🎯 第 7 課作品：猜數字終極版

功能：

隨機答案

無限猜

提示大小

顯示次數

👉 完整版本：

```python
import random

answer = random.randint(1, 10)
count = 0

while True:
    guess = int(input("請猜 1-10："))
    count = count + 1

    if guess == answer:
        print("答對了！")
        print("次數：", count)
        break
    elif guess > answer:
        print("太大")
    else:
        print("太小")
```

## 7.7 常見錯誤

忘記更新變量（變無限迴圈）

忘記 break

縮排錯誤

🧠 課堂任務設計

基礎

用 while 印 1–5

進階

做猜數字（固定答案）

挑戰

加入 random

顯示猜幾次

🔥 教學建議（這課關鍵）

你可以這樣帶：

先問：「怎樣讓程式一直跑？」

示範 while（故意做無限迴圈😆）

再教 break（解救程式）

直接做猜數字

👉 這一課會「很好玩」，氣氛通常很好
