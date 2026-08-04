<script setup lang="ts">
import { reactive } from 'vue'
import { withBase } from 'vitepress'

type DemoId = 'chart' | 'classification' | 'housing'
type DemoState = 'ready' | 'runtime' | 'packages' | 'running' | 'done' | 'error'

type Demo = {
  id: DemoId
  number: string
  title: string
  eyebrow: string
  description: string
  packageNames: string[]
  code: string
  preview: string
  note?: string
}

type DemoResult = {
  state: DemoState
  svg: string
  error: string
}

declare global {
  interface Window {
    loadPyodide?: (options: { indexURL: string }) => Promise<PyodideRuntime>
  }
}

type PyodideRuntime = {
  loadPackage: (packages: string[]) => Promise<void>
  runPythonAsync: (code: string) => Promise<string>
}

const pyodideUrl = 'https://cdn.jsdelivr.net/pyodide/v314.0.2/full/pyodide.js'
const pyodideIndexUrl = 'https://cdn.jsdelivr.net/pyodide/v314.0.2/full/'
let runtimePromise: Promise<PyodideRuntime> | undefined
let runQueue: Promise<void> = Promise.resolve()

const demos: Demo[] = [
  {
    id: 'chart',
    number: '01',
    eyebrow: '資料視覺化 · Matplotlib',
    title: '把一週的數字，變成一眼看懂的趨勢圖',
    description: '同一組學習時間資料，可以用長條圖比較，也可以用折線圖看變化。',
    packageNames: ['matplotlib'],
    preview: '/images/demo-matplotlib.svg',
    code: `import matplotlib.pyplot as plt
from io import StringIO

days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
hours = [1.2, 2.4, 1.8, 3.1, 2.7]

fig, ax = plt.subplots(figsize=(7, 4))
ax.bar(days, hours, color="#0f766e")
ax.plot(days, hours, color="#e49b24", marker="o")
ax.set_title("Study time this week")
ax.set_ylabel("hours")
ax.grid(axis="y", alpha=0.25)

buffer = StringIO()
fig.savefig(buffer, format="svg", bbox_inches="tight")
plt.close(fig)
buffer.getvalue()`,
  },
  {
    id: 'classification',
    number: '02',
    eyebrow: '機器學習 · 三類分類',
    title: '從已知例子，畫出模型如何分辨三類資料',
    description: '模型看到帶標籤的 A、B、C 例子後，嘗試為平面上的新位置分類。背景顏色是它的判斷區域。',
    packageNames: ['numpy', 'matplotlib', 'scikit-learn'],
    preview: '/images/demo-classification.svg',
    note: '這是教學用的合成資料；模型的判斷不等於真實世界的答案，資料品質會直接影響結果。',
    code: `import numpy as np
import matplotlib.pyplot as plt
from io import StringIO
from sklearn.datasets import make_blobs
from sklearn.neighbors import KNeighborsClassifier

X, y = make_blobs(
    n_samples=120, centers=3,
    cluster_std=0.7, random_state=7
)
model = KNeighborsClassifier(n_neighbors=7)
model.fit(X, y)

xx, yy = np.meshgrid(
    np.linspace(-4, 4, 180),
    np.linspace(-3, 4, 160)
)
Z = model.predict(np.c_[xx.ravel(), yy.ravel()])

fig, ax = plt.subplots(figsize=(7, 4))
ax.contourf(xx, yy, Z.reshape(xx.shape), alpha=0.18)
ax.scatter(X[:, 0], X[:, 1], c=y, edgecolor="white")
ax.set_title("Three-class classification")

buffer = StringIO()
fig.savefig(buffer, format="svg", bbox_inches="tight")
plt.close(fig)
buffer.getvalue()`,
  },
  {
    id: 'housing',
    number: '03',
    eyebrow: '預測 · 線性回歸',
    title: '用一條最貼近資料的直線，作出房價預測',
    description: '先用少量範例找出面積與價格的大致關係，再估計 68 m² 單位的價格。',
    packageNames: ['numpy', 'matplotlib'],
    preview: '/images/demo-house-price.svg',
    note: '這是小型虛構資料的線性回歸示範，不可用作真實房屋估價。真實房價還受地點、樓齡、交通、裝修等因素影響。',
    code: `import numpy as np
import matplotlib.pyplot as plt
from io import StringIO

area = np.array([35, 48, 55, 62, 75, 82, 95, 110])
price = np.array([280, 356, 410, 450, 540, 600, 690, 770])

slope, intercept = np.polyfit(area, price, 1)
predict_area = 68
predict_price = slope * predict_area + intercept

fig, ax = plt.subplots(figsize=(7, 4))
ax.scatter(area, price, color="#0f766e")
ax.plot(area, slope * area + intercept, color="#e49b24")
ax.scatter(predict_area, predict_price, color="#d85d64", s=90)
ax.set_title(f"68 m² ≈ {predict_price:.0f}k")
ax.set_xlabel("area (m²)")
ax.set_ylabel("price (thousand)")

buffer = StringIO()
fig.savefig(buffer, format="svg", bbox_inches="tight")
plt.close(fig)
buffer.getvalue()`,
  },
]

const results = reactive<Record<DemoId, DemoResult>>({
  chart: { state: 'ready', svg: '', error: '' },
  classification: { state: 'ready', svg: '', error: '' },
  housing: { state: 'ready', svg: '', error: '' },
})

