# 開始資料與 AI 課前：執行環境

> **這不是一節新課。** 由第 12 課開始，部分程式會使用 pandas、NumPy、scikit-learn 或 PyTorch；建議使用教師提供的 Google Colab Notebook 執行。

在瀏覽課程網站時，你可以閱讀程式；要真正執行資料分析和 AI 程式，請開啟課堂指定的 Notebook。

## 第一次怎樣執行？

1. 開啟教師提供的 Google Colab 連結。
2. 點一下要執行的程式格（cell）。
3. 按 **Shift + Enter**。
4. 等待程式格左側出現綠色勾號，並在下方看見輸出。

程式格需要由上至下執行。若某一格使用了前面建立的變數，但你尚未執行前面的格，就可能出現 `NameError`。

## 先確認環境可以使用

每次第一次使用新的 Notebook 時，可逐格執行以下檢查。

### pandas

```python
import pandas as pd
print(pd.__version__)
```

### scikit-learn

```python
import sklearn
print(sklearn.__version__)
```

### PyTorch

```python
import torch
print(torch.__version__)
```

如果看到版本號，例如 `2.2.0`，代表套件已成功載入。不同 Notebook 顯示的版本號可以不同，不需要和同學完全相同。

## 在 Colab 上傳 CSV 資料檔

第 15 課開始會讀取 CSV。若教師沒有提供已連接的檔案，先在 Colab 執行這一格：

```python
from google.colab import files
files.upload()
```

執行後選取電腦中的 CSV 檔案。這段程式**只適用於 Google Colab**；在其他環境不需要使用它。

## 常見情況

| 畫面訊息／情況 | 通常代表甚麼 | 先做甚麼 |
|---|---|---|
| `ModuleNotFoundError` | 找不到所需套件 | 確認是否開啟課堂指定的 Notebook 和環境。 |
| `FileNotFoundError` | 找不到 CSV 或其他檔案 | 檢查檔名；在 Colab 確認是否已上傳檔案。 |
| `NameError` | 尚未建立某個變數 | 由上至下重新執行前面的程式格。 |
| 程式一直顯示執行中 | 程式仍在計算，或卡在需要輸入／讀檔的地方 | 先等候；若太久，檢查目前程式格是否需要輸入或檔案。 |

## 若你使用自己的電腦環境

熟悉 VS Code、Jupyter Notebook 或 Python 虛擬環境的同學，可以使用自己的環境；但課堂以教師提供的 Colab Notebook 為準。遇到問題時，先在 Colab 重現，較容易確認是程式問題還是個人電腦的環境問題。

## 自我檢查

- 我能否在 Colab 選取程式格並按 Shift + Enter？
- 我知道為甚麼要由上至下執行程式格嗎？
- 我遇到 `FileNotFoundError` 時，知道先檢查檔名和檔案位置嗎？
