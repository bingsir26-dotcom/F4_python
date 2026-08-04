<!-- 由 python.docx 拆分；原始 Word 檔保留不變。 -->

# 第 5 課：列表（List）

## 5.1 什麼是列表？

列表（List）就是「可以存很多資料的容器」。

👉 前面學的變量：

```python
a = 10
```

👉 列表可以這樣：

```python
scores = [80, 90, 70]
```

👉 一個變量，裝很多值

## 5.2 列表的基本操作

取得資料（很重要）

```python
scores = [80, 90, 70]

print(scores[0])   # 80
print(scores[1])   # 90
```

⚠️ 重點：

從 0 開始！（一定要強調）

修改資料

```python
scores[0] = 100
print(scores)
```

查看長度

```python
print(len(scores))   # 有幾個元素
```

## 5.3 列表可以放什麼？

```python
a = [1, 2, 3]
b = ["Tom", "Mary"]
c = [1, "Tom", True]
```

👉 可以混合（但初學建議先單一類型）

## 5.4 常用功能（實用）

加入資料

```python
scores = [80, 90]
scores.append(100)

print(scores)
```

刪除資料（簡單版）

```python
scores.pop()
print(scores)
```

👉 刪除最後一個

## 5.5 小練習（立即操作）

✅ 練習 1  
建立一個列表存 3 個數字，印出第一個

✅ 練習 2  
修改第二個數字

✅ 練習 3  
加入一個新數字

## 5.6 小應用：計算平均（進階一點）

```python
scores = [80, 90, 70]

total = scores[0] + scores[1] + scores[2]
avg = total / 3

print("平均：", avg)
```

👉 可引導學生思考：  
「如果有 100 個怎麼辦？」（為第6課鋪路：迴圈）

## 5.7 input + 列表（實用）

```python
scores = []

a = int(input("輸入分數1："))
b = int(input("輸入分數2："))
c = int(input("輸入分數3："))

scores.append(a)
scores.append(b)
scores.append(c)

print(scores)
```

## 5.8 小遊戲：班級點名（簡單又有趣）

```python
students = ["Tom", "Mary", "John"]

print("第一位：", students[0])
print("第二位：", students[1])
```

✅ 延伸玩法：

改名字

加新同學

隨機點名（之後可接 random）

## 5.9 常見錯誤

❌ 超出範圍

```python
scores = [80, 90]
print(scores[2])   # 錯
```

❌ 忘記從 0 開始

## 5.10 教學建議（這課重點）

這一課你可以這樣帶：

先問：「如果有 30 個分數怎麼存？」

引出列表

強調 index = 從 0 開始（用圖或排隊）

做 append（學生會很有感）

用「平均」引出問題（為迴圈鋪路）

✅ 課堂任務（推薦）

建立一個「購物清單」

```python
items = ["apple", "banana"]
```

加入 2 個商品

印出第一個商品

顯示總共有幾個商品
