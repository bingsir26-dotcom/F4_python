# 第 31 課：Tensor 與 PyTorch——神經網絡的數字容器

> **本課主題：認識 Tensor，並用 PyTorch 進行基本數值運算。**
>
> pandas 的 DataFrame 適合有欄位名稱的表格；深度學習常把大量數字放進 Tensor，交給模型和硬件加速運算。

## 今課可以做到甚麼？

完成這一課後，你可以：

- 建立一維和二維 Tensor；
- 查看 Tensor 的形狀與資料類型；
- 進行基本 Tensor 運算。

## 開始前：想一想

一張彩色圖片可看成很多像素數字，一段聲音也可看成很多取樣數字。要讓神經網絡處理它們，應如何整齊保存這麼多數字？

## 新概念

### 1. Tensor 是多維數字資料

Scalar 是單一數字，Vector 是一列數字，Matrix 是二維表格；Tensor 是更一般的多維資料容器。圖片常見形狀如 `[高度, 闊度, 顏色]` 或 `[批次, 顏色, 高度, 闊度]`。

### 2. PyTorch

PyTorch 是深度學習常用工具。它的 Tensor 可支援自動微分和 GPU 運算；本課先在 CPU 上理解資料形狀。

> **環境提醒：** 請使用課堂指定的 PyTorch 環境。若顯示 `ModuleNotFoundError`，不要自行混合不同安裝指令，先確認環境。

![Tensor 的核心概念：數字、形狀、維度、運算](/images/lesson-31-tensors-pytorch.svg)

## 跟著做：例子 1——建立和查看 Tensor

```python
import torch

scores = torch.tensor([78, 65, 91])
board = torch.tensor([[1, 2, 3], [4, 5, 6]])

print(scores)
print(board.shape)
print(board.dtype)
```

### 預期輸出／結果

`scores` 是一維 Tensor；`board.shape` 顯示 `torch.Size([2, 3])`，代表 2 列、3 欄。

### 逐行解釋

`torch.tensor()` 把 Python List 轉成 Tensor。`shape` 是閱讀深度學習資料時非常重要的資訊：形狀錯誤，模型通常不能執行。

## 再試一次：例子 2——Tensor 的逐項運算

```python
bonus = torch.tensor([2, 2, 2])
new_scores = scores + bonus
print(new_scores)
print(scores.mean())
```

相同形狀的 Tensor 可逐項相加；`mean()` 計算平均值。原本的 `scores` 不會因為建立 `new_scores` 而被改變。

## 易錯位

### ❌ 忽略資料形狀

`[3]` 和 `[1, 3]` 看似都有三個數字，但維度不同。模型要求哪種形狀，必須先看清楚。

### ❌ 把 Tensor 當成自動有欄位名稱的表格

Tensor 主要保存數字和形狀；欄位意義要靠變數名稱、文件或額外資料說明。

## 你來做

### 基礎題

建立包含四個數字的一維 Tensor，顯示其形狀和平均值。

### 標準題

建立 3×2 Tensor，找出它的列數和欄數。

### 挑戰題

用自己的話解釋 DataFrame 和 Tensor 各適合處理哪種資料。

## 本課小結

1. Tensor 是可有多個維度的數字容器。
2. `shape` 告訴我們每個維度的大小。
3. PyTorch Tensor 支援深度學習需要的數值運算。

## 離堂前 3 分鐘

1. `torch.Size([2, 3])` 代表甚麼？
2. 為甚麼深度學習常重視形狀？
3. Tensor 是否自動知道每一欄代表甚麼？

## 自我檢查

- 我能否建立 Tensor 並查看 `shape`？
- 我能否分清一維和二維資料？
- 我會否在模型報錯時先檢查形狀？
