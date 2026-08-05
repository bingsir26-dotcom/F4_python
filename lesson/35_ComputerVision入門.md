# 第 35 課：Computer Vision 入門——讓模型看懂圖片

> **本課主題：了解圖片如何成為像素 Tensor，並使用預訓練資料集完成基本影像分類。**
>
> 電腦看見的不是「貓」或「數字」，而是排列成矩陣的像素值。視覺模型要從許多已標註圖片中學習圖像模式。

## 今課可以做到甚麼？

完成這一課後，你可以：

- 說出灰階圖片的像素與形狀；
- 載入 FashionMNIST 圖片資料；
- 建立基本全連接分類網絡。

## 開始前：想一想

同一個手寫數字 3 可以大小不同、位置不同、筆畫也不同。若只寫幾條固定規則，很難覆蓋全部情況；大量圖片例子可以幫助模型學習。

## 新概念

### 1. 圖片是像素陣列

灰階圖片每個像素是一個亮度數字；FashionMNIST 圖片是 28×28。彩色圖片通常有紅、綠、藍三個顏色通道。

### 2. 分類前的形狀

神經網絡常以 `[批次, 通道, 高, 闊]` 形式接收圖片。全連接層前可先把 28×28 展平成 784 個數字。

![Computer Vision 的核心概念：像素、通道、形狀、類別](/images/lesson-35-computer-vision.svg)

## 跟著做：例子 1——下載並查看一張 FashionMNIST 圖片

```python
from torchvision import datasets, transforms
import matplotlib.pyplot as plt

transform = transforms.ToTensor()
train_data = datasets.FashionMNIST(root="data", train=True, download=True, transform=transform)

image, label = train_data[0]
print(image.shape, label)
plt.imshow(image.squeeze(), cmap="gray")
plt.show()
```

### 預期輸出／結果

圖片形狀通常是 `[1, 28, 28]`：一個灰階通道、28 高、28 闊。畫面顯示一件服飾圖片。

### 逐行解釋

`ToTensor()` 把圖片轉成 Tensor；`squeeze()` 移除只有 1 的通道維度，讓 Matplotlib 可顯示灰階圖。

## 再試一次：例子 2——建立最小分類網絡

```python
from torch import nn

model = nn.Sequential(
    nn.Flatten(),
    nn.Linear(28 * 28, 128),
    nn.ReLU(),
    nn.Linear(128, 10)
)

print(model(image.unsqueeze(0)).shape)
```

`unsqueeze(0)` 加入批次維度，令一張圖片變成 `[1, 1, 28, 28]`。最後 `10` 個輸出對應十個服飾類別；本課只建立結構，完整訓練會在專題中進行。

## 易錯位

### ❌ 忘記批次維度

單張圖片 `[1, 28, 28]` 和模型需要的批次輸入 `[1, 1, 28, 28]` 不同。

### ❌ 以為模型「看見」人類概念

模型只根據訓練圖片的像素模式預測，遇到不同環境、角度或偏差資料可能失效。

## 你來做

### 基礎題

顯示 `train_data[1]` 和 `train_data[2]`，比較 label 和圖片。

### 標準題

列出彩色圖片比灰階圖片多出哪個維度。

### 挑戰題

把 28×28 圖片展平後有多少個數字？

## 本課小結

1. 圖片可表示為像素 Tensor。
2. 影像模型非常依賴正確的形狀和通道順序。
3. 分類網絡最後輸出通常對應各類別的分數。

## 離堂前 3 分鐘

1. `[1, 28, 28]` 三個數字各代表甚麼？
2. 為甚麼單張圖也要加批次維度？
3. 最後 10 個輸出可代表甚麼？

## 自我檢查

- 我能否查看一張圖片 Tensor 的形狀？
- 我知道灰階和 RGB 圖片的差異嗎？
- 我會否檢查資料形狀而非只看報錯？
