# 第 45 課：JSON 與日期時間——讓資料有清楚格式和時間記錄

> **本課主題：把一筆資料整理成 JSON 文字，並用 ISO 格式記下建立時間。**
>
> 當資料要交給另一個程式、網站或日後的自己閱讀時，清楚的欄位和一致的時間格式，比一串隨意文字可靠得多。

## 今課可以做到甚麼？

- 把 Dictionary 轉成容易交換的 JSON 文字；
- 從 JSON 文字讀回 Python 資料；
- 取得目前時間並使用一致的 ISO 格式顯示。

## 開始前：想一想

同一個活動紀錄若寫成 `「星期五下午三點交」`，下星期或另一個程式能否準確理解？如果每筆紀錄都有 `title`、`done`、`created_at` 等欄位，會不會更容易整理？

## 新概念

### 1. JSON 是資料交換的文字格式

JSON 看起來很像 Python Dictionary，但它是一種文字格式。常見用途包括設定檔、網站 API 回應和資料保存。

Python 使用 `json.dumps()` 把資料變成 JSON 文字；使用 `json.loads()` 把 JSON 文字讀回 Python 資料。

### 2. 用一致格式記錄時間

`datetime.now()` 取得目前電腦時間。`isoformat()` 產生如 `2026-08-06T15:30:00` 的一致格式，較適合程式保存和排序。

![一筆待辦事項包含 title、done 和 created_at；同一筆資料以 JSON 文字保存，再讀回 Python](/images/lesson-45-json-datetime.svg)

## 跟著做：例子 1——建立一筆有時間的 JSON 紀錄

```python
import json
from datetime import datetime

record = {
    "title": "完成 Python 練習",
    "done": False,
    "created_at": datetime.now().isoformat(timespec="minutes")
}

json_text = json.dumps(record, ensure_ascii=False, indent=2)
print(json_text)
```

### 預期輸出／結果

時間會因電腦不同而改變，格式如下：

```json
{
  "title": "完成 Python 練習",
  "done": false,
  "created_at": "2026-08-06T15:30"
}
```

### 逐行解釋

`record` 是 Python Dictionary。`datetime.now()` 取得現在時間，`timespec="minutes"` 只保留到分鐘，避免畫面出現不必要的秒數。

`json.dumps()` 的 `ensure_ascii=False` 讓中文保持可讀；`indent=2` 讓每個欄位分行顯示。JSON 中的布林值寫成小寫 `false`，這正是 JSON 和 Python 寫法的其中一個差異。

## 再試一次：例子 2——由 JSON 文字讀回資料

```python
import json

json_text = '{"title": "練習 List", "done": true, "created_at": "2026-08-06T16:00"}'
record = json.loads(json_text)

print("事項：", record["title"])
print("完成了嗎：", record["done"])
print("建立時間：", record["created_at"])
```

### 預期輸出

```text
事項： 練習 List
完成了嗎： True
建立時間： 2026-08-06T16:00
```

`loads()` 的 s 代表 string。讀回後的 `record` 是 Python Dictionary，所以可用欄位名稱讀取。

## 易錯位

### ❌ 把 Python Dictionary 當成 JSON

Python 寫 `True`、`False`、`None`；JSON 寫 `true`、`false`、`null`。

**✅ 修正：** 不要手動拼長 JSON 文字；先建立 Dictionary，再用 `json.dumps()` 轉換。

### ❌ 以為時間字串可以隨意比較

`"明天下午"` 是給人看的文字，不是清楚的時間資料。

**✅ 修正：** 保存時使用 ISO 格式；顯示給人看時才轉成較自然的文字。

### ❌ 忘記 JSON 文字的雙引號

JSON 的鍵和值（文字）要使用雙引號。

**✅ 修正：** 讓 `json.dumps()` 負責產生 JSON，較不容易寫錯。

## 你來做

### 基礎題：我的小作品資料

建立一個 Dictionary，包含 `name`、`language`、`finished` 三個欄位，轉成格式化 JSON 顯示。

### 標準題：加入建立時間

在自己的資料加入 `created_at`，用 `datetime.now().isoformat(timespec="minutes")` 建立。

### 挑戰題：保存成 JSON 檔

把例子 1 的 JSON 文字寫進 `task.json`，再讀回並使用 `json.loads()` 顯示 `title`。提示：第 44 課的 `open()`。

## 本課小結

1. JSON 是讓不同程式交換資料的文字格式。
2. `dumps()` 把 Python 資料轉成 JSON；`loads()` 把 JSON 文字讀回。
3. ISO 時間格式較一致，適合保存和排序。

## 離堂前 3 分鐘

1. 為甚麼 JSON 的 `false` 和 Python 的 `False` 不同？
2. `dumps()` 和 `loads()` 分別做甚麼？
3. 為甚麼保存時間時應使用一致格式？

## 自我檢查

- 我能否把 Dictionary 轉成可讀的 JSON 文字？
- 我能否從 JSON 文字讀回欄位？
- 我會否把資料保存格式和人類閱讀的文字分開考慮？
