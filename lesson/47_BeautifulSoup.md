# 第 47 課：Beautiful Soup——由 HTML 取出公開資料

> **本課主題：讀懂基本 HTML，使用 Beautiful Soup 從已取得的公開網頁內容選出文字和連結。**

## 今課可以做到甚麼？

完成這一課後，你可以：

- 從 HTML 中選取標題、段落和連結；
- 使用 `find()`、`find_all()` 和 CSS selector；
- 知道爬取公開資料時要遵守網站條款、速率限制和私隱原則。

## 開始前：想一想

網頁看起來像一篇文章，但電腦看到的是大量 HTML 標籤。假如只想取出所有課程名稱，怎樣告訴程式「哪些文字才是我要的」？

## 新概念

### 1. Beautiful Soup 做甚麼？

Beautiful Soup 不會自動讓你「隨意取得任何網站資料」。它的工作是把**已取得的 HTML 文字**整理成可查詢的結構，然後選出需要的元素。

常見 HTML 元素包括：

- `<h1>`：大標題；
- `<p>`：段落；
- `<a>`：連結；
- `class`：給元素加上的分類名稱。

### 2. 負責任地使用爬蟲

只處理公開和允許使用的資料；先閱讀網站條款和 `robots.txt`；不要收集個人資料；不要高速連續請求網站；不得以爬蟲繞過登入、付費牆或存取限制。

![Beautiful Soup——由 HTML 取出公開資料概念圖](/images/lesson-47-beautiful-soup.svg)

## 跟著做：例子 1——由一小段 HTML 取出課程名稱

```python
# 先在終端機安裝：pip install beautifulsoup4
from bs4 import BeautifulSoup

html = """
<ul>
  <li class="course">Python 基礎</li>
  <li class="course">資料分析</li>
  <li class="course">機器學習</li>
</ul>
"""

soup = BeautifulSoup(html, "html.parser")
for item in soup.find_all("li", class_="course"):
    print(item.get_text(strip=True))
```

### 預期輸出／結果

```text
Python 基礎
資料分析
機器學習
```

### 逐行解釋

`BeautifulSoup(html, "html.parser")` 將 HTML 文字變成可查詢物件。`find_all("li", class_="course")` 找出所有符合條件的 `<li>`，`get_text(strip=True)` 只取文字並移除多餘空白。

## 再試一次：例子 2——取出連結文字和網址

```python
html = """
<a class="article" href="/python">Python 文章</a>
<a class="article" href="/data">資料文章</a>
"""

soup = BeautifulSoup(html, "html.parser")
for link in soup.select("a.article"):
    print(link.get_text(strip=True), "|", link.get("href"))
```

### 這次改了甚麼？

CSS selector `a.article` 的意思是「class 為 article 的 `<a>` 元素」。`get("href")` 取得連結網址。這段程式沿用例子 1 已匯入的 `BeautifulSoup`。

## 易錯位

### ❌ 忘記安裝套件

**原因：** 若出現 `ModuleNotFoundError: No module named 'bs4'`，代表目前 Python 環境沒有 Beautiful Soup。

**修正方法：** 在正確的環境執行 `pip install beautifulsoup4`。

### ❌ 用肉眼看到的文字直接當 selector

**原因：** 畫面文字可能重複，HTML 結構才是較可靠的選取依據。

**修正方法：** 先查看 HTML，找出 tag、class 或其他穩定屬性。

### ❌ 對網站高速發送大量請求

**原因：** 這會加重網站負擔，也可能違反網站規則。

**修正方法：** 先確認可否使用資料；限制請求頻率，優先使用官方 API 或下載資料集。

## 你來做

### 基礎題

改寫例子 1 的 HTML，加入一個不是課程的 `<li>`，確保程式不會選到它。

### 標準題

建立 3 個 `<a>` 連結，使用 CSS selector 輸出其文字和 `href`。

### 挑戰題

找一個明確提供公開資料下載或 API 的網站，閱讀其使用規則；只寫出你會收集哪些非個人資料，不要立即大量爬取。

## 本課小結

1. Beautiful Soup 解析 HTML，讓程式按結構選取資料。
2. `find_all()` 和 `select()` 可取得多個符合條件的元素。
3. 合法、節制和尊重私隱比「能否抓到資料」更重要。

## 離堂前 3 分鐘

1. `find_all()` 和 `find()` 的主要差異是甚麼？
2. `get_text(strip=True)` 做了甚麼？
3. 為甚麼應優先考慮官方 API 或資料下載？

## 自我檢查

- 我能否從 HTML 找出 tag 和 class？
- 我能否用 Beautiful Soup 選取文字和連結？
- 我知道哪些網站資料不應隨意收集嗎？
