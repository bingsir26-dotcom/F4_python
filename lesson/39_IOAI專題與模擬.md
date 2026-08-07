# 第 39 課：IOAI 專題與模擬——公平比較、記錄和報告

> **本課主題：把資料分成訓練、驗證和最後測試三部分，完成一份可以重現和解釋的小型 AI 實驗報告。**
>
> IOAI 風格的解難不只追求一個最高分。你還要說清楚問題、資料、方法、比較條件、錯誤和限制，讓別人可以重做你的實驗。

## 今課可以做到甚麼？

- 設計只改一項主要設定的公平比較；
- 用**驗證資料**比較兩個 KNN 設定；
- 選定設定後，只用一次保留的**測試資料**作最後檢查。

## 開始前：想一想

模型 A 的準確率是 0.947，模型 B 是 0.953。只看這兩個數字，能否斷言 B 一定較好？

還要問：兩者是否看過相同的訓練資料？選擇設定時有沒有偷看最後測試集？錯誤是哪一類？如果換一次資料分割，結果仍然相同嗎？

## 新概念

### 1. 三份資料，各有不同工作

- **訓練集（train）**：讓模型學習；
- **驗證集（validation）**：比較設定，例如 KNN 的 `k=1` 或 `k=5`；
- **測試集（test）**：選好設定後才使用一次，作最後總結。

若在每次調整時都看測試分數，測試集會逐漸變成練習題，最後的分數便不再是真正的未知資料檢查。

### 2. 一份完整記錄要包含甚麼

至少記錄：

1. 問題和資料集；
2. 資料怎樣分割；
3. 模型和改動的設定；
4. 驗證結果、最後測試結果和錯誤例子；
5. 限制和下一步。

![鳶尾花資料先分成訓練、驗證和最後測試；先用驗證資料比較 KNN 設定，最後才用測試資料總結](/images/lesson-39-ioai-project.svg)

## 跟著做：例子 1——用驗證資料比較兩個 KNN 設定

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

iris = load_iris()
X_train_val, X_test, y_train_val, y_test = train_test_split(
    iris.data,
    iris.target,
    test_size=0.25,
    random_state=12,
    stratify=iris.target
)

X_train, X_val, y_train, y_val = train_test_split(
    X_train_val,
    y_train_val,
    test_size=1 / 3,
    random_state=12,
    stratify=y_train_val
)

experiments = []
for k in [1, 5]:
    model = KNeighborsClassifier(n_neighbors=k)
    model.fit(X_train, y_train)
    validation_score = accuracy_score(y_val, model.predict(X_val))

    experiments.append({
        "model": "KNN",
        "setting": f"k={k}",
        "validation_accuracy": round(validation_score, 3),
        "random_state": 12
    })

for experiment in experiments:
    print(experiment)
```

### 預期輸出／結果

你會看到兩筆 Dictionary。兩次實驗的訓練資料、驗證資料和 random seed 都相同，只有 `k` 改變。

第一個 `train_test_split()` 把資料分成 75% 的「訓練＋驗證資料」和 25% 的最後測試資料；第二個再從前者分出訓練和驗證資料。因此本例約有 50% train、25% validation、25% test。

### 逐行解釋

`X_test` 和 `y_test` 在例子 1 **完全沒有參與比較**。`experiments` 保存的是每個 `k` 在驗證集的結果，所以我們是在驗證集而不是測試集選設定。

`random_state=12` 不是讓模型一定正確，而是固定資料怎樣分割，令比較條件一致。

## 再試一次：例子 2——選定設定後，才作一次最後測試

**先執行例子 1**，再加入以下程式：

```python
best = max(experiments, key=lambda item: item["validation_accuracy"])
selected_k = int(best["setting"].split("=")[1])

final_model = KNeighborsClassifier(n_neighbors=selected_k)
final_model.fit(X_train_val, y_train_val)
final_test_score = accuracy_score(y_test, final_model.predict(X_test))

print("驗證集較高分設定：", best["setting"])
print("最後一次測試準確率：", round(final_test_score, 3))
print("注意：測試分數只用來總結，不再用來換另一個 k。")
```

`max(..., key=...)` 只從**驗證結果**選出這次較高分的設定。選定 `k` 後，模型可重新使用全部 `X_train_val` 學習；最後才在一直保留的 `X_test` 做一次測試。

若兩個設定同分，`max()` 會保留先出現的一個。本課要學的是資料分工，不是把 0.001 的差異說成永久勝負。

## 易錯位

### ❌ 每次實驗同時改很多設定

若同時換資料、模型、`k` 和評估方法，結果改變時很難知道原因。

**✅ 修正：** 一次先改一個主要設定，其餘條件保持一致。

### ❌ 用測試集反覆挑選設定

若每次都看測試分數再改模型，測試集便逐漸變成練習題。

**✅ 修正：** 用驗證集選設定，最後才用測試集作一次總結；第 34 課已介紹這個分工。

### ❌ 只報告最高分

最高分不會告訴你錯在哪裡、是否能重現，以及模型在其他資料上會否失效。

### ❌ 把一次實驗的結果當成定律

一次固定分割只能回答「在這個條件下的結果」。若結果很重要，應使用更多資料或不同分割再次檢查。

## 你來做

### 基礎題：增加一個設定

把 `k=3` 加入實驗列表，保存三筆**驗證集**結果並比較。

### 標準題：補充報告欄位

在 Dictionary 加入 `"data": "iris"`、`"train_size"` 和 `"validation_size"`，讓別人更容易重現你的實驗。

### 挑戰題：完成一頁 IOAI 風格摘要

寫出問題、資料分割、方法、全部驗證結果、最後測試結果、限制和下一步。不要只寫「準確率最高，所以模型最好」。

## 本課小結

1. train 用來學習，validation 用來選設定，test 留到最後一次檢查。
2. 公平實驗要保持大部分條件相同，一次只改一個主要設定。
3. 最高準確率只是一次觀察，必須連同錯誤、資料和限制一起報告。

## 離堂前 3 分鐘

1. 為甚麼不能用測試集選擇 `k`？
2. `random_state` 在本例的作用是甚麼？
3. 選定 `k` 後，最後測試集可以用多少次？

## 自我檢查

- 我能否分辨 train、validation 和 test 的工作？
- 我能否設計只改一項設定的比較？
- 我能否在結論中寫出結果的限制，而不是誇大模型能力？
