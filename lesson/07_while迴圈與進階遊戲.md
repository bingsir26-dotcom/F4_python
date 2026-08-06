# 第 7 課：`while` 迴圈與進階遊戲

> **本課主題：只要條件仍然成立，程式就繼續運行。**
>
> `for` 適合已知要重複幾次的工作；不知道玩家第幾次才答對時，`while` 就很有用。

## 今課可以做到甚麼？

完成這一課後，你可以：

- 用 `while` 讓程式在條件成立時重複執行；
- 用計數器控制重複次數；
- 用 `break` 結束猜數字遊戲。

## 開始前：想一想

猜數字時，玩家可能第一次答對，也可能第十次才答對。

```text
只要還沒答對，就繼續讓玩家猜；
答對後，遊戲立即結束。
```

你猜 Python 怎樣知道「還要不要再問一次」？

## 新概念

### 1. `while`：條件成立就重複

```python
count = 1

while count <= 3:
    print("第", count, "次挑戰")
    count = count + 1
```

輸出是：

```text
第 1 次挑戰
第 2 次挑戰
第 3 次挑戰
```

每次重複後，`count = count + 1` 會令計數器增加，最後 `count <= 3` 不成立，迴圈停止。

![while 迴圈：檢查條件、執行、更新資料、再檢查](/images/lesson-07-while-loop.svg)

### 2. 不更新條件會造成無限迴圈

```python
count = 1

while count <= 3:
    print(count)
```

這個程式沒有令 `count` 改變，所以條件永遠成立，會不停輸出 `1`。如果不小心遇到這種情況，在 Jupyter 可按停止按鈕中斷執行。

### 3. `break`：立即離開迴圈

`while True` 表示條件永遠成立，因此要配合 `break` 在適當時候離開。

```python
while True:
    command = input("輸入 q 離開：")

    if command == "q":
        break

    print("你輸入了：", command)
```

輸入 `q` 時，`break` 會立即結束整個 `while` 迴圈。

### 4. 指令要完全一樣

目前程式只把完全輸入 `q` 視為離開指令；若輸入 ` q `（前後有空格），它不會離開。這一課先練習把指令輸入得準確；第 8 課會學習怎樣整理文字輸入。

## 跟著做：例子 1——三次密碼挑戰

```python
password = "python"
attempt = 1

while attempt <= 3:
    guess = input("請輸入密碼：")

    if guess == password:
        print("登入成功！")
        break
    else:
        print("密碼不正確。")

    attempt = attempt + 1
```

### 逐行解釋

```python
attempt = 1
while attempt <= 3:
```

從第一次挑戰開始，只要挑戰次數不超過 3，就繼續詢問密碼。

```python
if guess == password:
    print("登入成功！")
    break
```

猜中時顯示成功訊息，再用 `break` 跳出迴圈，不用再問下一次。

```python
attempt = attempt + 1
```

猜錯後才把次數加一，為下一次挑戰準備。

## 再試一次：例子 2——猜數字直到答對

把固定密碼改成數字答案：

```python
answer = 7

while True:
    guess = int(input("猜一個 1 至 10 的數字："))

    if guess == answer:
        print("答對了！")
        break
    elif guess > answer:
        print("太大了。")
    else:
        print("太小了。")
```

這次不知道玩家要猜多少次，但只要未猜中，迴圈就會繼續。

## 易錯位

### ❌ 忘記更新計數器

**錯誤寫法**

```python
count = 1
while count <= 3:
    print(count)
```

`count` 永遠是 `1`，程式不會自己停下來。

**✅ 改成這樣**

```python
count = 1
while count <= 3:
    print(count)
    count = count + 1
```

### ❌ `break` 沒有縮排在判斷內

**錯誤寫法**

```python
while True:
    guess = input("猜：")
break
```

`break` 必須位於迴圈內，而且通常要放在某個 `if` 的縮排區塊。

**✅ 改成這樣**

```python
while True:
    guess = input("猜：")
    if guess == "q":
        break
```

### ❌ 把比較寫成 `=`

在 `if guess == answer:` 中，兩個等號才是比較。單一 `=` 是放入資料。

### ❌ 輸入的指令不完全相同

```python
command = input("輸入 q 離開：")
if command == "q":
    break
```

這裡只有完全輸入 `q` 才會離開；`Q`、` q ` 都是不同文字。

**✅ 現在的做法：** 先準確輸入小寫的 `q`。第 8 課會學習怎樣整理文字輸入。

## 你來做

### 基礎題：倒數到 1

從 `count = 5` 開始，用 `while` 顯示 5、4、3、2、1。

### 標準題：輸入密碼直到正確

設定固定密碼，讓使用者一直輸入，答對時顯示「成功」並用 `break` 結束。

### 挑戰題：三次猜數字

限制玩家最多猜 3 次；每次顯示「太大」或「太小」，答對或次數用完後停止。

## 本課小結

1. `while` 在條件成立時重複執行；條件不成立時停止。
2. 計數器必須更新，否則可能出現無限迴圈。
3. `break` 可以立即離開目前的迴圈；指令文字必須完全符合判斷條件。

## 離堂前 3 分鐘

1. `while hp > 0:` 代表程式在甚麼情況下會繼續？
2. 為甚麼計數器要更新？
3. `break` 的作用是甚麼？

## 自我檢查

- 我能否說出 `for` 和 `while` 的分別？
- 我能否寫出一個有計數器的 `while`？
- 我知道如何安全地結束 `while True` 嗎？
