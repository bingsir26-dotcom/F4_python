# 第 48 課：Playwright——讓程式操作瀏覽器

> **本課主題：使用 Playwright 開啟瀏覽器、等待元素、讀取內容和截圖；了解動態網頁與 HTML 解析的差異。**

## 今課可以做到甚麼？

完成這一課後，你可以：

- 用 Playwright 開啟頁面並取得指定元素文字；
- 知道 `locator()` 和 `wait_for()` 的用途；
- 分辨何時 Beautiful Soup 已足夠，何時才需要瀏覽器自動化。

## 開始前：想一想

有些網站的內容不是一開始便寫在 HTML 中，而是網頁開啟後才由 JavaScript 載入。Beautiful Soup 只拿到最初 HTML 時，可能會看不到那些內容。可以怎樣處理？

## 新概念

### 1. Playwright 是瀏覽器自動化工具

Playwright 可以控制瀏覽器開啟頁面、等待元素、輸入文字、按按鈕、讀取結果和截圖。它較適合需要 JavaScript 才會出現的公開內容。

### 2. 先選最簡單的工具

- HTML 已經包含所需資料：Beautiful Soup 通常較簡單、較快；
- 資料在頁面運行後才出現：才考慮 Playwright；
- 有官方 API 或可下載 CSV：優先使用它們。

瀏覽器自動化同樣必須遵守網站條款、速率限制和私隱規則，不能用來繞過登入或存取限制。

![Playwright——讓程式操作瀏覽器概念圖](/images/lesson-48-playwright.svg)

## 跟著做：例子 1——在本機頁面選取內容

```python
# 安裝一次：pip install playwright
# 再執行一次：playwright install
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.set_content("<h1>Python 課程</h1><p class='count'>共有 49 課</p>")

    title = page.locator("h1").text_content()
    count = page.locator(".count").text_content()
    print(title)
    print(count)

    browser.close()
```

### 預期輸出／結果

```text
Python 課程
共有 49 課
```

### 逐行解釋

這個例子使用 `set_content()` 建立本機 HTML，因此不需要連接網站。`locator()` 以 CSS selector 定位元素，`text_content()` 取出元素文字。`with sync_playwright()` 用完後會妥善結束 Playwright。

## 再試一次：例子 2——開啟公開示範頁並截圖

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com", wait_until="domcontentloaded")
    page.locator("h1").wait_for()

    print(page.locator("h1").text_content())
    page.screenshot(path="example-page.png", full_page=True)
    browser.close()
```

### 這次改了甚麼？

`page.goto()` 開啟公開示範頁，`wait_for()` 避免元素尚未載入便讀取。截圖會保存成 `example-page.png`。真實網站的結構和內容會改變，因此不要把示範頁的輸出當作固定答案。

## 易錯位

### ❌ 只安裝 Python 套件，沒有安裝瀏覽器

**原因：** Playwright 需要可控制的瀏覽器執行檔。

**修正方法：** 先 `pip install playwright`，再執行 `playwright install`。

### ❌ 頁面未載入完成便讀取元素

**原因：** 動態內容可能尚未出現，導致 timeout 或取得空結果。

**修正方法：** 使用適當 locator，並等待需要的元素。

### ❌ 把 Playwright 當成繞過網站限制的工具

**原因：** 自動化不代表可以無視登入、付費、反爬或私隱規則。

**修正方法：** 只處理明確允許的公開資料，優先使用 API、CSV 或網站提供的匯出功能。

## 你來做

### 基礎題

把例子 1 的 HTML 改成三個課程卡片，讀取所有卡片標題。

### 標準題

在本機 HTML 加入按鈕和一段隱藏文字；用 Playwright 點擊按鈕後讀取新文字。

### 挑戰題

比較 Beautiful Soup 和 Playwright：各寫出一個較適合使用它們的公開資料情境。

## 本課小結

1. Playwright 讓 Python 控制瀏覽器和動態網頁。
2. `locator()` 和等待元素能令選取資料較穩定。
3. 若資料已在 HTML、API 或 CSV 中，應優先用較簡單和合規的方法。

## 離堂前 3 分鐘

1. Beautiful Soup 和 Playwright 最大的用途差異是甚麼？
2. 為甚麼動態頁面常要等待元素？
3. Playwright 安裝後還需要執行哪一個安裝指令？

## 自我檢查

- 我能否用 `locator()` 取得元素文字？
- 我知道為何要等待元素嗎？
- 我會否先檢查 API、CSV 和網站規則？
