# 第 25 課：KNN 與 Logistic Regression——同一問題，兩種分類方法

> **本課主題：用同一份資料比較兩種分類模型，理解模型可有不同判斷方式。**
>
> 第 24 課的 KNN 會參考附近例子。這一課再認識另一種常用模型 Logistic Regression：它先從整份資料學習一條大致分界，再為新資料選類別。

## 今課可以做到甚麼？

- 用同一份氣溫資料訓練兩種分類模型；
- 為一筆新氣溫取得服裝類別建議；
- 用自己的話說出 KNN 與 Logistic Regression 的不同想法。

## 開始前：想一想

同樣要為 21°C 選擇「長袖」或「短袖」，可以有兩種做法：

1. 看看最接近的幾天穿了甚麼；
2. 先根據全部已知天氣，找出大約在哪個溫度附近應改穿短袖。

兩種方法都可用資料作分類；它們不一定每次得到相同答案。

## 新概念

### 1. KNN：預測時看附近例子

KNN（K-Nearest Neighbors）在新資料出現時，找出最接近的 `k` 筆已知資料，再以較多的類別作決定。

### 2. Logistic Regression：先學習大致分界

Logistic Regression 會先從訓練資料學習不同類別的大致分界。它的名稱有「Regression」，但它在這裡是用來做**分類**，不要和第 23 課預測連續數字的線性迴歸混淆。

![同一組氣溫資料可用 KNN 或 Logistic Regression 作分類](/images/lesson-25-knn-logistic.svg)

這一課不需要學公式；重點是知道：**同一問題可以嘗試不同模型，但比較時要使用相同資料和相同新問題。**

## 跟著做：例子 1——KNN 看附近的天氣

```python
from sklearn.neighbors import KNeighborsClassifier

# 每一筆輸入是 [氣溫（°C）]
temperatures = [[12], [15], [18], [23], [26], [30]]
outfits = ["長袖", "長袖", "長袖", "短袖", "短袖", "短袖"]
new_temperature = [[21]]

knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(temperatures, outfits)

prediction = knn.predict(new_temperature)
print("KNN 的建議：", prediction[0])
```

### 預期輸出

```text
KNN 的建議： 短袖
```

### 逐行解釋

`temperatures` 和 `outfits` 是同一批已知例子。21°C 附近的三筆資料是 18°C、23°C、26°C，其中兩筆是「短袖」，所以這個 KNN 模型輸出「短袖」。

`new_temperature` 保持 `[[21]]` 的格式：一筆新資料，內有一個特徵。

## 再試一次：例子 2——換成 Logistic Regression

**先執行例子 1**，讓 `temperatures`、`outfits` 和 `new_temperature` 已經存在，再加入以下程式：

```python
from sklearn.linear_model import LogisticRegression

logistic = LogisticRegression()
logistic.fit(temperatures, outfits)

prediction = logistic.predict(new_temperature)
print("Logistic Regression 的建議：", prediction[0])
```

這次模型會根據整份資料學到的分界作判斷。在這組簡化資料中，兩個模型都輸出「短袖」；換一組資料或換一筆新氣溫，結果有可能不同。

## 易錯位

### ❌ 用不同資料比較兩個模型

若兩個模型看到的訓練資料不同，或回答的是不同新問題，便不能公平比較。

**✅ 修正：** 兩個模型都使用 `temperatures`、`outfits`，並都預測 `new_temperature`。

### ❌ 以為模型名稱已經說明哪個一定較好

沒有模型在所有問題上永遠最好。要先看問題、資料和測試結果。

### ❌ 把 Logistic Regression 當成預測連續數字

在本課，它輸出的是「長袖／短袖」類別；它不是第 23 課那種預測房價的線性迴歸。

## 你來做

### 基礎題：改變新氣溫

把 `[[21]]` 改成 `[[16]]`、`[[24]]` 和 `[[28]]`，比較兩個模型的輸出。

### 標準題：改變 KNN 的參考數量

把 `n_neighbors` 改成 1 和 5。哪一個設定較容易受單一附近例子影響？

### 挑戰題：用一句話比較

完成句子：KNN 在預測時＿＿＿＿；Logistic Regression 在預測前＿＿＿＿。

## 本課小結

1. 不同模型可以處理同一個分類問題。
2. KNN 參考附近例子；Logistic Regression 學習整體分界。
3. 比較模型時，要使用相同資料和相同測試條件。

## 離堂前 3 分鐘

1. KNN 的 `n_neighbors=3` 是甚麼意思？
2. Logistic Regression 在本課輸出的是數字還是類別？
3. 為甚麼兩個模型要回答同一筆新資料才可比較？

## 自我檢查

- 我能否用同一份資料運行兩種模型？
- 我能否說出兩種模型的基本想法？
- 我會否先測試再判斷哪個模型較合適？
