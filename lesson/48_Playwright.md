# 第 48 課：Playwright——讓程式在瀏覽器完成可重複檢查

> **本課主題：用 Playwright 在本機示範頁面選取內容和等待動態元素，理解它和 Beautiful Soup 的不同。**
>
> 瀏覽器自動化適合測試自己網站或讀取允許使用的公開動態內容。它不是繞過登入、付費牆、人機驗證或網站限制的工具。

## 今課可以做到甚麼？

- 使用 `locator()` 找到網頁元素並讀取文字；
- 讓 Playwright 等待動態內容出現；
- 判斷何時 HTML 解析已足夠、何時才需要瀏覽器自動化。

## 開始前：想一想

有些網頁一開啟時只有「載入中」，稍後 JavaScript 才把結果放到頁面。只讀最初 HTML 的工具看不到結果時，應否立刻改用瀏覽器自動化？

## 新概念

### 1. Playwright 控制真正的瀏覽器頁面

它可以開啟頁面、尋找元素、輸入、按按鈕、等待內容和截圖。本課只使用自己程式內建立的本機 HTML，不會連到外部網站。

### 2. 先選足夠簡單的工具

- 資料已存在於靜態 HTML：Beautiful Soup 通常較快較簡單；
- 資料由 JavaScript 動態加入：才考慮 Playwright；
- 有官方 API 或 CSV 下載：優先使用它們。

![本機 HTML 頁面包含標題和稍後出現的結果；Playwright 定位元素、等待內容，讀回可見文字](/images/lesson-48-playwright.svg)

## 跟著做：例子 1——在本機 HTML 頁面讀取標題

第一次使用前，請按你正在使用的環境安裝 Playwright 和 Chromium 瀏覽器元件：

| 環境 | 安裝方式 |
| --- | --- |
| Google Colab 的程式格 | `!pip install playwright`，再執行 `!playwright install chromium` |
| VS Code 終端機／PowerShell | `pip install playwright`，再執行 `playwright install chromium` |

安裝指令不是 Python 語法；在 Colab 要在前面加上 `!`，在終端機則不要加。第一次安裝 Chromium 瀏覽器元件需要下載較大檔案，可能要等一會；這不代表 Python 程式一定卡住。

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.set_content("<h1 id='title'>Python 工作坊</h1>")

    title = page.locator("#title").text_content()
    print(title)
    browser.close()
```

### 預期輸出

```text
Python 工作坊
```

### 逐行解釋

`page.set_content()` 把一小段 HTML 放進瀏覽器頁面，沒有連上任何網站。`locator("#title")` 以 CSS selector 找到 id 是 `title` 的元素；`text_content()` 讀取文字。

`browser.close()` 在完成後關閉瀏覽器。測試自己的網站時也應在程式結束前釋放資源。

## 再試一次：例子 2——等待動態結果出現

```python
from playwright.sync_api import sync_playwright

html = """
<div id="result">載入中</div>
<script>
setTimeout(() => {
  document.querySelector("#result").textContent = "資料已準備好";
}, 300);
</script>
"""

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.set_content(html)

    page.locator("#result").wait_for()
    page.wait_for_function("document.querySelector('#result').textContent === '資料已準備好'")
    print(page.locator("#result").text_content())
    browser.close()
```

### 預期輸出

```text
資料已準備好
```

網頁先顯示「載入中」，約 0.3 秒後才由 JavaScript 改成結果。這正是動態頁面要等待條件而不是立刻讀取的原因。

## 易錯位

### ❌ 以為 `wait_for()` 一定等到文字改變

`wait_for()` 在元素已存在時便可完成；本例還要等待指定文字，所以再使用 `wait_for_function()`。

**✅ 修正：** 清楚定義「準備好」的條件，例如元素可見、按鈕可用或文字已改變。

### ❌ 對每個網站都使用瀏覽器自動化

**原因：** Playwright 較重、較慢，也更容易受頁面改動影響。

**✅ 修正：** 先查看官方 API、CSV 或靜態 HTML 是否已能解決問題。

### ❌ 用自動化繞過限制

自動化不能合理化繞過登入、付費牆、CAPTCHA、速率限制或私隱規則。

**✅ 修正：** 只測試自己的網站或獲明確允許的流程；遵守使用條款。

## 你來做

### 基礎題：讀取兩段文字

在例子 1 的 HTML 加入 `<p class="info">`，用 locator 讀取它。

### 標準題：加入按鈕

建立一個按鈕，按下後把頁面文字改成「已完成」，再用 Playwright 點擊和檢查結果。

### 挑戰題：測試自己的靜態課程頁

為自己建立的一個本機 HTML 頁加入 title、按鈕和結果區；編寫 Playwright 測試確認三者存在。不要把測試用在未允許的第三方網站。

## 本課小結

1. Playwright 能控制瀏覽器並讀取動態頁面狀態。
2. `locator()` 找元素；等待條件可避免過早讀取內容。
3. 優先使用 API、CSV 或簡單解析；自動化必須遵守網站規則。

## 離堂前 3 分鐘

1. Playwright 和 Beautiful Soup 最大分別是甚麼？
2. 為甚麼動態內容需要等待？
3. 哪些情況不應使用瀏覽器自動化？

## 自我檢查

- 我能否用 locator 讀取本機頁面元素？
- 我能否說明需要等待的原因？
- 我會否只在自己或獲允許的網站使用自動化？
