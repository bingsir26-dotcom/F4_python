# 第 25 課：KNN 與 Logistic Regression——兩種分類想法

> **本課主題：比較「參考附近例子」與「學習分類機率」兩種常見分類模型。**
>
> 同一份資料可以用不同模型處理。模型沒有永遠最好的一個，重點是知道它依甚麼方式作判斷，並用測試比較結果。

## 今課可以做到甚麼？

完成這一課後，你可以：

- 用 KNN 和 Logistic Regression 做相同分類任務；
- 看懂兩個模型的不同思路；
- 以相同測試資料公平比較模型。

## 開始前：想一想

新同學加入一班時，你會看他最接近哪幾位同學，還是畫一條規則線把兩群分開？這兩種思路都可成為分類模型。

## 新概念

### 1. KNN：看附近的例子

KNN 不急於先寫出一條固定公式；它在預測時找最接近的訓練例子，再以多數決分類。資料尺度不同時，距離會受影響。

### 2. Logistic Regression：估計屬於某類的機率

Logistic Regression 會根據特徵學習分界，並可用 `predict_proba()` 取得各類別的估計機率。機率仍是模型估計，不是保證。

![兩種分類模型的核心概念：KNN、機率、特徵、比較](/images/lesson-25-knn-logistic.svg)

## 跟著做：例子 1——以兩個特徵訓練 KNN

```python
from sklearn.neighbors import KNeighborsClassifier

# [每天練習小時, 完成題目數]
X = [[0.5, 2], [1.0, 3], [1.5, 4], [2.0, 8], [2.5, 9], [3.0, 10]]
y = [0, 0, 0, 1, 1, 1]

knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X, y)
print(knn.predict([[1.8, 7]]))
```

### 預期輸出／結果

輸出會是一個預測類別，例如 `[1]`。

### 逐行解釋

每筆資料現在有兩個特徵，因此新資料也必須寫成 `[[1.8, 7]]`。KNN 會比較這筆資料和訓練資料的距離。

## 再試一次：例子 2——改用 Logistic Regression

```python
from sklearn.linear_model import LogisticRegression

logistic = LogisticRegression()
logistic.fit(X, y)

print(logistic.predict([[1.8, 7]]))
print(logistic.predict_proba([[1.8, 7]]))
```

第一行預測類別；第二行顯示模型估計屬於每個類別的機率。兩個模型對同一筆資料可能相同，也可能不同。

## 易錯位

### ❌ 用不同資料比較兩個模型

若 KNN 和 Logistic Regression 使用不同訓練資料或不同測試資料，結果不能公平比較。

### ❌ 把機率當成信心保證

預測機率高，只表示模型在它看到的資料規律下較傾向某類；訓練資料偏差時，高機率也可能錯。

## 你來做

### 基礎題

把 KNN 的 `n_neighbors` 改成 1 和 5，觀察同一筆資料結果是否改變。

### 標準題

改變新資料的兩個特徵，找一筆讓兩個模型預測不同的資料（若有）。

### 挑戰題

用一句話說明 KNN 和 Logistic Regression 的分類想法有甚麼不同。

## 本課小結

1. KNN 以附近例子作多數判斷；Logistic Regression 學習分類機率與分界。
2. 比較模型時，要使用同一問題、同一資料和同一評估方法。
3. 機率是估計，仍須配合測試資料檢查。

## 離堂前 3 分鐘

1. 兩個特徵的新資料要寫成怎樣的結構？
2. KNN 的 `n_neighbors` 改變了甚麼？
3. 為甚麼不能只憑一個機率就完全相信模型？

## 自我檢查

- 我能否以同一份資料運行兩種模型？
- 我能否說出兩種模型的主要差異？
- 我知道公平比較需要相同測試條件嗎？
