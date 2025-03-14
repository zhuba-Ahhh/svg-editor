import { Button, Space } from 'antd'
import './style.less'

interface ToolbarProps {
  onLoadExample: (type: 'circle' | 'rect' | 'path') => void
  onCopy: () => void
  onDownload: () => void
  onToggleHistory: () => void
  onClearHistory: () => void
  showHistory: boolean
}

const Toolbar = ({
  onLoadExample,
  onCopy,
  onDownload,
  onToggleHistory,
  onClearHistory,
  showHistory
}: ToolbarProps) => {
  return (
    <div className="toolbar">
      <Space>
        <Button onClick={() => onLoadExample('circle')}>圆形示例</Button>
        <Button onClick={() => onLoadExample('rect')}>矩形示例</Button>
        <Button onClick={() => onLoadExample('path')}>路径示例</Button>
        <Button onClick={onCopy}>复制代码</Button>
        <Button onClick={onDownload}>下载SVG</Button>
        <Button onClick={onToggleHistory}>
          {showHistory ? '关闭历史' : '查看历史'}
        </Button>
        {showHistory && <Button onClick={onClearHistory}>清空历史</Button>}
      </Space>
    </div>
  )
}

export default Toolbar