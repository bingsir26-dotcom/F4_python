# 第 28 課：Decision Tree 與 Random Forest——由規則到多棵樹

> **本課主題：用可讀的條件規則分類資料，再認識多個模型投票的概念。**
>
> 決策樹像一連串「如果……就……」的問題；Random Forest 則集合很多棵不同的樹，以投票方式降低單棵樹偶然判斷的影響。

## 今課可以做到甚麼？

完成這一課後，你可以：

- 訓練並查看一棵簡單決策樹；
- 理解 Random Forest 的投票想法；
- 比較可解釋性與預測穩定性。

## 開始前：想一想

要判斷是否適合參加戶外活動，你可能先問「是否下雨」，再問「溫度是否太高」。這種逐步問問題的方式像不像一棵樹？

## 新概念

### 1. Decision Tree

每個節點提出一個條件，例如「練習時間 ≤ 1.5？」；沿著答案走到最後，葉節點給出類別。它容易解釋，但太深時容易過擬合。

### 2. Random Forest

Random Forest 訓練許多略有不同的決策樹，再讓它們投票。通常比單棵深樹穩定，但較難把所有規則完全說清楚。

![樹模型的核心概念：條件、葉節點、多棵樹、投票](/images/lesson-28-trees-forest.svg)

## 跟著做：例子 1——建立一棵可查看的決策樹

```python
from sklearn.tree import DecisionTreeClassifier, export_text

X = [[0.5, 2], [1.0, 3], [1.5, 4], [2.0, 8], [2.5, 9], [3.0, 10]]
y = [0, 0, 0, 1, 1, 1]

tree = DecisionTreeClassifier(max_depth=2, random_state=0)
tree.fit(X, y)

print(export_text(tree, feature_names=["練習小時", "題目數"]))
```

### 預期輸出／結果

畫面會顯示一組文字條件。它告訴你模型在這組小資料上先依哪一個特徵分組。

### 逐行解釋

`export_text()` 把樹的條件輸出成文字。`max_depth=2` 保持規則不會太長，較容易閱讀。

## 再試一次：例子 2——改用 Random Forest 作預測

```python
from sklearn.ensemble import RandomForestClassifier

forest = RandomForestClassifier(n_estimators=50, random_state=0)
forest.fit(X, y)
print(forest.predict([[1.8, 7]]))
```

`n_estimators=50` 表示建立 50 棵樹。最後的分類來自這些樹的整體結果，而不是只看一棵。

## 易錯位

### ❌ 把樹上的規則當成自然定律

規則是模型從目前訓練資料學得的，不一定適用於所有新情況。

### ❌ 樹太深卻沒有測試

深樹可把訓練資料切得很細，亦更容易過擬合。請配合第 26、27 課的測試方法。

## 你來做

### 基礎題

改變 `max_depth` 為 1、3，比較輸出的規則長度。

### 標準題

把 `n_estimators` 改成 10 和 100，以相同資料預測同一筆資料。

### 挑戰題

選一個生活決策，把它寫成兩層 if／else 規則，並說明其限制。

## 本課小結

1. 決策樹以一連串條件作分類。
2. Random Forest 集合多棵樹投票，通常較穩定。
3. 可解釋性、複雜度和測試表現都要一起考慮。

## 離堂前 3 分鐘

1. 決策樹的葉節點代表甚麼？
2. Random Forest 為甚麼要有多棵樹？
3. 為甚麼深度大的樹要特別小心？

## 自我檢查

- 我能否看懂簡單的樹規則？
- 我知道多棵樹不是多次複製同一答案嗎？
- 我會否用測試資料檢查樹模型嗎？
