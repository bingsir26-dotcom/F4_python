import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'F4 Python 課程',
  description: '由零開始學習 Python、資料分析與人工智能',
  base: '/F4_python/',
  lang: 'zh-Hant',
  lastUpdated: true,
  vite: {
    server: {
      watch: {
        ignored: ['**/.vitepress/dist/**']
      }
    }
  },
  themeConfig: {
    logo: '/images/python-spark.svg',
    siteTitle: 'F4 Python 課程',
    nav: [
      { text: '課程首頁', link: '/' },
      { text: '由第 1 課開始', link: '/01_Python介紹與變數' }
    ],
    sidebar: [
      {
        text: '課程導入',
        collapsed: false,
        items: [
          { text: '第 0 課：為甚麼學 Python？', link: '/00_為什麼學Python' }
        ]
      },
      {
        text: '單元一：Python 基礎與互動程式',
        collapsed: false,
        items: [
          { text: '第 1 課：Python、輸出與變數', link: '/01_Python介紹與變數' },
          { text: '第 2 課：資料類型與運算', link: '/02_資料類型與運算' },
          { text: '第 3 課：input() 與計算', link: '/03_input與計算' },
          { text: '第 4 課：if 判斷與小遊戲', link: '/04_if判斷與小遊戲' },
          { text: '第 5 課：列表 List', link: '/05_列表List' },
          { text: '第 6 課：for 迴圈與作品', link: '/06_for迴圈與作品' },
          { text: '第 7 課：while 迴圈與進階遊戲', link: '/07_while迴圈與進階遊戲' },
          { text: '第 8 課：字串、文字處理與格式化輸出', link: '/08_字串與格式化輸出' },
          { text: '第 9 課：函式——把重複工作收好', link: '/09_函式' },
          { text: '第 10 課：Dictionary——用名稱整理一筆資料', link: '/10_Dictionary' },
          { text: '第 11 課：Python 基礎綜合實作與自我檢查', link: '/11_基礎綜合實作與自我檢查' }
        ]
      },
      {
        text: '單元二：資料處理與實用解難',
        collapsed: true,
        items: [
          { text: '開始資料與 AI 課前：執行環境', link: '/資料與AI課程執行環境' },
          { text: '第 12 課：資料從哪裡來？CSV 與分析問題', link: '/12_資料分析第一步' },
          { text: '第 13 課：從 Dictionary 到資料表', link: '/13_從Dictionary到資料表' },
          { text: '第 14 課：pandas 入門——看懂資料表', link: '/14_pandas入門' },
          { text: '第 15 課：讀取 CSV——使用真實資料', link: '/15_讀取CSV' },
          { text: '第 16 課：篩選與新增欄位', link: '/16_篩選與新增欄位' },
          { text: '第 17 課：資料清洗——處理缺失與錯誤', link: '/17_資料清洗與篩選' },
          { text: '第 18 課：統計與分組', link: '/18_描述性統計與groupby' },
          { text: '第 19 課：資料視覺化——用圖表說故事', link: '/19_資料視覺化Matplotlib' },
          { text: '第 20 課：資料分析小專題——由資料得出結論', link: '/20_資料分析小專題' }
        ]
      },
      {
        text: '單元三：機器學習與資料預測',
        collapsed: true,
        items: [
          { text: '第 21 課：NumPy——機器學習前的數字陣列', link: '/21_NumPy機器學習準備' },
          { text: '第 22 課：機器學習流程', link: '/22_機器學習流程' },
          { text: '第 23 課：線性迴歸——房價預測', link: '/23_線性迴歸房價預測' },
          { text: '第 24 課：分類基礎', link: '/24_分類基礎' },
          { text: '第 25 課：KNN 與 Logistic Regression', link: '/25_KNN與LogisticRegression' },
          { text: '第 26 課：模型評估', link: '/26_模型評估' },
          { text: '第 27 課：欠擬合與過擬合', link: '/27_欠擬合與過擬合' },
          { text: '第 28 課：Decision Tree 與 Random Forest', link: '/28_DecisionTree與RandomForest' },
          { text: '第 29 課：K-Means——在資料中找群組', link: '/29_KMeans與PCA' },
          { text: '第 30 課：機器學習專題', link: '/30_機器學習專題' }
        ]
      },
      {
        text: '單元四：IOAI 拔尖人工智能',
        collapsed: true,
        items: [
          { text: '第 31 課：Tensor 與 PyTorch', link: '/31_Tensor與PyTorch' },
          { text: '第 32 課：感知器與神經網絡', link: '/32_感知器與神經網絡' },
          { text: '第 33 課：訓練模型', link: '/33_訓練模型' },
          { text: '第 34 課：驗證模型——決定何時停止', link: '/34_訓練技巧' },
          { text: '第 35 課：Computer Vision 入門', link: '/35_ComputerVision入門' },
          { text: '第 36 課：視覺進階專題', link: '/36_視覺進階專題' },
          { text: '第 37 課：NLP 入門', link: '/37_NLP入門' },
          { text: '第 38 課：Transformer、LLM 與音訊概覽', link: '/38_TransformerLLM與音訊概覽' },
          { text: '第 39 課：IOAI 專題與模擬', link: '/39_IOAI專題與模擬' }
        ]
      },
      {
        text: '單元五：補充與 Python 解難工具箱',
        collapsed: true,
        items: [
          { text: '第 40 課：Tuple 與 Set', link: '/40_Tuple與Set' },
          { text: '第 41 課：字串進階', link: '/41_字串進階' },
          { text: '第 42 課：常用解難模式', link: '/42_常用解難模式' },
          { text: '第 43 課：除錯與測試', link: '/43_除錯與測試' },
          { text: '第 44 課：純文字檔案', link: '/44_純文字檔案' },
          { text: '第 45 課：JSON 與日期時間', link: '/45_JSON與日期時間' },
          { text: '第 46 課：基本 OOP', link: '/46_基本OOP' },
          { text: '第 47 課：Beautiful Soup', link: '/47_BeautifulSoup' },
          { text: '第 48 課：Playwright', link: '/48_Playwright' },
          { text: '第 49 課：Python 解難綜合實作', link: '/49_全澳Python解難比賽模擬' }
        ]
      }
    ],
    outline: {
      level: [2, 3],
      label: '本課內容'
    },
    search: {
      provider: 'local'
    },
    docFooter: {
      prev: '上一課',
      next: '下一課'
    },
    returnToTopLabel: '回到頁首',
    sidebarMenuLabel: '課程目錄',
    darkModeSwitchLabel: '顯示模式',
    lightModeSwitchTitle: '切換至淺色模式',
    darkModeSwitchTitle: '切換至深色模式',
    footer: {
      message: 'F4 電腦科教材・以實作、思考與創作為核心',
      copyright: '教材持續更新中'
    }
  }
})
