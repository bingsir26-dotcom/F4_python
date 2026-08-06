# 第 38 課：Transformer、LLM 與音訊概覽——文字和聲音怎樣變成訊號

> **本課主題：用簡單程式理解 token、context、下一個 token 和音訊取樣。**
>
> 本課不呼叫任何大型語言模型 API，也不要求學生自行付費註冊服務。先掌握資料怎樣表示、模型大致怎樣工作，以及為甚麼輸出必須核查，再考慮更大型的工具。

## 今課可以做到甚麼？

- 用小程式觀察文字如何被分成 token 和 context；
- 說明 LLM 常見的「根據前文預測下一個 token」概念；
- 產生簡單音訊取樣，理解取樣率和波形的關係；
- 列出使用生成式 AI 時需要核查的內容。

## 開始前：想一想

聊天模型可以寫出很流暢的答案，但流暢是否代表每一項事實都已經查證？

同樣地，一段聲音若錄得很清楚，是否代表模型一定能正確辨認說話者或內容？資料表示方式和測試方法都很重要。

## 新概念

### 1. Token、context 和下一個 token

文字送入模型前會被切成一個個 token。token 可以是完整詞語、詞語的一部分或符號，不一定等於人眼看見的一個字。

模型讀取目前的 context，估計下一個 token 的可能性，再把選出的 token 放回文字後面，重複這個過程。這可以解釋文字怎樣逐步生成，但不代表模型每次都查證了事實。

![文字由 token 組成；模型查看 context，再逐步產生文字，旁邊比較音訊的取樣波形](/images/lesson-38-transformer-llm-audio.svg)

### 2. 音訊是時間上的數字取樣

麥克風把聲音變成隨時間變化的數值。每秒量度多少次叫取樣率；取樣率不同，保留的聲音細節也可能不同。

音訊模型還可使用頻譜圖觀察不同時間和頻率的能量。本課只先看波形，不深入訓練音訊模型。

## 跟著做：例子 1——用清單觀察 context 和下一個 token

```python
tokens = ["Python", "可以", "分析", "資料"]

for position in range(1, len(tokens)):
    context = " ".join(tokens[:position])
    next_token = tokens[position]
    print("context：", context)
    print("示範的下一個 token：", next_token)
```

### 預期輸出

```text
context： Python
示範的下一個 token： 可以
context： Python 可以
示範的下一個 token： 分析
context： Python 可以 分析
示範的下一個 token： 資料
```

### 逐行解釋

`tokens` 是我們人手寫好的 token List。`tokens[:position]` 取出目前位置之前的內容，作為 context；`tokens[position]` 是示範用的下一個 token。

本例的「下一個 token」不是模型算出來的，只是用來讓我們看清楚生成過程的資料形式。真實模型會根據訓練到的模式計算可能性。

## 再試一次：例子 2——產生一秒鐘的簡單音訊取樣

```python
import numpy as np
import matplotlib.pyplot as plt

sample_rate = 8
duration = 1
times = np.arange(0, duration, 1 / sample_rate)
signal = np.sin(2 * np.pi * 1 * times)

print("取樣率：", sample_rate, "次／秒")
print("樣本數：", len(signal))

plt.stem(times, signal)
plt.xlabel("時間（秒）")
plt.ylabel("振幅")
plt.show()
```

本例每秒只取 8 次樣本，所以圖上看到的是 8 個數值。真正的語音通常使用更高取樣率；錄音設備、噪音和壓縮方式都會影響後續模型。

## 易錯位

### ❌ 把 `split()` 的結果當成真實 tokenizer

本課使用 List 直接示範 token；真實 tokenizer 會處理詞語片段、符號和不同語言，切法可能完全不同。

### ❌ 把模型產生的句子當成已查證資料

LLM 可以生成不存在的來源、錯誤數字或看似合理的解釋。

**✅ 修正：** 查找原始來源，核對日期、數字、引用和結論，不把模型本身當成來源。

### ❌ 把音訊樣本數和音量混為一談

取樣率是每秒量度幾次；振幅通常描述每次量度的大小，兩者是不同概念。

### ❌ 隨便上傳個人聲音或機密文字

使用外部 AI 服務前，要先了解私隱設定、資料保存方式和學校規則；未經同意不要上傳他人資料。

## 你來做

### 基礎題：改變 context

把 `tokens` 改成另一句短句，逐行說出每次的 context 和下一個 token。

### 標準題：改變取樣率

把 `sample_rate` 改成 4 和 16，觀察樣本數和圖形有甚麼變化。

### 挑戰題：建立核查清單

為一段 AI 生成的科學說法寫出三個核查問題，例如來源、日期和是否有其他可靠資料支持。

## 本課小結

1. token 是模型處理文字的單位；context 是目前已讀取的內容。
2. LLM 可逐步預測下一個 token，但流暢輸出不代表事實正確。
3. 音訊可表示成隨時間排列的取樣數字，取樣率會影響資料細節。

## 離堂前 3 分鐘

1. context 在生成下一個 token 時扮演甚麼角色？
2. 本課的下一個 token 是模型計算出來的嗎？
3. 取樣率 8 次／秒代表甚麼？

## 自我檢查

- 我能否分清 token、context 和下一個 token？
- 我知道為甚麼要核查 LLM 的輸出嗎？
- 我能否說明取樣率和音訊樣本數的關係？
