# 第 40 課：Tuple 與 Set——不同用途的資料集合

> **本課主題：在需要固定順序或需要去除重複時，選擇比 List 更合適的資料結構。**
>
> List 已足夠完成很多工作；Tuple 和 Set 不必硬記，但在特定解難情境會令程式更自然。

## 今課可以做到甚麼？

完成這一課後，你可以：

- 分辨 List、Tuple 和 Set 的用途；
- 建立不可修改的 Tuple；
- 用 Set 去除重複資料和做集合運算。

## 開始前：想一想

同一份點名紀錄中有重複名字時，怎樣快速找出曾經出現過的不同名字？又有些座標資料不應在程式中被意外修改，該用甚麼結構？

## 新概念

### 1. Tuple：固定的一組資料

Tuple 用小括號建立，例如 `point = (3, 5)`。它有順序、可用索引讀取，但通常不能直接修改，適合表示固定座標、顏色或日期組合。

### 2. Set：不重複的資料集合

Set 用大括號建立，例如 `{1, 2, 3}`。它自動移除重複資料，但沒有固定順序，不能用 `set[0]` 取第一項。

![Tuple 與 Set 的核心概念：固定、去重、交集、差集](/images/lesson-40-tuple-set.svg)

## 跟著做：例子 1——用 Set 找出不重複的技能

```python
skills = ["Python", "Excel", "Python", "AI", "Excel"]
unique_skills = set(skills)

print(unique_skills)
print(len(unique_skills))
```

### 預期輸出／結果

輸出順序可能不同，但只會保留 Python、Excel、AI 三項。

### 逐行解釋

`set(skills)` 把 List 轉成 Set，重複元素自動合併。不要依賴輸出順序；Set 的重點是成員是否存在。

## 再試一次：例子 2——比較兩組興趣

```python
club_a = {"Python", "AI", "Robotics"}
club_b = {"AI", "Design", "Python"}

print(club_a & club_b)
print(club_a - club_b)
```

`&` 找交集，即兩組都有的興趣；`-` 找只在左邊 Set 出現的資料。

## 易錯位

### ❌ 以為 Set 有固定位置

```python
print(unique_skills[0])
```

Set 沒有索引；若要按次序顯示，可先轉成 List。

### ❌ 單元素 Tuple 忘記逗號

`(5)` 只是數字；單元素 Tuple 要寫 `(5,)`。

## 你來做

### 基礎題

把一個有重複數字的 List 轉成 Set，找出不同數字數量。

### 標準題

建立兩個班的活動 Set，找出兩班共同活動。

### 挑戰題

建立 `point = (4, 7)`，讀取兩個座標；再嘗試修改其中一項並解釋結果。

## 本課小結

1. Tuple 適合固定、有次序的資料。
2. Set 適合去重和集合比較。
3. Set 不保證順序，也不能用索引讀取。

## 離堂前 3 分鐘

1. Tuple 和 List 的可修改性有何不同？
2. Set 最適合解決甚麼問題？
3. `club_a & club_b` 代表甚麼？

## 自我檢查

- 我能否選擇合適的集合結構？
- 我知道為甚麼 Set 輸出順序可能不同嗎？
- 我能否用 Set 去除重複資料？
