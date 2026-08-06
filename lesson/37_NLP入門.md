# 第 37 課：NLP 入門——把文字變成可分析的資料

> **本課主題：把英文評論轉成詞語計數，完成一個最小文字分類示範。**
>
> 電腦不能直接把一句話當成可以計算的數字。入門方法之一是先建立詞彙表，再記錄每句話出現了哪些詞語；這是一種有用但有限的表示方法。

## 今課可以做到甚麼？

- 說出文字向量化要解決的問題；
- 用 `CountVectorizer` 把句子轉成特徵矩陣；
- 用同一套詞彙表訓練和測試一個簡單分類器。

## 開始前：想一想

「good game」和「bad game」只有一個詞不同，電腦要怎樣知道這個詞的改變可能影響評論分類？

如果我們把每一個詞變成一個欄位，便可以把文字轉成數字矩陣。

## 新概念

### 1. Bag-of-words：只先數詞語

`CountVectorizer` 會從訓練句子建立詞彙表，每個詞成為一個欄位，再計算每句話出現各詞的次數。

這種方法不會完整保留詞語次序，也未必理解否定、諷刺或真正語意，但很適合第一次看文字如何變成數字。

![四句英文評論先建立詞彙表，再變成可供分類器使用的數字矩陣](/images/lesson-37-nlp-basics.svg)

### 2. 訓練和新文字必須使用同一套欄位

訓練句子建立詞彙表時使用 `fit_transform()`；新的句子只使用 `transform()`。如果重新建立另一套詞彙表，模型便不知道每一欄的意義是否仍相同。

中文還涉及分詞、字詞粒度和粵語／書面語差異；本課先使用簡短英文例子，集中理解向量化流程。

## 跟著做：例子 1——查看評論的詞彙表和矩陣

```python
from sklearn.feature_extraction.text import CountVectorizer

texts = [
    "good game",
    "great fun",
    "bad game",
    "boring game"
]

vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts)

print("詞彙表：", vectorizer.get_feature_names_out())
print("特徵矩陣：")
print(X.toarray())
```

### 預期輸出

詞彙表會包含 `bad`、`boring`、`fun`、`game`、`good`、`great` 等欄位。每一行代表一句評論；例如「good game」那一行在 `good` 和 `game` 欄位會有 1。

### 逐行解釋

`fit_transform()` 先閱讀四句文字，建立固定詞彙表，再把四句文字轉成數字矩陣。`X.toarray()` 只是方便我們在課堂上直接看出 0 和 1。

矩陣的行和列有固定意義：行是句子，列是詞彙。這正是後面的分類器可以讀取的資料格式。

## 再試一次：例子 2——訓練最小評論分類器

**先執行例子 1**，再加入以下程式：

```python
from sklearn.naive_bayes import MultinomialNB

# 1 代表較正面，0 代表較負面
labels = [1, 1, 0, 0]
model = MultinomialNB()
model.fit(X, labels)

new_text = ["good game"]
new_X = vectorizer.transform(new_text)
prediction = model.predict(new_X)[0]
print("預測類別：", prediction)
```

本例通常會輸出 `1`。模型是從四句示範文字學到詞語和標籤的關係，不代表它真正理解所有評論。

## 易錯位

### ❌ 對新文字重新 `fit_transform()`

這會重新建立詞彙欄位，欄位次序可能不同，模型便不能正確使用原來的權重或統計。

**✅ 修正：** 訓練資料使用 `fit_transform()`，新資料使用原有 `vectorizer.transform()`。

### ❌ 以為 bag-of-words 理解了句子

「not good」和「good」可能共享 `good` 欄位；詞語次序和否定關係沒有被完整表示。

### ❌ 用四句資料宣稱模型懂語言

少量例子只用來示範程式流程。真實系統要有更多、更多元和經過檢查的資料，還要分析不同群體可能受到的影響。

## 你來做

### 基礎題：加入一個詞

新增一句包含 `excellent` 的評論，重新執行例子 1，查看詞彙表多了甚麼。

### 標準題：測試未見文字

把 `new_text` 改成 `"terrible game"`，記錄模型的預測，並說明它只看過哪些詞。

### 挑戰題：解釋限制

用一句話說明為甚麼 `"not good"` 不一定會被這個簡單模型正確理解。

## 本課小結

1. 向量化把文字轉成行列清楚的數字特徵。
2. 訓練資料建立詞彙表；新文字只使用同一套欄位。
3. Bag-of-words 是入門工具，不等於模型真正理解語意。

## 離堂前 3 分鐘

1. `fit_transform()` 比 `transform()` 多做了甚麼？
2. 特徵矩陣的行和列各代表甚麼？
3. 為甚麼四句示範文字不能證明模型懂語言？

## 自我檢查

- 我能否讀懂文字特徵矩陣的行和列？
- 我知道訓練和新文字要共用同一個 vectorizer 嗎？
- 我能否說出 bag-of-words 的一項限制？
