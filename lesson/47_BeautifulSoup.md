# 第 47 課：Beautiful Soup——從公開 HTML 選出資料

> **本課主題：先讀懂 HTML 的標籤和 class，再使用 Beautiful Soup 選取需要的公開內容。**
>
> Beautiful Soup 是分析**已取得的 HTML 文字**的工具，不是取得任何資料的通行證。先找官方 API 或可下載資料；處理網頁時必須尊重條款、私隱和網站負荷。

## 今課可以做到甚麼？

- 用 `find()` 取出一個標題；
- 用 CSS selector 取出多個指定元素；
- 說出公開網頁資料也不能隨意大量擷取的原因。

## 開始前：想一想

網頁畫面上有三個課程卡片。對人來說，它們很清楚；對電腦來說卻是一大段 HTML。怎樣告訴程式「只取每張卡片的課程名稱」？

## 新概念

### 1. HTML 用標籤表達結構

`<h1>` 是大標題、`<p>` 是段落、`<a>` 是連結。`class="course"` 像給元素加上分類名稱，讓我們可以精確選取。

### 2. Beautiful Soup 把 HTML 變成可查詢結構

`BeautifulSoup(html, "html.parser")` 把一段 HTML 文字交給解析器。`find()` 取第一個符合的元素；`select()` 依 CSS selector 取出多個元素。

![一段 HTML 有三張 course 卡片；以 .course h2 選取三個課程標題；只留下整理後的文字清單](/images/lesson-47-beautiful-soup.svg)

## 跟著做：例子 1——從小 HTML 取出頁面標題

```python
from bs4 import BeautifulSoup

html = """
<h1>本週活動</h1>
<p>歡迎參加 Python 工作坊。</p>
"""

soup = BeautifulSoup(html, "html.parser")
title = soup.find("h1")
print(title.get_text())
```

### 預期輸出

```text
本週活動
```

### 逐行解釋

這個例子把 HTML 直接寫在程式內，所以不需要連上網。`find("h1")` 找到第一個 `<h1>` 元素；`get_text()` 只取標籤內的人類可讀文字。

第一次使用前，請安裝套件：`pip install beautifulsoup4`。

## 再試一次：例子 2——選出所有課程名稱

```python
from bs4 import BeautifulSoup

html = """
<section class="course"><h2>Python 基礎</h2></section>
<section class="course"><h2>資料分析</h2></section>
<section class="course"><h2>機器學習</h2></section>
"""

soup = BeautifulSoup(html, "html.parser")
for heading in soup.select(".course h2"):
    print(heading.get_text())
```

### 預期輸出

```text
Python 基礎
資料分析
機器學習
```

`.course h2` 表示「class 為 `course` 的元素內的 `h2`」。這比只寫 `find_all("h2")` 更清楚地表達想取得的是課程卡片內的標題。

## 易錯位

### ❌ 以為 Beautiful Soup 自動下載網頁

Beautiful Soup 的核心工作是解析 HTML，不是處理所有網絡請求。

**✅ 修正：** 先從小型本機 HTML 練習；若要取得公開頁面，先確認是否有官方 API、下載檔和使用條款。

### ❌ 抓到元素就直接印出標籤

直接 `print(title)` 會顯示 `<h1>本週活動</h1>`。

**✅ 修正：** 想取文字時使用 `title.get_text()`。

### ❌ 忽略資料使用規則

公開可看不代表可以大量複製、收集個人資料或高速請求。

**✅ 修正：** 尊重條款和 `robots.txt`、降低請求頻率、只收集真正需要的非個人資料；不可繞過登入或付費限制。

## 你來做

### 基礎題：取出段落

在例子 1 加入另一個 `<p>`，使用 `find("p")` 顯示它的文字。

### 標準題：加上連結

在三張 course 卡片加入 `<a>`，使用 selector 取出文字和 `href`。

### 挑戰題：整理為 List of Dictionary

把課程名稱和連結收集成 List，每一項是 `{"name": ..., "url": ...}`。只使用你自己建立的 HTML 範例。

## 本課小結

1. HTML 標籤和 class 告訴我們內容的結構。
2. `find()` 取一個元素，`select()` 可按 selector 取多個元素。
3. 網頁資料必須合法、節制並尊重私隱和網站規則。

## 離堂前 3 分鐘

1. `<h1>` 和 `<p>` 分別通常代表甚麼？
2. `get_text()` 的作用是甚麼？
3. 為甚麼要先找 API 或下載檔？

## 自我檢查

- 我能否從簡單 HTML 選出目標文字？
- 我能否解釋 CSS selector 的用途？
- 我會否在擷取資料前先確認規則和替代來源？
