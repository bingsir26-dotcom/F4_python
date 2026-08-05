# 第 37 課：NLP 入門——把文字變成可分析的資料

> **本課主題：把文字處理成數字特徵，完成最小文字分類示範。**
>
> 模型不能直接理解一段文字的意思；它需要先把詞語、字元或 token 轉成可計算的表示，再從大量例子學習規律。

## 今課可以做到甚麼？

完成這一課後，你可以：

- 說出文字前處理和向量化的目的；
- 使用 CountVectorizer 建立文字特徵；
- 訓練簡單的文字分類模型。

## 開始前：想一想

「很好看」和「不好看」只差一個字，意思卻相反。電腦要怎樣把一段文字轉成能用來分類的數字？

## 新概念

### 1. 向量化

最簡單做法是計算詞語是否出現或出現多少次，形成 bag-of-words 特徵。它忽略語序和部分語意，但適合入門示範。

### 2. Token 與資料偏差

英文可先以詞語為單位；中文斷詞較複雜，常需要指定工具。文字模型容易學到訓練資料偏見，應檢查錯誤與資料來源。

![NLP 的核心概念：文字、token、向量、分類](/images/lesson-37-nlp-basics.svg)

## 跟著做：例子 1——把評論轉成詞語計數

```python
from sklearn.feature_extraction.text import CountVectorizer

texts = ["good game", "great game", "bad game", "boring game"]
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts)

print(vectorizer.get_feature_names_out())
print(X.toarray())
```

### 預期輸出／結果

輸出詞語清單和每段文字的數字表示。每一列對應一段文字，每一欄對應一個詞語。

### 逐行解釋

`fit_transform()` 先從訓練文字建立詞彙表，再把每段文字轉成數字矩陣。`toarray()` 只適合這種很小的示範資料。

## 再試一次：例子 2——訓練簡單情感分類器

```python
from sklearn.naive_bayes import MultinomialNB

labels = [1, 1, 0, 0]
model = MultinomialNB()
model.fit(X, labels)

new_text = vectorizer.transform(["good game"])
print(model.predict(new_text))
```

重要規則：新文字必須用已訓練好的同一個 `vectorizer` 轉換，不能重新 `fit`，否則詞彙欄位不一致。

## 易錯位

### ❌ 對測試文字重新 `fit_transform()`

這會建立另一套詞彙欄位，模型無法正確比較。測試／新文字要用 `transform()`。

### ❌ 以少量例子宣稱模型懂語言

四句示範只為理解流程；真實語言有否定、語境、拼寫、諷刺和偏見等難題。

## 你來做

### 基礎題

加入兩句新評論，重新訓練並觀察詞彙表。

### 標準題

把 `good game` 改成一段未見過詞語的文字，觀察模型限制。

### 挑戰題

用一句話說明 `fit_transform()` 和 `transform()` 的差別。

## 本課小結

1. 文字需先向量化成數字特徵。
2. 訓練文字建立詞彙表；新文字只可用相同工具 transform。
3. 入門 bag-of-words 有明顯限制，不能等同理解語意。

## 離堂前 3 分鐘

1. 為甚麼模型不能直接處理原始句子？
2. 為甚麼新資料不能重新 fit？
3. 詞語次序在 bag-of-words 中是否被完整保留？

## 自我檢查

- 我能否把文字轉成特徵矩陣？
- 我知道 train 和 test 要共用 vectorizer 嗎？
- 我不會把小型文字示範誤解為真正語言理解嗎？
