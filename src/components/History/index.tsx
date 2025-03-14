import { Typography } from 'antd'
import { HistoryItem } from '../../types'
import './style.less'

const { Title } = Typography

interface HistoryProps {
  history: HistoryItem[]
  onSelect: (item: HistoryItem) => void
}

const History = ({ history, onSelect }: HistoryProps) => {
  return (
    <div className="history-list">
      <Title level={5}>历史记录</Title>
      {history.length === 0 ? (
        <p>暂无历史记录</p>
      ) : (
        history.map(item => (
          <div key={item.id} className="history-item" onClick={() => onSelect(item)}>
            <div className="history-preview" dangerouslySetInnerHTML={{ __html: item.code }} />
            <div className="history-time">
              {new Date(item.timestamp).toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default History