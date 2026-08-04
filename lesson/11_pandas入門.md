<!-- 由 python.docx 拆分；原始 Word 檔保留不變。 -->

# pandas 入門：DataFrame 與常用操作

## 5. 建立 DataFrame

```python
import pandas as pd

data = {
    "姓名": ["Tom", "Mary", "John"],
    "成績": [80, 90, 75]
}

df = pd.DataFrame(data)
print(df)
```

DataFrame 很像 Excel 表格，有欄名和列資料。learncodewithmike+2

## 6. 常用操作

## 6.1 查看前幾筆

```python
print(df.head())
```

## 6.2 查看欄位名稱

```python
print(df.columns)
```

## 6.3 查看資料形狀

```python
print(df.shape)
```

## 6.4 取得某一欄

```python
print(df["成績"])
```

## 6.5 計算平均

```python
print(df["成績"].mean())
```

這些都是最常用的入門操作。vocus+3

## 7. pandas 能做什麼？

pandas 很適合：

讀取 CSV / Excel。

整理成績表。

分析學生資料。

做簡單統計。

清理缺失資料。w3schools+4

## 8. 課後練習

練習 1  
建立一個 DataFrame，包含三位學生的姓名和分數。

練習 2  
印出資料表前五筆。

練習 3  
計算分數欄的平均值。

練習 4  
新增一欄「是否及格」，自己設計內容。

練習 5  
查看 DataFrame 的欄位名稱和形狀。

pandas 選擇題

題目

1. pandas 主要用來做什麼？  
A. 玩遊戲  
B. 資料處理與分析  
C. 畫圖  
D. 打開音樂

2. pandas 的常見簡寫是什麼？  
A. pd  
B. pn  
C. np  
D. ds

3. DataFrame 是什麼？  
A. 一維字串  
B. 二維表格資料  
C. 一個圖片檔  
D. 一個變量名稱

4. df.head() 的作用是什麼？  
A. 顯示最後幾筆  
B. 顯示前幾筆  
C. 計算平均  
D. 刪除資料

5. pandas 很常用來處理什麼檔案？  
A. .mp3  
B. .jpg  
C. .csv  
D. .exe

參考答案

B

A

B

B

C
