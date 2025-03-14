import { Button, Space, Switch } from 'antd'
import { ZoomInOutlined, ZoomOutOutlined, UndoOutlined } from '@ant-design/icons'
import { useState } from 'react'
import './style.less'

interface PreviewProps {
  error: string | null
  svgCode: string
  scale: number
  onScaleChange: (scale: number) => void
}

const Preview = ({ error, svgCode, scale, onScaleChange }: PreviewProps) => {
  const [showGrid, setShowGrid] = useState(true)

  return (
    <div className="preview-container">
      <Space className="preview-controls">
        <Button icon={<ZoomInOutlined />} onClick={() => onScaleChange(scale * 1.2)} />
        <Button icon={<ZoomOutOutlined />} onClick={() => onScaleChange(scale / 1.2)} />
        <Button icon={<UndoOutlined />} onClick={() => onScaleChange(1)} />
        <Switch
          checkedChildren="显示网格"
          unCheckedChildren="隐藏网格"
          defaultChecked
          onChange={setShowGrid}
        />
      </Space>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="preview-area">
          <div
            className={`svg-preview ${showGrid ? 'with-grid' : ''}`}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
              transition: 'transform 0.2s',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'auto'
            }}
            dangerouslySetInnerHTML={{ __html: svgCode }}
          />
        </div>
      )}
    </div>
  )
}

export default Preview