# 第 39 課：IOAI 專題與模擬——公平比較、記錄和報告

> **本課主題：用同一份資料比較兩個模型設定，並完成一份可以重現和解釋的小型 AI 實驗報告。**
>
> IOAI 風格的解難不只追求一個最高分。你還要說清楚問題、資料、方法、比較條件、錯誤和限制，讓別人可以重做你的實驗。

## 今課可以做到甚麼？

- 設計只改一項主要設定的公平比較；
- 用相同資料分割實際比較兩個 KNN 設定；
- 保存實驗結果，找出較高分設定並寫出不能由分數得出的結論。

## 開始前：想一想

模型 A 的準確率是 0.947，模型 B 是 0.953。只看這兩個數字，能否斷言 B 一定較好？

還要問：兩者是否看過相同的訓練資料？測試集是否相同？錯誤是哪一類？如果換一次資料分割，結果仍然相同嗎？

## 新概念

### 1. 公平實驗：一次只改一個主要設定

若比較 KNN 的 `k=1` 和 `k=5`，資料、訓練／測試分割、評估方法和 random seed 應保持相同。這樣結果不同時，才較容易知道差異可能來自 `k`。

### 2. 一份完整記錄要包含甚麼

至少記錄：

1. 問題和資料集；
2. 資料怎樣分割；
3. 模型和改動的設定；
4. 測試指標和錯誤例子；
5. 限制和下一步。

![以同一份鳶尾花資料比較兩個 KNN 設定，並保存成可重現的實驗記錄](/images/lesson-39-ioai-project.svg)

## 跟著做：例子 1——用相同測試資料比較兩個 KNN 設定

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data,
    iris.target,
    test_size=0.25,
    random_state=12,
    stratify=iris.target
)

experiments = []
for k in [1, 5]:
    model = KNeighborsClassifier(n_neighbors=k)
    model.fit(X_train, y_train)
    prediction = model.predict(X_test)
    score = accuracy_score(y_test, prediction)

    experiments.append({
        "model": "KNN",
        "setting": f"k={k}",
        "accuracy": round(score, 3),
        "random_state": 12
    })

for experiment in experiments:
    print(experiment)
```

### 預期輸出／結果

你會看到兩筆 Dictionary。兩次實驗都使用同一個資料分割，只有 `k` 改變；測試準確率可能不同。

這裡的 `random_state=12` 不是讓模型一定正確，而是固定資料怎樣分割，令比較條件一致。

### 逐行解釋

`experiments` 是用來保存記錄的 List。每次迴圈建立一個 KNN、用相同 `X_train` 和 `X_test` 計算準確率，再把設定和結果保存成 Dictionary。

這種寫法把「實驗」和「報告資料」放在同一個流程中，日後可再加入模型名稱、執行時間、錯誤類別等欄位。

## 再試一次：例子 2——找出較高分設定，但不誇大結果

**先執行例子 1**，再加入以下程式：

```python
best = max(experiments, key=lambda item: item["accuracy"])

print("這次測試中較高分：", best["setting"])
print("準確率：", best["accuracy"])
print("注意：這只代表這次資料分割，不代表永遠最好。")
```

`max(..., key=...)` 只是幫我們從記錄中找出最高值。真正報告仍要列出全部實驗、資料限制和錯誤類型，不能只留下勝出的那一筆。

## 易錯位

### ❌ 每次實驗同時改很多設定

若同時換資料、模型、`k` 和評估方法，結果改變時很難知道原因。

**✅ 修正：** 一次先改一個主要設定，其餘條件保持一致。

### ❌ 用測試集反覆挑選設定

若每次都看測試分數再改模型，測試集便逐漸變成練習題。

**✅ 修正：** 用驗證集選設定，最後才用測試集作總結；第 34 課已介紹這個分工。

### ❌ 只報告最高分

最高分不會告訴你錯在哪裡、是否能重現，以及模型在其他資料上會否失效。

### ❌ 把一次實驗的結果當成定律

一次固定分割只能回答「在這個條件下的結果」。若結果很重要，應使用更多資料或不同分割再次檢查。

## 你來做

### 基礎題：增加一個設定

把 `k=3` 加入實驗列表，保存三筆結果並比較。

### 標準題：補充報告欄位

在 Dictionary 加入 `"data": "iris"` 和 `"test_size": 0.25`，讓別人更容易重現你的實驗。

### 挑戰題：完成一頁 IOAI 風格摘要

寫出問題、資料、方法、全部實驗結果、限制和下一步。不要只寫「準確率最高，所以模型最好」。

## 本課小結

1. 公平實驗要保持大部分條件相同，一次只改一個主要設定。
2. 實驗記錄讓結果可以重做、比較和解釋。
3. 最高準確率只是一次觀察，必須連同錯誤、資料和限制一起報告。

## 離堂前 3 分鐘

1. 比較兩個模型時，為甚麼要使用相同測試資料？
2. `random_state` 在本例的作用是甚麼？
3. 為甚麼報告不能只保留最高分的實驗？

## 自我檢查

- 我能否設計只改一項設定的比較？
- 我會否記錄資料分割、模型設定和測試方法？
- 我能否在結論中寫出結果的限制，而不是誇大模型能力？
