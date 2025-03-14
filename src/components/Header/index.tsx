import { Layout, Typography } from 'antd'
import './style.less'

const { Header: AntHeader } = Layout
const { Title } = Typography

const Header = () => {
  return (
    <AntHeader className="header">
      <Title level={4} style={{ margin: 0, color: '#000' }}>SVG在线编辑器</Title>
    </AntHeader>
  )
}

export default Header