const statusLabel: Record<DemoState, string> = {
  ready: '按下按鈕，在這個瀏覽器執行 Python',
  runtime: '正在載入 Python 執行環境…',
  packages: '正在準備所需的 Python 套件…',
  running: 'Python 正在繪圖…',
  done: '已由你的瀏覽器執行 Python',
  error: '這次未能執行，請重試',
}

function queue<T>(work: () => Promise<T>): Promise<T> {
  const next = runQueue.then(work, work)
  runQueue = next.then(() => undefined, () => undefined)
  return next
}

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-pyodide-runtime]')
    if (existing) {
      if (window.loadPyodide) resolve()
      else {
        existing.addEventListener('load', () => resolve(), { once: true })
        existing.addEventListener('error', () => reject(new Error('Python runtime script could not be loaded.')), { once: true })
      }
      return
    }

    const script = document.createElement('script')
    script.src = pyodideUrl
    script.async = true
    script.dataset.pyodideRuntime = 'true'
    script.addEventListener('load', () => resolve(), { once: true })
    script.addEventListener('error', () => reject(new Error('Python runtime script could not be loaded.')), { once: true })
    document.head.appendChild(script)
  })
}

async function getRuntime(): Promise<PyodideRuntime> {
  if (!runtimePromise) {
    runtimePromise = (async () => {
      await loadScript()
      if (!window.loadPyodide) throw new Error('Python runtime did not start correctly.')
      return window.loadPyodide({ indexURL: pyodideIndexUrl })
    })()
  }
  return runtimePromise
}

function cleanSvg(value: string): string {
  return value
    .replace(/<\\?xml[\\s\\S]*?\\?>/g, '')
    .replace(/<!DOCTYPE[\\s\\S]*?>/g, '')
}

async function runDemo(demo: Demo) {
  const result = results[demo.id]
  if (result.state === 'runtime' || result.state === 'packages' || result.state === 'running') return

  result.error = ''
  result.state = 'runtime'

  try {
    const runtime = await getRuntime()
    result.state = 'packages'
    await queue(() => runtime.loadPackage(demo.packageNames))
    result.state = 'running'
    const svg = await queue(() => runtime.runPythonAsync(demo.code))
    result.svg = cleanSvg(svg)
    result.state = 'done'
  } catch (error) {
    result.state = 'error'
    result.error = error instanceof Error ? error.message : 'Unknown error'
  }
}
</script>

<template>
  <section class="python-showcase" aria-labelledby="python-live-title">
    <div class="python-showcase__intro">
      <div>
        <p class="python-showcase__kicker">BROWSER LAB · LIVE PYTHON</p>
        <h2 id="python-live-title">不是介紹：這裡真的會跑 Python。</h2>
      </div>
      <p>
        左方是程式碼；右方是結果。按下按鈕後，程式會由 <strong>你的瀏覽器</strong> 執行，毋須登入，也不會把資料傳到本網站伺服器。
      </p>
    </div>

    <article v-for="demo in demos" :key="demo.id" class="python-demo">
      <header class="python-demo__header">
        <div class="python-demo__serial">{{ demo.number }}</div>
        <div>
          <p>{{ demo.eyebrow }}</p>
          <h3>{{ demo.title }}</h3>
        </div>
      </header>

      <div class="python-demo__grid">
        <section class="python-demo__code" :aria-label="demo.title + ' 的 Python 程式碼'">
          <div class="python-demo__panel-heading">
            <span class="python-demo__dot python-demo__dot--red"></span>
            <span class="python-demo__dot python-demo__dot--yellow"></span>
            <span class="python-demo__dot python-demo__dot--green"></span>
            <b>demo.py</b>
          </div>
          <pre><code>{{ demo.code }}</code></pre>
          <button
            class="python-demo__run"
            type="button"
            :disabled="results[demo.id].state === 'runtime' || results[demo.id].state === 'packages' || results[demo.id].state === 'running'"
            @click="runDemo(demo)"
          >
            <span aria-hidden="true">▶</span>
            {{ results[demo.id].state === 'ready' || results[demo.id].state === 'done' || results[demo.id].state === 'error' ? '執行 Python' : statusLabel[results[demo.id].state] }}
          </button>
        </section>

        <section class="python-demo__result" :aria-label="demo.title + ' 的執行結果'">
          <div class="python-demo__result-heading">
            <span>OUTPUT</span>
            <em :class="'is-' + results[demo.id].state">{{ statusLabel[results[demo.id].state] }}</em>
          </div>
          <div v-if="results[demo.id].svg" class="python-demo__svg" v-html="results[demo.id].svg"></div>
          <img v-else class="python-demo__preview" :src="withBase(demo.preview)" :alt="demo.title + ' 的圖表預覽'" />
          <p v-if="results[demo.id].error" class="python-demo__error">
            {{ results[demo.id].error }}<br />
            請檢查網路後再按一次；未執行時仍可先閱讀這張預覽圖。
          </p>
        </section>
      </div>

      <div class="python-demo__caption">
        <p>{{ demo.description }}</p>
        <p v-if="demo.note" class="python-demo__note">{{ demo.note }}</p>
      </div>
    </article>

    <p class="python-showcase__footnote">
      第一次執行會下載 Python 執行環境與需要的套件，因此可能要等一會；之後通常會較快。這三段程式是固定的教學範例，讓你先看懂「程式 → 圖表／模型結果」的連結。
    </p>
  </section>
</template>
