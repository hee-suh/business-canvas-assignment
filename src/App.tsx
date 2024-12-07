import { Typography } from 'antd';
import AntdConfigProvider from '@/providers/AntdConfigProvider';

function App() {
  return (
    <AntdConfigProvider>
      <Typography.Title level={5}>회원 목록</Typography.Title>
    </AntdConfigProvider>
  );
}

export default App;
