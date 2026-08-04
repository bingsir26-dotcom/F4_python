<script setup lang="ts">
import { withBase } from 'vitepress'

type Demo = {
  number: string
  eyebrow: string
  title: string
  description: string
  code: string
  preview: string
  note?: string
}

const demos: Demo[] = [
  {
    number: '01',
    eyebrow: '資料視覺化 · Matplotlib',
    title: '把一週的數字，變成一眼看懂的趨勢圖',
    description: '同一組學習時間資料，可以用長條圖比較，也可以用折線圖看變化。圖表的價值不在於「漂亮」，而在於讓人更快發現星期四最高、星期一最低。',
    preview: '/images/demo-matplotlib.svg',
    code: 'days = ["Mon", "Tue", "Wed", "Thu", "Fri"]\nhours = [1.2, 2.4, 1.8, 3.1, 2.7]\n\nplt.bar(days, hours)\nplt.plot(days, hours, marker="o")',
  },
  {
    number: '02',
    eyebrow: '機器學習 · 三類分類',
    title: '從已知例子，畫出模型如何分辨三類資料',
    description: '模型先讀取一批已標籤為 A、B、C 的例子；當看到新位置時，再依相近的例子作分類。背景顏色是模型在不同位置的判斷。',
    preview: '/images/demo-classification.svg',
    code: 'model = KNeighborsClassifier(n_neighbors=7)\nmodel.fit(X, y)\n\nZ = model.predict(new_positions)\nax.contourf(x_grid, y_grid, Z)',
    note: '教學用合成資料。模型的判斷不等於真實世界的答案，資料品質會直接影響結果。',
  },
  {
    number: '03',
    eyebrow: '預測 · 線性回歸',
    title: '用一條最貼近資料的直線，作出房價預測',
    description: '先從小量範例找出面積與價格的大致關係，再把 68 m² 代入直線，得到一個估計值。這正是「從資料建立模型」的最基本形式。',
    preview: '/images/demo-house-price.svg',
    code: 'slope, intercept = np.polyfit(area, price, 1)\npredict_area = 68\npredict_price = slope * predict_area + intercept\nax.plot(area, slope * area + intercept)',
    note: '小型虛構資料的線性回歸示範，不可用作真實房屋估價。地點、樓齡、交通和裝修都會影響真實房價。',
  },
]
</script>

<template>
  <section class="python-showcase" aria-labelledby="python-showcase-title">
    <figure class="python-ranking">
      <img :src="withBase('/images/python-tiobe-ranking.svg')" alt="Python 在 TIOBE Index 的排名里程碑圖：2003 年最低第十三名，2026 年 7 月最高第一名。" />
      <figcaption>
        資料來源：<a href="https://www.tiobe.com/tiobe-index/python/" target="_blank" rel="noreferrer">TIOBE 的 Python 語言頁</a>；查核日期：2026 年 8 月 4 日。圖中的連線只連接兩個已發布的里程碑，不代表每月排名走勢。
      </figcaption>
    </figure>

    <div class="python-showcase__intro">
      <p class="python-showcase__kicker">PYTHON IN ACTION</p>
      <h2 id="python-showcase-title">先看結果，再拆開它怎樣做到。</h2>
      <p>三個都是完整 Python 專案會出現的真實方向；以下只保留最值得看的程式節錄，讓畫面先留給結果。</p>
    </div>

    <article v-for="demo in demos" :key="demo.number" class="python-demo">
      <header class="python-demo__header">
        <div class="python-demo__serial">{{ demo.number }}</div>
        <div>
          <p>{{ demo.eyebrow }}</p>
          <h3>{{ demo.title }}</h3>
        </div>
      </header>

      <figure class="python-demo__figure">
        <img :src="withBase(demo.preview)" :alt="demo.title + ' 的圖表'" />
      </figure>

      <div class="python-demo__reading">
        <p class="python-demo__description">{{ demo.description }}</p>
        <div class="python-demo__snippet">
          <div class="python-demo__snippet-label">程式節錄 · demo.py</div>
          <pre><code>{{ demo.code }}</code></pre>
        </div>
      </div>
      <p v-if="demo.note" class="python-demo__note">{{ demo.note }}</p>
    </article>
  </section>
</template>
