# 第 45 課：JSON 與日期時間——讓資料有結構和時間

> **本課主題：用 JSON 保存有結構的資料，並用 `datetime` 處理日期和時間差。**

## 今課可以做到甚麼？

完成這一課後，你可以：

- 把 Python 的 Dictionary 和 List 轉成 JSON 檔；
- 讀取 JSON 資料並取出需要的欄位；
- 計算兩個日期相差多少日。

## 開始前：想一想

如果要保存一個學生的姓名、班別、分數和興趣，用每行一項的文字檔容易看漏資料。怎樣才能讓資料的結構更清楚？

## 新概念

### 1. JSON 是資料交換格式

JSON 很常用於網站、設定檔和 API。它和 Python 資料很相似：

- JSON object 對應 Python Dictionary；
- JSON array 對應 Python List；
- 文字要用雙引號；
- JSON 不可以直接保存 Python 的函式或 `datetime` 物件。

### 2. 日期不是普通文字

`"2026-09-01"` 看起來像日期，但對 Python 而言先只是文字。使用 `datetime.strptime()` 轉成日期物件後，才可可靠地比較和計算相差日數。

![JSON 與日期時間——讓資料有結構和時間概念圖](/images/lesson-45-json-datetime.svg)

## 跟著做：例子 1——保存並讀取學生資料

```python
import json
from pathlib import Path

student = {
    "name": "小晴",
    "class": "F4A",
    "scores": [78, 85, 91]
}

file_path = Path("student.json")
file_path.write_text(
    json.dumps(student, ensure_ascii=False, indent=2),
    encoding="utf-8"
)

loaded_student = json.loads(file_path.read_text(encoding="utf-8"))
print(loaded_student["name"])
print(sum(loaded_student["scores"]) / len(loaded_student["scores"]))
```

### 預期輸出／結果

```text
小晴
84.66666666666667
```

### 逐行解釋

`json.dumps()` 把 Python 資料轉成 JSON 文字；`ensure_ascii=False` 令中文保持可讀；`indent=2` 令檔案排版整齊。`json.loads()` 則把 JSON 文字還原成 Python Dictionary。

## 再試一次：例子 2——計算距離活動還有多少日

```python
from datetime import datetime

today = datetime.strptime("2026-08-05", "%Y-%m-%d")
event_day = datetime.strptime("2026-09-01", "%Y-%m-%d")
difference = event_day - today

print("距離活動還有", difference.days, "日")
```

### 這次改了甚麼？

`strptime()` 依照指定格式把文字轉成日期時間。兩個日期相減得到 `timedelta`，其 `.days` 屬性就是相差的完整日數。把日期改成自己活動的日期再試一次。

## 易錯位

### ❌ 把 JSON 當成可寫 Python 註解的檔案

**原因：** 標準 JSON 不支援註解，也不接受單引號作為文字引號。

**修正方法：** JSON 檔案使用雙引號，並用 `json.loads()` 檢查格式。

### ❌ 日期格式和 `%Y-%m-%d` 不一致

**原因：** 例如 `01/09/2026` 不符合 `2026-09-01` 的格式。

**修正方法：** 把格式字串改成 `%d/%m/%Y`，或統一輸入格式。

### ❌ 直接比較未轉換的日期文字

**原因：** 某些格式的文字排序不代表真正日期先後。

**修正方法：** 先用 `strptime()` 轉成日期物件再比較。

## 你來做

### 基礎題

建立包含自己名字、三項興趣和一個目標的 JSON 檔。

### 標準題

讀取一個 JSON Dictionary，計算其中 `scores` List 的最高分。

### 挑戰題

讓使用者輸入生日 `YYYY-MM-DD`，計算由生日到一個指定日期相隔多少日。

## 本課小結

1. JSON 適合保存 Dictionary 和 List 形式的結構化資料。
2. `dumps()`／`loads()` 負責 Python 資料和 JSON 文字之間的轉換。
3. 日期文字要轉成日期物件，才適合可靠地計算。

## 離堂前 3 分鐘

1. JSON object 最接近哪一種 Python 資料類型？
2. `ensure_ascii=False` 在中文 JSON 有甚麼作用？
3. 兩個 `datetime` 相減後，怎樣取得相差日數？

## 自我檢查

- 我能否讀寫一個基本 JSON 檔？
- 我知道 JSON 和 Python Dictionary 的相同與不同嗎？
- 我會否先把日期文字轉換再計算？
