import { useState, useEffect } from 'react'
import { Layout, message } from 'antd'
import Header from './components/Header'
import Toolbar from './components/Toolbar'
import Editor from './components/Editor'
import Preview from './components/Preview'
import History from './components/History'
import { HistoryItem } from './types'
import './styles/app.less'

const { Content } = Layout

const defaultSvgCode = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="50" fill="#ff0000"/>
</svg>`

const svgExamples = {
  circle: defaultSvgCode,
  rect: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect x="50" y="50" width="100" height="100" fill="#0000ff"/>
</svg>`,
  path: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <path d="M50,50 L150,50 L100,150 Z" fill="#00ff00"/>
</svg>`,
}

function App() {
  const [svgCode, setSvgCode] = useState(defaultSvgCode)
  const [error, setError] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    const savedHistory = localStorage.getItem('svgHistory')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  const saveToHistory = (code: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      code,
      timestamp: Date.now()
    }
    const updatedHistory = [newItem, ...history].slice(0, 10)
    setHistory(updatedHistory)
    localStorage.setItem('svgHistory', JSON.stringify(updatedHistory))
  }

  const handleEditorChange = (value: string | undefined) => {
    if (!value) return
    setSvgCode(value)
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(value, 'image/svg+xml')
      const parseError = doc.querySelector('parsererror')
      if (parseError) {
        setError('SVG代码格式错误')
      } else {
        setError(null)
        saveToHistory(value)
      }
    } catch (e) {
      setError('SVG代码解析失败：' + e)
    }
  }

  const handleLoadExample = (key: keyof typeof svgExamples) => {
    setSvgCode(svgExamples[key])
    setError(null)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(svgCode)
      message.success('代码已复制到剪贴板')
    } catch (e) {
      message.error('复制失败：' + e)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([svgCode], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'image.svg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleLoadHistory = (item: HistoryItem) => {
    setSvgCode(item.code)
    setError(null)
    setShowHistory(false)
  }

  const handleClearHistory = () => {
    setHistory([])
    localStorage.removeItem('svgHistory')
    setShowHistory(false)
  }

  return (
    <Layout className="app-container">
      <Header />
      <Toolbar
        onLoadExample={handleLoadExample}
        onCopy={handleCopy}
        onDownload={handleDownload}
        onToggleHistory={() => setShowHistory(!showHistory)}
        onClearHistory={handleClearHistory}
        showHistory={showHistory}
      />
      <Content className="main-content">
        <Editor
          value={svgCode}
          onChange={handleEditorChange}
          defaultValue={defaultSvgCode}
        />
        <Preview
          error={error}
          svgCode={svgCode}
          scale={scale}
          onScaleChange={setScale}
        />
        {showHistory && (
          <History
            history={history}
            onSelect={handleLoadHistory}
          />
        )}
      </Content>
    </Layout>
  )
}

export default App
