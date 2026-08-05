import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'F4 Python 課程',
  description: '由零開始學習 Python、資料分析與運算思維',
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

    sidebar: [
      {
        text: '起步：先知道自己為何而學',
        collapsed: false,
        items: [
          { text: '第 0 課：為甚麼學 Python？', link: '/00_為什麼學Python' }
        ]
      },
      {
        text: '單元一：Python 基礎',
        collapsed: false,
        items: [
          { text: '第 1 課：Python、輸出與變數', link: '/01_Python介紹與變數' },
          { text: '第 2 課：資料類型與運算', link: '/02_資料類型與運算' },
          { text: '第 3 課：input() 與計算', link: '/03_input與計算' },
          { text: '第 4 課：if 判斷與小遊戲', link: '/04_if判斷與小遊戲' },
          { text: '第 5 課：列表 List', link: '/05_列表List' },
          { text: '第 6 課：for 迴圈與作品', link: '/06_for迴圈與作品' },
          { text: '第 7 課：while 迴圈與進階遊戲', link: '/07_while迴圈與進階遊戲' },
          { text: '第 8 課：總溫習與綜合應用', link: '/08_總溫習與綜合應用' },
          { text: 'Python 基礎測驗', link: '/09_Python基礎測驗' }
        ]
      },
      {
        text: '單元二：資料分析',
        collapsed: true,
        items: [
          { text: '第 10 課：從 List 到資料表', link: '/10_NumPy入門' },
          { text: '第 11 課：pandas 入門——看懂資料表', link: '/11_pandas入門' },
          { text: '第 12 課：篩選與新增欄位', link: '/12_NumPy與pandas銜接' },
          { text: '第 13 課：資料清洗——處理缺失與錯誤', link: '/13_資料清洗與篩選' },
          { text: '第 14 課：統計與分組', link: '/14_描述性統計與groupby' },
          { text: '第 15 課：資料視覺化——用圖表說故事', link: '/15_資料視覺化Matplotlib' },
          { text: '第 16 課：NumPy——很多數字一起計算', link: '/16_NumPy很多數字一起計算' }
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
