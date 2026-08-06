# 第 31 課：Tensor 與 PyTorch——把數字排成模型看得懂的形狀

> **本課主題：把 Python 的數字資料轉成 Tensor，並讀懂資料的形狀。**
>
> 前面用過 List、DataFrame 和 NumPy 陣列。神經網絡同樣處理數字，但通常用 Tensor 保存；它不是神秘的新資料，而是有清楚形狀的數字集合。

## 今課可以做到甚麼？

- 把一個 Python List 建立成 PyTorch Tensor；
- 讀出二維 Tensor 的列數和欄數；
- 對 Tensor 做加法和平均值計算，理解形狀為何重要。

## 開始前：想一想

一張很小的灰階圖片也可以看成一格一格的亮度數字：黑色接近 0，白色接近 255。

若電腦要同時處理很多圖片或很多聲音數字，除了數值本身，還必須知道每一個數字排在哪一列、哪一欄。這個「排列方式」就是資料的形狀。

## 新概念

### 1. Tensor 是按形狀排列的數字

- 單一數字可以看成 0 維；
- 一列數字，例如三個分數，形狀可寫成 `[3]`；
- 兩列三欄的表格，形狀是 `[2, 3]`；
- 圖片、影片和一批資料會有更多維度。

![由 Python List 建立一個 2×3 的灰階像素 Tensor，並讀出形狀](/images/lesson-31-tensors-pytorch.svg)

### 2. PyTorch 是處理 Tensor 的工具

PyTorch 提供 `torch.tensor()` 建立 Tensor，也提供數學運算和日後訓練神經網絡需要的工具。本課只在電腦的 CPU 上練習，不需要 GPU 才能理解 Tensor。

> **環境提醒：** 請使用課堂指定的 PyTorch 環境。若出現 `ModuleNotFoundError`，先確認自己正在使用正確的環境，不要隨意混合安裝指令。

## 跟著做：例子 1——建立一張很小的像素 Tensor

```python
import torch

# 兩列、每列三個灰階像素亮度值
pixels = torch.tensor(
    [[0, 80, 255],
     [120, 180, 240]],
    dtype=torch.float32
)

print(pixels)
print("形狀：", pixels.shape)
print("平均亮度：", pixels.mean().item())
```

### 預期輸出

```text
形狀： torch.Size([2, 3])
平均亮度： 145.83333...
```

### 逐行解釋

`torch.tensor()` 把巢狀 List 變成 Tensor。這裡有兩個小 List，每個都有三個數字，所以 `pixels.shape` 是 `[2, 3]`。

`dtype=torch.float32` 表示用小數格式保存數字。機器學習常需要小數運算；`pixels.mean()` 得到的是 Tensor，`item()` 才把這個單一結果取成普通數字顯示。

## 再試一次：例子 2——替每個像素加亮 10

**先執行例子 1**，再加入以下程式：

```python
brighter_pixels = pixels + 10

print(brighter_pixels)
print("原來第一格：", pixels[0, 0].item())
print("新第一格：", brighter_pixels[0, 0].item())
```

`pixels + 10` 會把每一格都加上 10，並把結果放入新的 `brighter_pixels`。原來的 `pixels` 不會被改變。

## 易錯位

### ❌ 只看數字總數，不看形狀

`[6]` 和 `[2, 3]` 都有六個數字，但前者是一列，後者是兩列三欄；模型需要哪種輸入，兩者不能隨意互換。

**✅ 修正：** 報錯時先印出 `.shape`，確認每個維度的大小。

### ❌ 把 Tensor 當成有欄位名稱的資料表

Tensor 重視數字和位置；它不會自動知道第一欄叫甚麼。

**✅ 修正：** 用清楚的變數名稱和註解保留數字的意義。

### ❌ 以為 Tensor 一定要在 GPU 才能使用

Tensor 可先在 CPU 使用。GPU 是加快大量運算的硬件選項，不是這一課的必要條件。

## 你來做

### 基礎題：建立數字列

建立一個包含四個小數的一維 Tensor，印出它的形狀和平均值。

### 標準題：建立小表格

建立一個 3×2 Tensor，寫出它有多少列、每列有多少個數字。

### 挑戰題：解釋資料形狀

用自己的話解釋：為甚麼一張 28×28 的灰階圖片不能只說成「有 784 個數字」？

## 本課小結

1. Tensor 是按維度和形狀排列的數字資料。
2. `.shape` 告訴我們每個維度有多大，是檢查模型輸入的重要線索。
3. PyTorch 可建立 Tensor 並進行數值運算；模型訓練會在後面課節才加入。

## 離堂前 3 分鐘

1. `torch.Size([2, 3])` 代表甚麼？
2. 為甚麼 `[6]` 和 `[2, 3]` 不能當成完全相同的資料？
3. `pixels + 10` 是否會直接改變 `pixels`？

## 自我檢查

- 我能否建立 Tensor 並查看 `.shape`？
- 我能否說出二維 Tensor 的列和欄？
- 遇到形狀報錯時，我會否先查看輸入資料？
