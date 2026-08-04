<!-- 由 python.docx 拆分；原始 Word 檔保留不變。 -->

# 第 3 課：input() 與計算

## 3.1 input()

```python
name = input("請輸入名字：")
print(name)
```

## 3.2 重點：input 是字串

```python
age = input("年齡：")
print(type(age))   # str
```

## 3.3 常見錯誤

```python
a = input("數字：")
b = input("數字：")

print(a + b)
```

👉 輸入 10 和 20 → 1020

## 3.4 正確做法

```python
a = int(input("數字："))
b = int(input("數字："))

print(a + b)
```

## 3.5 練習

✅ 練習 1：兩數相加  
✅ 練習 2：三科平均

```python
math = int(input("數學："))
english = int(input("英文："))
science = int(input("科學："))

avg = (math + english + science) / 3
print(avg)
```
